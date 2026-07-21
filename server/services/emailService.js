const {
  sendEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
  sendOTPEmail,
  sendOrderEmail,
} = require("../utils/sendEmail");

class EmailService {
  static async sendWelcome(user) {
    return await sendWelcomeEmail(user);
  }

  static async sendOTP(user, otp) {
    return await sendOTPEmail(user, otp);
  }

  static async forgotPassword(user, resetLink) {
    return await sendForgotPasswordEmail(user, resetLink);
  }

  static async orderConfirmation(user, order) {
    return await sendOrderEmail(user, order);
  }

  static async customEmail(to, subject, html) {
    return await sendEmail({
      to,
      subject,
      html,
    });
  }
}

module.exports = EmailService;