'use strict';

/**
 * booking-service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::booking-service.booking-service');
