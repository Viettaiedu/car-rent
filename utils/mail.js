// send verify email
// send forgot password
// send reset password

const sgMail = require("@sendgrid/mail");

const sendMail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: `Viet Tai <${process.env.MY_EMAIL}>`,
    subject,
    html,
  };
  return await sgMail.send(msg);
};

const sendVerificationEmail = async ({
  origin,
  email,
  verificationToken,
  name,
}) => {
  const verifyEmail = `${origin}/auth/verify-email?email=${email}&token=${verificationToken}`;
  const html = `
  <h2>Hello ${name} : </h2>
  <h5>Click link below to verify your email</h5>
  <a href='${verifyEmail}'>verify email</a>`;
  return sendMail({ to: email, subject: `Verify email`, html });
};

const sendForgotPassword = async ({ origin, email, name, passwordToken }) => {
  const resetPassword = `${origin}/auth/reset-password?email=${email}&token=${passwordToken}`;
  const html = `
  <h2>Hello ${name}</h2>
  <h5>Click link below to reset your password</h5>
  <a href='${resetPassword}'>verify email</a>
  `;
  return sendMail({ to: email, subject: "Reset password", html });
};

module.exports = { sendVerificationEmail,sendForgotPassword };
