'use strict';
const crypto = require("crypto");
const shortid = require('shortid');
const Razorpay = require('razorpay');
const moment = require('moment');

/**
 * payment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::payment.payment',  ({ strapi }) => ({ 
  /**
   * Create a new order in razorpay
   */
  async createOrder(receiptId, inr) {
      const rzInstance = await this.getRazorpayInstance();
      const options = {
          amount: inr * 100, // in paise
          currency: "INR",
          receipt: receiptId,
      };

      return await rzInstance.orders.create(options);
  },

  async getRazorpayInstance() {
      return new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
      });
  },

  async getRandomReceiptId() {
      return `sipnscreen_${shortid.generate()}`;
  },

  //return true/false
  async verifyPaymentSignature(pg_order_id, pg_payment_id, pg_signature) {
      let body = pg_order_id + "|" + pg_payment_id;
      
      const expectedSignature = crypto.createHmac(
          'sha256', process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest('hex');
      
      return expectedSignature === pg_signature;
  },

  async getRazorpayPaymentDetails(paymentId) {
      //example: paymentId: pay_L6RxVxjruniavp
      const rz = await this.getRazorpayInstance();
      return await rz.payments.fetch(paymentId);
  },

  /**
   * After initiating payment, verify payment
   * Either through webhook, or via ui
   */
  async verifyPaymentDetails(
      pg_order_id, pg_payment_id, pg_signature, isViaWebhook = true) {
      
      console.log("verifying payment details");
      //find payment by pg_order_id
      const paymentEntries = await strapi.entityService.findMany(
          'api::payment.payment', {
          filters: { 
              pg_order_id: pg_order_id,
              status: 'pending'
          }
        });
      if (!paymentEntries || paymentEntries.length == 0) {
          strapi.log.error("No payment detail found for", pg_order_id);
          return false;
      }

      const paymentEntry = paymentEntries[0];

      if (!isViaWebhook) {
          const doesSignatureMatch = await strapi.service(
              'api::payment.payment').verifyPaymentSignature(
                  paymentEntry.pg_order_id,
                  pg_payment_id, 
                  pg_signature
              );
          if (!doesSignatureMatch) {
              strapi.log.error("Payment signature not matched");
              return false;
          }
      }

      //payment verifies
      await strapi.entityService.update(
          'api::payment.payment', 
          paymentEntry.id, {
              data: {
                  pg_payment_id: pg_payment_id,
                  pg_signature: pg_signature,
                  status: 'success'
              },
        });

      return true;
  }
}));
