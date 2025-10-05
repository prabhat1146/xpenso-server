require("dotenv").config();
const nodemailer = require("nodemailer");
const Logger = require("../logger");

const transporterPayload = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(transporterPayload);

console.log(transporterPayload)

/**
 * Sends an email using nodemailer.
 * Throws an object with statusCode and message on failure.
 */
async function sendEmail({ to, subject, text, html }) {
  try {
    const options = {
      from: `"Xpenso Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    };
    // console.log(options)
    const info = await transporter.sendMail(options);

    Logger.info(`✅ Email sent: ${to}`);
    return info;
  } catch (error) {
    console.log(error);
    let statusCode = 500;
    let message = "Internal server error";

    if (error.code === "EAUTH" || error.responseCode === 535) {
      statusCode = 401;
      message = "Authentication failed";
    } else if (error.code === "ECONNECTION") {
      statusCode = 503;
      message = "SMTP service unavailable";
    } else if (
      error.code === "EENVELOPE" ||
      error.message.includes("No recipients defined")
    ) {
      statusCode = 400;
      message = "Invalid or missing email fields";
    }

    Logger.error(`❌ Failed to send email: ${message}\n${error.message}`);
    const err = new Error(message);
    err.statusCode = statusCode;
    throw err;
  }
}

module.exports = sendEmail;
