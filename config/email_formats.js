const BookingNotificationCustomer = {
    subject: '🎉 Your Private Theatre Booking is Confirmed! Get Ready for a Starry Celebration! 🌟',
    text: 'Your booking confirmed with SipnDrink',
    html: `Hi <%= customer.name %>,
        <p></p>
        <p>Thank you for booking with Sip n Screen! We’re thrilled to host you for an unforgettable experience. Here's a quick look at your booking details:</p>
        <p></p>
        <p>Theater Booked: <%= theater.name %></p>
        <p>Seats Reserved: <%= booking.total_seats_booked %></p>
        <p>Date and time: <%= booking.date %> at <%= booking.time %></p>
        <p>Total Amount: <%= booking.total_price %></p>
        <p>Advance Paid: <%= booking.price_paid %></p>
        <p>Balance Due: <%= booking.balance %></p>
        <p></p>
        <p>
        We can't wait to welcome you to your private theatre, where you’re the star! 🌟 Feel free to bring along your favorite movie snacks and good vibes—this celebration is all about you!</p>
        See you soon at Sip n Screen, where the entertainment is all yours. 🎬<br/>
        <p>Cheers,</p>
        The Sip n Screen Team<br/>
        🍿🎥<br/>
        Where Every Seat is Front Row! 🍹<br/>
        Sip'n'Drink<br/>
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