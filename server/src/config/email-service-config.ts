import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST as string,
  port: process.env.BREVO_SMTP_PORT
    ? parseInt(process.env.BREVO_SMTP_PORT)
    : undefined,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER as string,
    pass: process.env.BREVO_SMTP_PASSWORD as string,
  },
});

export default transporter;
