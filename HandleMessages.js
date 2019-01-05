'use strict';
const request = require('request');
const PAGE_ACCESS_TOKEN = 'EAADJbZCJjwRUBAHS7rrD3GZBpOoq3qx6WAFFhddtpmW0njS3DByDSOcdv9hp78wGPZB0dkWhTWaowvKxOWNbRQfb5MrMt7hMY0U3f6ryftlNAeP6cXNZBq9szLOZAChMiHG52DyWVolkXR8RZAZA6JItS0nyEjztjnQmgaCzKZCmgHCi1iTb9WxxyNJuKREcVZBgZD';

class HandleMessage {

    constructor() {

    }

    // Handles messages events
    handleMessage(sender_psid, received_message) {
        let response;

        // Check if the message contains text
        if (received_message.text) {

            // Create the payload for a basic text message
            response = {
                "text": "Gracias por ponerte en contacto con nostros, te llamaremos mas tarde. (" + received_message.text + ")"
            }
        }
        console.info('Es un mensaje de texto');
        this.callSendAPI(sender_psid, response);
    }

    // Handles messaging_postbacks events
    handlePostback(sender_psid, received_postback) {
        let postback = received_postback.payload;
        response = {
            "text": postback
        }
        console.info('Es un mensaje postback');
        this.callSendAPI(sender_psid, response);
    }

    // Sends response messages via the Send API
    callSendAPI(sender_psid, response) {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        }

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    }
}

module.exports = HandleMessage;