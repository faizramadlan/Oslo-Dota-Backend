const nodemailer = require('nodemailer');

class EmailService {
  static async sendRegistrationEmail(email, username) {
    if (!process.env.email_address || !process.env.email_password) {
      console.warn('Email credentials not found in env. Registration email skipped.');
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email_address,
          pass: process.env.email_password,
        },
      });

      const mailOptions = {
        from: process.env.email_address,
        to: email,
        subject: 'Thank You for Registering to Oslo',
        text: `Hello ${username}, thank you for registering to our website.`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      // We don't throw here to avoid blocking the user registration flow if email fails
    }
  }
}

module.exports = { EmailService };
