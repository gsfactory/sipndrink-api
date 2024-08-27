'use strict';

/**
 * booking-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::booking-service.booking-service');
