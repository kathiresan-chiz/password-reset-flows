const nodemailer = require("nodemailer");

const sendEmail = async (to, link) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are not set in environment variables");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Password Reset",
    html: `
      <p>Click below to reset your password:</p>
      <a href="${link}">${link}</a>
    `,
  });
};

module.exports = sendEmail;
