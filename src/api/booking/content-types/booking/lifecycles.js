
const {BookingNotificationCustomer, BookingNotificationAdmin} = require('../../../../../config/email_formats');
const emailSender = require('../../../../modules/email_sender');
const whatsapp_sender = require('../../../../modules/whatsapp_sender');

module.exports = {
    async afterCreate(event) {
        const theaterData = await strapi.entityService.findOne(
            "api::theatre.theatre", 
            event.params.data.theatre,
        );

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
            discount: event.params.data.discount,
            total_price: event.params.data.total_price,
            price_paid: event.params.data.price_paid,
            balance: event.params.data.total_price - event.params.data.price_paid,
            link: `${process.env.URL}/bookings` || 'http://localhost:3000/bookings',
            total_seats_booked: event.result.total_seats_booked
        };

        await emailSender.sendEmail({
            to: event.params.data.customer_email,
            emailTemplate: BookingNotificationCustomer,
            resolver: {
                theater: theater,
                customer: customer,
                booking: booking
            }
        });
        emailSender.sendEmail({
            to: process.env.ADMIN_EMAIL || "gorav.singal@gmail.com",
            emailTemplate: BookingNotificationAdmin,
            resolver: {
                theater: theater,
                customer: customer,
                booking: booking
            }
        });

        // send whatsapp messages
        try {
            const wParams = [
                theater.name,
                booking.total_seats_booked,
                `${booking.date} at ${booking.time}`,
                booking.total_price,
                booking.price_paid,
                booking.balance,
                event.result.customer_name,
                event.result.customer_phone,
            ];
            // whatsapp_sender.bookingConfirmedUser(staff[0].mobile, wParams);
            // whatsapp_sender.bookingConfirmedAdmin(staff[0].mobile, wParams);
        } catch(error) {
            console.log(error);
        }
        console.log('email sent');
    }
}
 