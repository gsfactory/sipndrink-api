const BookingNotificationCustomer = {
    subject: 'Your booking confirmed with SipnDrink',
    text: 'Your booking confirmed with SipnDrink',
    html: `Dear <%= customer.name %>,
        <p></p>
        <p>Congratulations! Your booking with SipnDrink is confirmed.</p>
        <p></p>
        <p>Theater: <%= theater.name %></p>
        <p>Date and time: <%= booking.date %> at <%= booking.time %></p>
        <p>Total price: <%= booking.total_price %></p>
        <p>Amount paid: <%= booking.price_paid %></p>
        <p></p>
        <p>Thank you for your booking.</p>
        <p>Sip'n'Drink</p>
        `
};

const BookingNotificationAdmin = {
    subject: 'Booking confirmed with SipnDrink',
    text: 'Booking confirmed with SipnDrink',
    html: `Dear Boss,
        <p></p>
        <p>Congratulations! You got a booking.</p>
        <p></p>
        <p>Theater: <%= theater.name %></p>
        <p>Date and time: <%= booking.date %> at <%= booking.time %></p>
        <p>Total price: <%= booking.total_price %></p>
        <p>Amount paid: <%= booking.price_paid %></p>
        <p>For more details, goto: <%= booking.link %></p>
        <p></p>
        <p>Thank you</p>
        <p>Sip'n'Drink</p>
        `
};

module.exports = {
    BookingNotificationCustomer,
    BookingNotificationAdmin
};