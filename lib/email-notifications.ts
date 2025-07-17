import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendStyleResults(email: string, name: string, analysis: any, serviceType = '12-Season Color Analysis') {
  try {
    let subject = '';
    let htmlContent = '';
    
    switch(serviceType) {
      case 'Virtual Wardrobe Curation':
        subject = 'Your Virtual Wardrobe Analysis Results';
        htmlContent = `
          <h2>Hello ${name}!</h2>
          <p>Your wardrobe analysis is complete.</p>
          <h3>Analysis Results:</h3>
          <ul>
            <li><strong>Dominant Style:</strong> ${analysis.dominant_style || 'N/A'}</li>
            <li><strong>Versatility Score:</strong> ${analysis.versatility_score || 0}/100</li>
            <li><strong>Organization Level:</strong> ${analysis.organization_level || 0}/100</li>
          </ul>
          <h3>Recommended Additions:</h3>
          <ul>
            ${analysis.recommended_additions?.map((item: string) => `<li>${item}</li>`).join('') || 'No recommendations yet'}
          </ul>
          <p>Best regards,<br>AuraColor Team</p>
        `;
        break;
      case 'Personal Shopping Service':
        subject = 'Your Personal Shopping Style Profile';
        htmlContent = `
          <h2>Hello ${name}!</h2>
          <p>Your personal shopping style profile is ready.</p>
          <h3>Style Profile:</h3>
          <p>${analysis.style_profile || 'Custom profile being prepared'}</p>
          <h3>Recommended Brands:</h3>
          <p>${analysis.recommended_brands || 'Personalized recommendations coming soon'}</p>
          <h3>Statement Pieces:</h3>
          <ul>
            ${analysis.statement_pieces?.map((item: string) => `<li>${item}</li>`).join('') || 'Coming soon'}
          </ul>
          <p>Best regards,<br>AuraColor Team</p>
        `;
        break;
      case 'Style Evolution Coaching':
        subject = 'Your Style Evolution Assessment';
        htmlContent = `
          <h2>Hello ${name}!</h2>
          <p>Your style evolution assessment is ready.</p>
          <h3>Current Style Assessment:</h3>
          <p>${analysis.current_style_assessment || 'Detailed assessment in progress'}</p>
          <h3>Transformation Potential:</h3>
          <p>${analysis.transformation_potential || 0}/100</p>
          <h3>Recommended Direction:</h3>
          <p>${analysis.recommended_direction || 'Personalized direction coming soon'}</p>
          <p>Best regards,<br>AuraColor Team</p>
        `;
        break;
      default: // 12-Season Color Analysis
        subject = `Your ${analysis.season} Color Analysis Results`;
        htmlContent = `
          <h2>Hello ${name}!</h2>
          <p>Your color analysis is complete. You are a <strong>${analysis.season}</strong> with ${analysis.confidence}% confidence.</p>
          <h3>Your Colors:</h3>
          <div style="display: flex; gap: 10px;">
            ${analysis.recommended_colors?.map((color: string) => `<div style="width: 40px; height: 40px; background: ${color}; border-radius: 50%;"></div>`).join('') || ''}
          </div>
          <p>Best regards,<br>AuraColor Team</p>
        `;
    }
    
    await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: email,
      subject: subject,
      html: htmlContent
    })
    return true
  } catch (error) {
    console.error('Email send failed:', error)
    return false
  }
}

export async function sendAdminAlert(type: string, data: any) {
  try {
    // Determine what result to show based on the service type
    let resultInfo = '';
    if (data.service) {
      switch(data.service) {
        case 'Virtual Wardrobe Curation':
          resultInfo = `Service: ${data.service}`;
          break;
        case 'Personal Shopping Service':
          resultInfo = `Service: ${data.service}${data.budget ? `, Budget: ${data.budget}` : ''}`;
          break;
        case 'Style Evolution Coaching':
          resultInfo = `Service: ${data.service}, Program: 3-Month Style Evolution`;
          break;
        default: // Color Analysis
          resultInfo = `Season: ${data.season || 'N/A'}`;
      }
    } else {
      resultInfo = `Result: ${data.season || 'N/A'}`;
    }
    
    await resend.emails.send({
      from: 'AuraColor <alerts@auracolor.com>',
      to: 'admin@auracolor.com',
      subject: `New ${type} - ${data.email}`,
      html: `
        <h3>New ${type}</h3>
        <p><strong>Customer:</strong> ${data.name} (${data.email})</p>
        <p><strong>${resultInfo}</strong></p>
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