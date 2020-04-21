const sgMail = require('@sendgrid/mail')

export default async function (req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    var email = new sendgrid.Email({
        to: 'juankamilo@gmail.com',
        from: 'jcramirez@thoools.com',
        subject: 'New message from ' + req.data.from,
        html: "Name: " + req.data.name + "<br/><br/>Message: " + req.data.message
    });

    sendgrid.send(email, function (err, json) {
        if (err) {
            req(err)
        } else {
            req(null, "Your message has been submitted!")
        }
    });
}