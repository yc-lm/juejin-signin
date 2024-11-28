const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.qq.email",
    port: 465,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "maddison53@ethereal.email",
        pass: "",
    },
});
const sendEmail = async (transporter, {to='',subject='',text='',html=''}) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "maddison53@ethereal.email", // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {
    transporter,
    sendEmail
}
