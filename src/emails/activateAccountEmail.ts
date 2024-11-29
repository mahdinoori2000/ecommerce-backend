import { sendEmail } from "@utils/emailHelper";

export const sendWelcomeEmail = async (email: string) => {
  const subject = "Welcome to our app!";
  const html = `
    <h1>Welcome!</h1>
    <p>Thanks for signing up to our app. We hope you enjoy your stay!</p>
  `;

  await sendEmail(email, subject, html, true);
};