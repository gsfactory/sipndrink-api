'use strict';

/**
 * payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payment.payment',  ({ strapi }) => ({ 

  async create(ctx) {
    if (!ctx.request.body?.data?.inr) {
      return ctx.badRequest('inr is required');
    }

    ctx.request.body.data.order_id = await strapi.service(
        'api::payment.payment').getRandomReceiptId();

    const order = await strapi.service('api::payment.payment').createOrder(
        ctx.request.body.data.order_id, ctx.request.body?.data.inr
    );
    if (!order) {
        return ctx.badRequest('Could not create order from razorpay');
    }

    ctx.request.body.data.pg_order_id = order.id;
    ctx.request.body.data.currency = order.currency;
    ctx.request.body.data.amount = order.amount;

    return await super.create(ctx);
  },

  /**
   * Verify payment, and save the payment details
   * do the subscription entries
   */
  async finalize(ctx) {
      // pg_payment_id, pg_order_id, pg_signature
      const ctxData = ctx.request.body.data;
      const isVerified = await strapi.service('api::payment.payment').verifyPaymentDetails(
          ctxData.pg_order_id, ctxData.pg_payment_id, ctxData.pg_signature, false
      );
      if (!isVerified) {
          return ctx.forbidden("Unverified payment details");
      }

      return {};
  },

  async razorpayWebhookAfterPaymentCaptured(ctx) {
      console.log('------------- webhook -------------');
      console.log(JSON.stringify(ctx.request.body));
      console.log(JSON.stringify(ctx.request.headers));
      console.log('------------- webhook -------------');

      if (ctx.request.body.event !== "payment.captured") {
          strapi.log.error('Invalid event type received through webhook', JSON.stringify(ctx.request.body));
          return;
      }

      const entity = ctx.request.body.payload.payment.entity;

      if (!validateWebhookSignature(
          JSON.stringify(ctx.request.body),
          ctx.request.headers['x-razorpay-signature'],
          process.env.RZ_WEBHOOK_SECRET)) {
              strapi.log.error('Signature mismatch for payment id', entity.id);
              return;
      }

      await strapi.service('api::payment.payment').verifyPaymentDetails(
          entity.order_id, entity.id, null, false
      );
      //no need to return bad result, its a webhook
      
      return {};
  }
}));
