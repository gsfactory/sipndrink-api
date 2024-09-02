const _ = require("lodash");

class EmailSender {
    /**
     * Send email
     * @param {*} args 
     * {
     *  to: <email>,
     *  emailTemplate: <from email_formats>
     *  resolver: {dictionary of resolver values}
     * }
     */
    async sendEmail(args) {
        //TODO remove return
        // return;
        console.log('sending email to', args.to);
        try{
            await strapi.plugins['email'].services.email.sendTemplatedEmail(
                {
                    to: args.to,
                },
                args.emailTemplate,
                args.resolver
            );
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = new EmailSender();