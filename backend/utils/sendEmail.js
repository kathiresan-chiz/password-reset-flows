const nodemailer = require("nodemailer");

const sendEmail = async (to, link) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("EMAIL_USER or EMAIL_PASS missing");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // APP PASSWORD
      },
    });

    // 🔍 Verify connection (important for debugging)
    await transporter.verify();

    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Password Reset",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${link}">${link}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Nodemailer error:", error);
    throw error;
  }
};

module.exports = sendEmail;
