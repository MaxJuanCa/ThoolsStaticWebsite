const sgMail = require('@sendgrid/mail')

export default async function (req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'juankamilo@gmail.com',
        from: 'jcramirez@thools.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    //ES6
    sgMail
        .send(msg)
        .then(() => {}, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });
    //ES8
    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();


}