const nodemailer = require("nodemailer");

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

    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Email content
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,

      html: `
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
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
