const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const content = {
    to: ['juankamilo@gmail.com', 'Juan Camilo Ramirez Ortiz <jcramirez@thools.com>'],
    from: 'Juan Camilo de Thools Consulting <jcramirez@thools.com>',
    subject: 'Nuevo contacto de ' + req.body.email,
    text: 'Nombre: ' + req.body.nombre + ' |E-mail: ' + req.body.email + ' |Mensaje: ' + req.body.empresa,
    html: 'Hola Thools, tenemos un nuevo contacto de:<br><br>' +
    '<strong>Nombre: </strong>' + req.body.nombre + '<br>'+
    '<strong>Empresa: </strong>' + req.body.empresa + '<br>'+
    '<strong>Cargo: </strong>' + req.body.cargo + '<br>'+
    '<strong>E-mail: </strong>' + req.body.email + '<br>'+
    '<strong>Dirección: </strong>' + req.body.direccion + '<br>'+
    '<strong>Fecha tentativa: </strong>' + req.body.fecha + '<br>'+
    '<strong>Intereado en: </strong>' + req.body.interesado + '<br>'+
    '<strong>Mensaje:  </strong>' + req.body.mensaje
};

  try {
    await sgMail.send(content)
    res.status(200).send(req.body.email + ' ' + req.body.nombre + ' ' + req.body.empresa + ' Message sent successfully. 9.57')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }

}