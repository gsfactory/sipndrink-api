'use strict';

/**
 * booking-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::booking-service.booking-service');
