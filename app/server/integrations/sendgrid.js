// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromAddress = 'magrelo404+test@gmail.com';
// const replyAddress = 'magrelo404+test@gmail.com';

exports.sendNewLink = async function(fromUser, messageData, link) {
  // get required
  const toAddress = messageData.toAddress;

  // build message
  const defaultSubject = `New Link! Earn up to ${
    link.payoffs[link.generation]
  } by sharing this link. incentive(dot)exchange`;
  const defaultBody = `${
    fromUser.name
  } has created a link for you! Here's your link: https://incentive.exchange/link/${
    link.linkId
  }`;

  // build email subject:
  const subject = messageData.subject || defaultSubject;
  const bodyText = messageData.body || defaultBody;

  // add html body(?) with message
  const bodyHtml = `${
    fromUser.name
  } has created a link for you! Here's your link: https://incentive.exchange/link/${
    link.linkId
  }`;

  // send
  return sgMail.send({
    to: toAddress,
    from: fromAddress,
    subject: subject,
    text: bodyText,
    html: bodyHtml
  });
};
