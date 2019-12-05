const formatCurrency = require('format-currency');
let opts = { format: '%s%v', symbol: '$' };

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromAddress =
  process.env.SENDGRID_FROM_ADDRESS || 'magrelo404+test@gmail.com';
const newPositionTemplate = 'd-077c63f80de849bf92a4d2723c41ec4f';

exports.sendNewLink = async function(fromUser, messageData, link) {
  // get required
  const toAddress = messageData.toAddress;

  const msg = {
    to: toAddress,
    from: fromAddress,
    templateId: newPositionTemplate,
    dynamic_template_data: {
      ...link.data,
      linkUrl: 'https://' + process.env.HOSTNAME + '/link/' + link.linkId,
      candidate_bonus: formatCurrency(link.target_bonus, opts),
      network_bonus: formatCurrency(link.network_bonus, opts),
      message: messageData.message,
      messageFrom: fromUser.name
    }
  };

  return sgMail.send(msg).then(responseArray => {
    const response = responseArray[0];
    const err = responseArray[1];

    if (err) {
      throw new Error(err);
    }

    return {
      id: response.headers['x-message-id'],
      statusCode: response.statusCode,
      statusMessage: response.statusMessage
    };
  });
};
