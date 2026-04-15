const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handleSendMessage = async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    console.log("Received message:", {
      name,
      email,
      company,
      service,
      message,
    });

    // Email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:10px;">

          <h2 style="color:#333;">📩 New Message Received</h2>
          <p>You got a new message from your portfolio website.</p>

          <hr>

          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>🏢 Company:</strong> ${company || "Not provided"}</p>
          <p><strong>🛠️ Service:</strong> ${service || "Not provided"}</p>

          <hr>

          <p><strong>💬 Message:</strong></p>
          <p style="background:#f9f9f9; padding:10px; border-radius:5px;">
            ${message}
          </p>

          <br>
          <p style="font-size:12px; color:gray;">
            Sent from your contact form
          </p>

        </div>
      </div>
    `;

    // Send email with Resend
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: htmlContent,
    });

    console.log("Email sent successfully:", result);

    return res.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};
