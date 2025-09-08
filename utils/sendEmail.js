const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async (to, subject, text) => {
  try {
    console.log("📩 Sending email to:", to);   // Debug log
    const response = await resend.emails.send({
      from: "Food Heaven <onboarding@resend.dev>",
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};
module.exports = sendEmail;