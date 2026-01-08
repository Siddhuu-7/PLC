import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

transporter.verify().then(() => {
  console.log('Mail transporter ready');
}).catch(err => {
  console.error('Mail transporter error:', err);
});

/**
 * sendVerificationPendingEmail
 * @param {Object} options
 * @param {string} options.to - recipient email
 * @param {string} options.name - recipient name
 * @param {string} options.registerNumber - user's register number or id
 * @param {string} [options.verifyUrl] - optional direct link to verify page
 */
async function sendVerificationPendingEmail({ to, name, registerNumber }) {
  const fromName = process.env.FROM_NAME || 'YourApp';
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

  const html = getPendingHtml({ name, registerNumber });

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject: `${fromName} — Account received, pending verification`,
    html
  };

  return transporter.sendMail(mailOptions);
}

function getPendingHtml({ name, registerNumber }) {
  const safeName = name || 'User';
  const safeRegister = registerNumber || '';
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Account pending verification</title>
    <style>
      /* Basic reset */
      body { margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; background:#f4f6f8; color:#111; }
      .container { max-width:600px; margin:32px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06); }
      .header { padding:24px; background:linear-gradient(90deg,#1d4ed8,#3b82f6); color:#fff; }
      .content { padding:24px; }
      .title { font-size:20px; font-weight:600; margin:0 0 8px; }
      .lead { margin:0 0 16px; color:#334155; }
      .badge { display:inline-block; padding:6px 10px; border-radius:999px; background:#eef2ff; color:#1e3a8a; font-weight:600; font-size:13px; margin-bottom:16px; }
      .info { background:#f8fafc; border:1px solid #e6eef8; padding:12px; border-radius:6px; margin:12px 0; color:#0f172a; }
      .btn { display:inline-block; text-decoration:none; padding:12px 20px; border-radius:8px; background:#1d4ed8; color:#fff; font-weight:600; }
      .muted { color:#60748b; font-size:13px; margin-top:16px; }
      .footer { padding:16px; text-align:center; font-size:12px; color:#94a3b8; }
      @media (max-width:480px) {
        .container { margin:12px; }
        .header, .content { padding:16px; }
      }
    </style>
  </head>
  <body>
    <div class="container" role="article" aria-label="Account pending verification">
      <div class="header">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-weight:700;font-size:18px">${process.env.FROM_NAME || 'YourApp'}</div>
        </div>
      </div>

      <div class="content">
        <div class="badge">Account Pending Verification</div>
        <h1 class="title">Thanks for signing up, ${escapeHtml(safeName)}!</h1>
        <p class="lead">We received your registration (ID: <strong>${escapeHtml(safeRegister)}</strong>). Our team will review and verify your account shortly.</p>

        <div class="info">
          <div><strong>What happens next?</strong></div>
          <ul style="margin:8px 0 0 18px;padding:0;">
            <li>We will verify your details within 24–48 hours.</li>
            <li>Once verified, we’ll notify you and you’ll be able to sign in.</li>
          </ul>
        </div>


        <p class="muted">If you did not sign up for this account, please ignore this email or contact support.</p>

        <p style="margin-top:20px;font-size:13px;color:#5b6b7b">Best,<br/>The ${escapeHtml(process.env.FROM_NAME || 'YourApp')} Team</p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} ${escapeHtml(process.env.FROM_NAME || 'YourApp')}. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


async function sendVerificationEmail(userEmail, userName) {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS,
    },
  });

  
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
      <h2 style="color:#4CAF50; margin-bottom: 20px;">🎉 Account Verified!</h2>
      <p style="font-size:16px; color:#333;">Hello <b>${userName}</b>,</p>
      <p style="font-size:15px; color:#555; line-height: 1.6;">
        Great news! Your account has been successfully <b>verified</b> by our admin team.  
        You can now access all features without restrictions.
      </p>
      <a href="${process.env.VITE_backend_Url}/login" 
         style="display:inline-block; margin-top:20px; background:#4CAF50; color:#fff; padding:12px 24px; border-radius:5px; text-decoration:none; font-size:16px;">
         Go to Dashboard
      </a>
      <p style="margin-top: 30px; font-size: 13px; color:#888;">
        If you didn’t request this, please ignore this email or contact support.
      </p>
    </div>
    <p style="text-align:center; font-size:12px; color:#aaa; margin-top:20px;">
      © ${new Date().getFullYear()} Your Company. All rights reserved.
    </p>
  </div>
  `;

  // Send Mail
  await transporter.sendMail({
    from: `"Your App" <${process.env.FROM_NAME}>`, // fixed to match above
    to: userEmail,
    subject: "✅ Your Account Has Been Verified",
    html: htmlContent,
  });
}

export {
  sendVerificationEmail,
  sendVerificationPendingEmail
};
