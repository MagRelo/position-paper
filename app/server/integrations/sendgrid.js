const fetch = require('node-fetch');

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
      messageFrom: fromUser.displayName
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

exports.addContact = async function(emailAddress, data) {
  // setup http request
  const url = 'https://api.sendgrid.com/v3/contactdb/recipients';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.SENDGRID_API_KEY
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: {
      email: emailAddress,
      data: data
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.ok;
};

exports.sendEmail = async function(emailType, personData) {
  // convert to template id
  let templateId = null;
  switch (emailType) {
    case 'getHelp':
      templateId = process.env.SENDGRID_TEMPLATE_GET_HELP;
      break;
    case 'giveHelp':
      templateId = process.env.SENDGRID_TEMPLATE_GIVE_HELP;
      break;
    case 'newOrg':
      templateId = process.env.SENDGRID_TEMPLATE_NEW_ORG;
      break;
    case 'orgApproved':
      templateId = process.env.SENDGRID_TEMPLATE_ORG_APPROVED;
      break;
    default:
      break;
  }
  if (!templateId) {
    throw new Error('No Template Id');
  }

  // setup message
  const msg = {
    to: personData.email,
    from: fromAddress,
    templateId: templateId,
    dynamic_template_data: {
      ...personData.data
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
