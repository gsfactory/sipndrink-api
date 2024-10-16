const axios = require('axios');
const _ = require("lodash");
const {WhatsappFormats} = require('../../config/whatsapp_formats');

class WhatsappSender {
    constructor() {
        this._url = "https://graph.facebook.com/v16.0/113090408421743/messages";
        this._token = process.env.WHATSAPP_TOKEN;
    }

    async bookingConfirmedUser(mobileNumber, params) {
        console.log(`Sending Whatsapp message: ${mobileNumber}, ${JSON.stringify(params)}`);

        await this._sendMessage(
            mobileNumber,
            WhatsappFormats.booking_confirmed_user,
            params, 
        );
        console.log('Success');
    }

    async bookingConfirmedAdmin(mobileNumber, params) {
      console.log(`Sending Whatsapp message: ${mobileNumber}, ${JSON.stringify(params)}`);

      await this._sendMessage(
          mobileNumber,
          WhatsappFormats.booking_confirmed_admin,
          params, 
      );
      console.log('Success');
  }

    async _sendMessage(mobileNumber, templateName, params) {
        // // //TODO testing
        // return;

        const countryCode = '91';
        const toMobile = `${countryCode}${mobileNumber}`;
        
        let messageBody = {
            "messaging_product": "whatsapp",
            "to": toMobile,
            "type": "template",
            "template": {
              "name": templateName,
              "language": {
                "code": "en_US"
              }
            }
        };
        if (params) {
            messageBody.template.components = [{
                "type": "body",
                "parameters": this._getTextComponents(params)
            }];
        }

        // console.log(JSON.stringify(messageBody, null, 2));
        let { data } = await axios.post(
            this._url,
            messageBody,
            {
                headers: { 
                    Authorization: `Bearer ${this._token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        console.log(data);
    }

    _getTextComponents(params) {
        let components = [];
        for (let p of params) {
            let component = {
                "type": "text",
                "text": p
            };
            components.push(component);
        }
        return components;
    }
}

module.exports = new WhatsappSender();