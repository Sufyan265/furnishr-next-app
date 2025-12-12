import nodemailer from "nodemailer";

export async function POST(req: any,) {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !adminEmail) {
      console.error('Missing email configuration:', {
        smtpHost: !!smtpHost,
        smtpPort: !!smtpPort,
        smtpUser: !!smtpUser,
        smtpPass: !!smtpPass,
        adminEmail: !!adminEmail,
      });
      return Response.json(
        { success: false, error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, phone, address, order } = body;

    if (!name || !email || !phone || !address || !order) {
      return Response.json(
        { success: false, error: 'Missing required fields: name, email, phone, address, or order' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: smtpUser,
      to: adminEmail,
      subject: "New Order Notification - Furnishr",
      html: `
        <html>
        <body style="font-family: Arial, sans-serif, Helvetica; background: #f5f5f5; padding: 20px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <table width="600" style="background: white; border-radius: 8px; padding: 25px; border: 1px solid #e5e5e5;">
                  
                  <tr>
                    <td style="text-align: center; padding-bottom: 20px;">
                      <h2 style="margin: 0; color: #333;">New Order Notification</h2>
                      <p style="margin: 0; color: #555;">You have received a new order from your store</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 15px 0;">
                      <h3 style="margin: 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Customer Information</h3>
                      <p style="color: #555; margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                      <p style="color: #555; margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                      <p style="color: #555; margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
                      <p style="color: #555; margin: 8px 0;"><strong>Address:</strong> ${address}</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-top: 15px;">
                      <h3 style="margin: 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Order Details</h3>
                      <pre style="background: #fafafa; padding: 15px; border-radius: 6px; color: #333; border: 1px solid #eee; white-space: pre-wrap; font-size: 14px; font-family: Arial, sans-serif;">
                        ${order}
                      </pre>
                    </td>
                  </tr>

                  <tr>
                    <td style="text-align: center; padding-top: 30px; color: #999; font-size: 13px;">
                       © 2025 Furnishr. All rights reserved.
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>

      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return Response.json({ success: true, messageId: info.messageId });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email sending error:', errorMessage);
    return Response.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
