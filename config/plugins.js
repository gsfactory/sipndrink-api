module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'amazon-ses',
        providerOptions: {
          key: env('AWS_SES_KEY'),
          secret: env('AWS_SES_SECRET'),
          amazon: 'https://email.us-east-1.amazonaws.com',
        },
        settings: {
            defaultFrom: env('EMAIL_DEFAULT_FROM', 'info@vizitsure.com'),
            defaultReplyTo: env('EMAIL_REPLY_TO', 'info@vizitsure.com')
        },
      },
    },
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
            rootPath: 'sipndrink',
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
    // ...
  });