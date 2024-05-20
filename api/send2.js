const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.sendgrid_api_key)

  const content = {
    to: ['juankamilo@gmail.com', 'Juan Camilo Ramirez Ortiz <jcramirez@thools.com>', 'Jadir Gabriel Acuña Ortiz <jgacuna@thools.com>', 'Julian Mauricio Urueña Ramirez <juruena@thools.com>', 'Jhon Jairo Ortiz Beltran < jortiz@thools.com>'],
    from: 'Contacto Thools Consulting <jcramirez@thools.com>',
    subject: 'Nuevo contacto de ' + req.body.email,
    text: 'Nombre: ' + req.body.nombre + ' |E-mail: ' + req.body.email + ' |Mensaje: ' + req.body.empresa,
    html: 'Nuevo contacto de:<br><br>' +
    '<strong>Nombre: </strong>' + req.body.nombre + '<br>'+
    '<strong>Empresa: </strong>' + req.body.empresa + '<br>'+
    '<strong>Cargo: </strong>' + req.body.cargo + '<br>'+
    '<strong>E-mail: </strong>' + req.body.email + '<br>'+
    '<strong>Dirección: </strong>' + req.body.direccion + '<br>'+
    '<strong>Fecha tentativa: </strong>' + req.body.fecha + '<br>'+
    '<strong>Interesado en: </strong>' + req.body.interesado + '<br>'+
    '<strong>Mensaje:  </strong>' + req.body.mensaje +
    '<br>' +
    '<br>' +
    '<strong>Formulario de contacto en Thools.com</strong>'
};

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }

}