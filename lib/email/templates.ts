import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@insideout.com'

export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailTemplate) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text,
    })

    if (error) {
      console.error('Email sending error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

// Welcome email template
export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to InsideOut - Your Journey Starts Here',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Welcome to InsideOut!</h1>
        <p>Hi ${name || 'there'},</p>
        <p>Welcome to InsideOut, your comprehensive platform for transgender healthcare, resources, and community support.</p>
        <p>Here's what you can explore:</p>
        <ul>
          <li><strong>Healthcare Services:</strong> Find qualified providers and gender-affirming care</li>
          <li><strong>Resources:</strong> Access educational materials, community support, and financial assistance</li>
          <li><strong>Shop:</strong> Browse our curated selection of gender-affirming products</li>
          <li><strong>Research:</strong> Stay informed about clinical trials and latest research</li>
          <li><strong>Community:</strong> Connect with others on similar journeys</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Explore InsideOut</a>
        </div>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The InsideOut Team</p>
      </div>
    `,
    text: `Welcome to InsideOut! Your comprehensive platform for transgender healthcare, resources, and community support. Visit ${process.env.NEXT_PUBLIC_APP_URL} to get started.`
  })
}

// Email verification template
export async function sendEmailVerification(email: string, verificationUrl: string) {
  return sendEmail({
    to: email,
    subject: 'Verify Your Email Address - InsideOut',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
        <p>Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Verify Email</a>
        </div>
        <p>If you didn't create an account, you can ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
    text: `Verify your email address by visiting: ${verificationUrl}`
  })
}

// Password reset template
export async function sendPasswordReset(email: string, resetUrl: string) {
  return sendEmail({
    to: email,
    subject: 'Reset Your Password - InsideOut',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Reset Your Password</h1>
        <p>You requested a password reset. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
        </div>
        <p>If you didn't request this, you can ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
    text: `Reset your password by visiting: ${resetUrl}`
  })
}

// Order confirmation template
export async function sendOrderConfirmation(
  email: string, 
  orderData: {
    orderId: string
    totalAmount: number
    items: Array<{ name: string; quantity: number; price: number }>
    shippingAddress: any
  }
) {
  const itemsHtml = orderData.items
    .map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `)
    .join('')

  return sendEmail({
    to: email,
    subject: `Order Confirmation #${orderData.orderId} - InsideOut`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Order Confirmed!</h1>
        <p>Thank you for your order. Here are the details:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3>Order #${orderData.orderId}</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #e9ecef;">
                <th style="padding: 12px 8px; text-align: left;">Item</th>
                <th style="padding: 12px 8px; text-align: center;">Qty</th>
                <th style="padding: 12px 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="text-align: right; margin-top: 20px; font-size: 18px; font-weight: bold;">
            Total: $${orderData.totalAmount.toFixed(2)}
          </div>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3>Shipping Address</h3>
          <p>
            ${orderData.shippingAddress.line1}<br>
            ${orderData.shippingAddress.line2 ? orderData.shippingAddress.line2 + '<br>' : ''}
            ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.postalCode}<br>
            ${orderData.shippingAddress.country}
          </p>
        </div>

        <p>You'll receive a shipping notification once your order is on its way.</p>
        <p>Questions? Contact our support team.</p>
      </div>
    `,
    text: `Order confirmed! Order #${orderData.orderId} total: $${orderData.totalAmount.toFixed(2)}`
  })
}

// Appointment reminder template
export async function sendAppointmentReminder(
  email: string,
  appointmentData: {
    title: string
    date: string
    location?: string
    virtualLink?: string
  }
) {
  return sendEmail({
    to: email,
    subject: `Appointment Reminder: ${appointmentData.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Appointment Reminder</h1>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3>${appointmentData.title}</h3>
          <p><strong>Date & Time:</strong> ${appointmentData.date}</p>
          ${appointmentData.location ? `<p><strong>Location:</strong> ${appointmentData.location}</p>` : ''}
          ${appointmentData.virtualLink ? `<p><strong>Join Link:</strong> <a href="${appointmentData.virtualLink}">${appointmentData.virtualLink}</a></p>` : ''}
        </div>
        <p>Please make sure to arrive on time. If you need to reschedule, please contact us as soon as possible.</p>
      </div>
    `,
    text: `Appointment reminder: ${appointmentData.title} on ${appointmentData.date}`
  })
}
