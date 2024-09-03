module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/theatres/availability',
            handler: 'theatre.getTheaterSlotAvailability',
        }
    ]
  }