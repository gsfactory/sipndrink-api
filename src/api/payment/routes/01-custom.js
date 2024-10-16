module.exports = {
  routes: [
      {
          method: 'PUT',
          path: '/payments/finalize',
          handler: 'payment.finalize',
      },
      {
          method: 'POST',
          path: '/payments/rzVerify',
          handler: 'payment.razorpayWebhookAfterPaymentCaptured'
      }
  ]
}