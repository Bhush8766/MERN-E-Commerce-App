const nodemailer = require("nodemailer");

/**
 * ============================================
 * Create Transporter
 * ============================================
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for port 465
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * ============================================
 * Send Email
 * ============================================
 */
const sendEmail = async ({
  to,
  subject,
  html,
  text = "",
}) => {
  try {
    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email Error:", error);

    throw new Error("Unable to send email");
  }
};

/**
 * ============================================
 * Welcome Email
 * ============================================
 */
const sendWelcomeEmail = async (user) => {
  return sendEmail({
    to: user.email,
    subject: "Welcome to Our Store",
    html: `
      <h2>Hello ${user.name},</h2>

      <p>Welcome to <strong>${process.env.APP_NAME}</strong>.</p>

      <p>Your account has been created successfully.</p>

      <br>

      <p>Happy Shopping ❤️</p>
    `,
  });
};

/**
 * ============================================
 * Forgot Password Email
 * ============================================
 */
const sendForgotPasswordEmail = async (
  user,
  resetLink
) => {
  return sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    html: `
      <h2>Hello ${user.name}</h2>

      <p>Click the button below to reset your password.</p>

      <a href="${resetLink}"
         style="
           padding:12px 20px;
           background:#0d6efd;
           color:#fff;
           text-decoration:none;
           border-radius:5px;
         ">
         Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>
    `,
  });
};

/**
 * ============================================
 * OTP Email
 * ============================================
 */
const sendOTPEmail = async (user, otp) => {
  return sendEmail({
    to: user.email,
    subject: "Email Verification OTP",
    html: `
      <h2>Hello ${user.name}</h2>

      <p>Your verification OTP is:</p>

      <h1 style="letter-spacing:8px;">
        ${otp}
      </h1>

      <p>This OTP expires in 10 minutes.</p>
    `,
  });
};

/**
 * ============================================
 * Order Confirmation Email
 * ============================================
 */
const sendOrderEmail = async (user, order) => {
  return sendEmail({
    to: user.email,
    subject: `Order Confirmed - ${order._id}`,
    html: `
      <h2>Order Confirmed</h2>

      <p>Hello ${user.name},</p>

      <p>Your order has been placed successfully.</p>

      <p>
        <strong>Order ID:</strong>
        ${order._id}
      </p>

      <p>
        <strong>Total:</strong>
        ₹${order.totalPrice}
      </p>

      <p>Thank you for shopping with us.</p>
    `,
  });
};

/**
 * ============================================
 * Export
 * ============================================
 */
module.exports = {
  transporter,
  sendEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
  sendOTPEmail,
  sendOrderEmail,
};