import nodemailer from "nodemailer";
import { config } from "../config/index";

export const sendEmail = async (email: string, subject: string, content: string, isHtml: boolean = false) => {
  try {
    // Create transporter configuration object
    const transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: config.emailPort,
      secure: config.nodeEnv === "production",
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    } as nodemailer.TransportOptions);

    // Send email
    await transporter.sendMail({
      from: config.emailUser,
      to: email,
      subject,
      [isHtml ? 'html' : 'text']: content,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};