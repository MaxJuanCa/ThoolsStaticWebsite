const sgMail = require('@sendgrid/mail')
export default async function (req, res) {
    sgMail.setApiKey('')
    const msg = {
        to: 'juankamilo@gmail.com',
        from: req.query.from,
        subject: 'Hola JuanK',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    try {
        await sgMail.send(msg)
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message not sent.')
    }
}