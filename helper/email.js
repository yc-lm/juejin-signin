const nodemailer = require("nodemailer");

const MY_EMAIL = 'test@qq.com'
const AUTH = {
    user: MY_EMAIL,
    pass: "xxxxx",
}
const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: AUTH
});
const sendEmail = async ({to = '', subject = '', text = '', html = ''}) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: MY_EMAIL, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {
    sendEmail
}
