const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const { nombre, empresa, email } = req.body

  const content = {
    to: 'juakamilo@gmail.com',
    from: email,
    subject: `New Message From - ${email}`,
    text: empresa,
    html: `<p>${nombre} - ${empresa}</p>`
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }
}