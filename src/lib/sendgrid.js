import sgMail from '@sendgrid/mail';

export const sendEmail = async (to, subject, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject,
    html
  };
  console.log("send email message: ", msg)

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};