'use strict';

/**
 * timeslot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::timeslot.timeslot');
