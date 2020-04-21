const sgMail = require('@sendgrid/mail');

module.exports = (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'juankamilo@gmail.com',
        from: 'jcramirez@thools.com',
        subject: 'Asunto de prueba',
        text: 'Texto de prueba',
        html: 'Hola, escribió <strong>'+ req.query.name +'</strong> con e-mail <strong>' + req.query.from + '</strong> y dijo <strong>' + req.query.message + '</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            location.replace("https://www.thools.com");
        })
        .catch(error => {
            // Log friendly error
            console.error(error);

            if (error.response) {
            // Extract error msg
            const {message, code, response} = error;

            // Extract response msg
            const {headers, body} = response;

            console.error(body);
            }
        });
        res.status(200).send('Gracias por contactarnos '+ req.query.name);
}