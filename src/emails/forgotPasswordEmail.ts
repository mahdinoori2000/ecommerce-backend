import { sendEmail } from "@utils/emailHelper";

export const sendForgotPasswordEmail = async (email: string, resetURL: string) => {
  const subject = "Reset your password";
  const html = `
    <h1>Forgot your password?</h1>
    <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
  `;

  await sendEmail(email, subject, html, true);
};