'use strict';

/**
 * theatre controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::theatre.theatre', ({ strapi }) =>  ({

    /**
     * returns an dict of slotIds -> boolean, for a theater
     */
    async getTheaterSlotAvailability(ctx) {
        const timeslots = await strapi.entityService.findMany(
            'api::timeslot.timeslot', {
                filters: {
                    theatre: ctx.query.theater
                }
            });

        const timeslotIds = timeslots.reduce((acc, item) => {
            acc[item.id] = true;
            return acc;
        }, {});

        const bookings = await strapi.entityService.findMany(
            'api::booking.booking', {
                filters: {
                    theatre: ctx.query.theater,
                    date: ctx.query.date,
                    // status: 'completed' //todo
                },
                populate: {
                    timeslot: true
                }
            });

        // mark booked slot not available
        for (const booking of bookings) {
            timeslotIds[booking.timeslot.id] = false;
        }

        const totalAvailable = Object.values(timeslotIds).filter(value => value === true).length;

        return {
            availability: timeslotIds,
            num_available: totalAvailable
        };
    }
}));
