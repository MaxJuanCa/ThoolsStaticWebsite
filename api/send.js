exports.handler = function(context, event, callback) {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const message = {
      to: "juankamilo@gmail.com",
      from: "jcramirez@thools.com",
      subject: "Sending Emails with Twilio SendGrid and Twilio Server Functions is Easy",
      text: "How simple can this be?"
    };
    sgMail
      .send(message)
      .then(() => {
        callback(null, "Email sent successfully");
      })
      .catch(e => {
        console.log(e);
      });
  };