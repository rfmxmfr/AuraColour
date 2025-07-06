import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendColorAnalysisResults(email: string, name: string, analysis: any) {
  try {
    await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: email,
      subject: `Your ${analysis.season} Color Analysis Results`,
      html: `
        <h2>Hello ${name}!</h2>
        <p>Your color analysis is complete. You are a <strong>${analysis.season}</strong> with ${analysis.confidence}% confidence.</p>
        <h3>Your Colors:</h3>
        <div style="display: flex; gap: 10px;">
          ${analysis.colors?.map((color: string) => `<div style="width: 40px; height: 40px; background: ${color}; border-radius: 50%;"></div>`).join('') || ''}
        </div>
        <p>Best regards,<br>AuraColor Team</p>
      `
    })
    return true
  } catch (error) {
    console.error('Email send failed:', error)
    return false
  }
}

export async function sendAdminAlert(type: string, data: any) {
  try {
    await resend.emails.send({
      from: 'AuraColor <alerts@auracolor.com>',
      to: 'admin@auracolor.com',
      subject: `New ${type} - ${data.email}`,
      html: `
        <h3>New ${type}</h3>
        <p><strong>Customer:</strong> ${data.name} (${data.email})</p>
        <p><strong>Result:</strong> ${data.season || 'N/A'}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `
    })
    return true
  } catch (error) {
    console.error('Admin alert failed:', error)
    return false
  }
}

export async function sendClientConfirmation(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: email,
      subject: 'Welcome to AuraColor!',
      html: `
        <h2>Welcome ${name}!</h2>
        <p>Thank you for choosing AuraColor. We'll process your analysis and send results within 48 hours.</p>
        <p>Best regards,<br>AuraColor Team</p>
      `
    })
    return true
  } catch (error) {
    console.error('Confirmation email failed:', error)
    return false
  }
}