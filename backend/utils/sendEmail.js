const nodemailer = require("nodemailer");

const sendEmail = async (to, link) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are not set in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset",
    html: `<p>Click below to reset your password:</p>
           <a href="${link}">${link}</a>`
  });
};

module.exports = sendEmail;
