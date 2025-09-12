import transporter from "@config/email-service-config";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  try {
    const info = await transporter.sendMail({
      from: '"Cheesemiz" earlbryanburaay@gmail.com"',
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
