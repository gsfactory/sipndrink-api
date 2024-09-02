
const {BookingNotificationCustomer, BookingNotificationAdmin} = require('../../../../../config/email_formats');
const emailSender = require('../../../../modules/email_sender');

module.exports = {
    async afterCreate(event) {
        console.log(event.params);
        console.log(event.result);
        
        const theaterData = await strapi.entityService.findOne(
            "api::theatre.theatre", 
            event.params.data.theatre,
        );

        console.log('theaterData', theaterData);

        const timeslotData = await strapi.entityService.findOne(
            "api::timeslot.timeslot", 
            event.params.data.timeslot,
        );

        const theater = {
            name: theaterData.name
        };
        const customer = {
            name: event.params.data.customer_name,
        };
        const booking = {
            date: event.params.data.date,
            time: `${timeslotData.start_time.toString().slice(0, 5)} - ${timeslotData.end_time.toString().slice(0, 5)}`,
            total_price: event.params.data.total_price,
            price_paid: event.params.data.price_paid,
            link: 'https://admin_link'
        };
        console.log('timeslotData', timeslotData);

        await emailSender.sendEmail({
            to: event.params.data.customer_email,
            emailTemplate: BookingNotificationCustomer,
            resolver: {
                theater: theater,
                customer: customer,
                booking: booking
            }
        });
        await emailSender.sendEmail({
            to: "gorav.singal@gmail.com",
            emailTemplate: BookingNotificationAdmin,
            resolver: {
                theater: theater,
                customer: customer,
                booking: booking
            }
        });
        console.log('email sent');
    }
}
 