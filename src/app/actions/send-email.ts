"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // App Password
  },
});

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    // Basic sanitization function to prevent HTML injection
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: `"${sanitizedName}" <${process.env.GMAIL_USER}>`,
      to: "giocreates.23@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #111111; color: #ffffff; border: 1px solid #333333; overflow: hidden;">
              
              <!-- Header -->
              <div style="background-color: #000000; padding: 20px; text-align: center; border-bottom: 2px solid #ff0a0a;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Formline</h1>
              </div>

              <!-- Content -->
              <div style="padding: 30px 20px;">
                <h2 style="margin-top: 0; color: #ff0a0a; font-size: 18px;">New Contact Form Submission</h2>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333333; width: 80px; color: #888888;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333333; color: #ffffff;">${sanitizedName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333333; color: #888888;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333333; color: #ffffff;">
                      <a href="mailto:${sanitizedEmail}" style="color: #ff0a0a; text-decoration: none;">${sanitizedEmail}</a>
                    </td>
                  </tr>
                </table>

                <div style="margin-top: 25px;">
                  <p style="color: #888888; margin-bottom: 10px;"><strong>Message:</strong></p>
                  <div style="background-color: #000000; padding: 15px; border-left: 3px solid #ff0a0a; color: #dddddd; line-height: 1.6;">
                    ${sanitizedMessage}
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #000000; padding: 15px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #333333;">
                <p style="margin: 0;">Sent via Formline Contact Form</p>
                <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} Formline AI</p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
