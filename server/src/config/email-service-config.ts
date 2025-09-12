import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "7a641e004@smtp-brevo.com",
    pass: "xsmtpsib-1a0d3b84e34655d80a76a43d716044f20cc4e7819f691237c564b446b7abf363-9SFOGZgK3kALaNTz",
  },
});

export default transporter;
