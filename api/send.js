require('dotenv').config();
const sgMail = require('@sendgrid/mail');

module.exports = (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: ['juankamilo@gmail.com', 'Juan Camilo Ramirez Ortiz <jcramirez@thools.com>'],
        from: 'Juan Camilo de Thools Consulting <jcramirez@thools.com>',
        subject: 'Nuevo contacto de ' + req.query.name,
        text: 'Nombre: ' + req.query.name + ' |E-mail: ' + req.query.from + ' |Mensaje: ' + req.query.message,
        html: 'Hola Thools, tenemos un nuevo contacto<br><br> <strong>Nombre: </strong>' + req.query.name + '<br><strong>E-mail:  </strong>' + req.query.from + '<br><strong>Mensaje:  </strong>' + req.query.message,
    };
    sgMail.send(msg, (error, result) => {
        if (error) {
            // Do something with the error
        } else {
            res.status(200).send('Gracias por contactarnos')
        }
    });
}