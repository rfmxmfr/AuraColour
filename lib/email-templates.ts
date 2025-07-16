export const emailTemplates = {
  // Contact form confirmation
  contactConfirmation: (name: string) => ({
    subject: "Thank you for contacting AuraColor! 🎨",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🎨 AuraColor</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your Personal Color Analysis Experts</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px;">Hi ${name}!</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for reaching out to AuraColor! We've received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border-left: 4px solid #667eea; margin: 30px 0;">
            <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 18px;">While you wait, why not:</h3>
            <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Take our free color analysis quiz</li>
              <li>Browse our service offerings</li>
              <li>Follow us on social media for style tips</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/questionnaire" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Take Free Quiz
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin: 30px 0 0 0;">
            Best regards,<br>
            <strong>Tania & The AuraColor Team</strong><br>
            Glasgow, Scotland
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            AuraColor | Professional Color Analysis | Glasgow, Scotland<br>
            <a href="mailto:hello@auracolor.com" style="color: #667eea;">hello@auracolor.com</a>
          </p>
        </div>
      </div>
    `
  }),

  // Color analysis results
  colorResults: (name: string, results: any) => ({
    subject: `Your AuraColor Analysis Results are Ready! ${results.season ? `You're a ${results.season}!` : ''} 🎨`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🎨 Your Color Analysis</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Personalized Results for ${name}</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; display: inline-block; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 32px; font-weight: 700;">${results.season || 'Your Season'}</h2>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Confidence: ${results.confidence || '85'}%</p>
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px;">Your Perfect Colors</h3>
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px; margin: 20px 0;">
              ${results.topColors ? results.topColors.map((color: string) => `
                <div style="text-align: center;">
                  <div style="width: 60px; height: 60px; background: ${color}; border-radius: 50%; margin: 0 auto 8px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
                  <div style="font-size: 12px; color: #4a5568; font-weight: 500;">${color}</div>
                </div>
              `).join('') : `
                <div style="text-align: center; color: #64748b;">
                  <p>Your personalized color palette will be revealed in your full analysis!</p>
                </div>
              `}
            </div>
          </div>
          
          <div style="background: #fff5f5; border: 1px solid #fed7d7; padding: 25px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #c53030; margin: 0 0 15px 0; font-size: 18px;">🎯 What This Means for You</h3>
            <p style="color: #4a5568; line-height: 1.6; margin: 0;">
              ${results.description || 'Your color season determines which colors will make you look radiant, confident, and naturally beautiful. These colors complement your natural undertones and enhance your best features.'}
            </p>
          </div>
          
          <div style="background: linear-gradient(135deg, #f0fff4 0%, #f0f9ff 100%); padding: 25px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">✨ Ready for Your Complete Analysis?</h3>
            <p style="color: #4a5568; line-height: 1.6; margin: 0 0 20px 0;">
              This is just the beginning! Get your full professional analysis with:
            </p>
            <ul style="color: #4a5568; margin: 0 0 20px 0; padding-left: 20px; line-height: 1.8;">
              <li>30+ personalized colors in your palette</li>
              <li>Detailed styling guide and recommendations</li>
              <li>Shopping guide with specific brands and items</li>
              <li>Makeup and hair color suggestions</li>
              <li>One-on-one consultation with Tania</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/services" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block; margin-right: 15px;">
              View Services
            </a>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact" 
               style="background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block; border: 2px solid #667eea;">
              Book Consultation
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin: 30px 0 0 0;">
            With love and color,<br>
            <strong>Tania Hernando Crespo</strong><br>
            Founder, AuraColor<br>
            Glasgow, Scotland
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 10px 0;">
            Follow us for daily style inspiration:
          </p>
          <div style="margin: 10px 0;">
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Instagram</a>
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Pinterest</a>
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">TikTok</a>
          </div>
          <p style="color: #64748b; font-size: 12px; margin: 10px 0 0 0;">
            AuraColor | Professional Color Analysis | Glasgow, Scotland<br>
            <a href="mailto:hello@auracolor.com" style="color: #667eea;">hello@auracolor.com</a> | +44 (0) 123 456 7890
          </p>
        </div>
      </div>
    `
  }),

  // Booking confirmation
  bookingConfirmation: (name: string, service: string, amount: string, date: string) => ({
    subject: `Booking Confirmed! Your ${service} is scheduled 🎉`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🎉 Booking Confirmed!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">We can't wait to work with you, ${name}!</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 25px; border-radius: 12px; margin: 0 0 30px 0;">
            <h3 style="color: #065f46; margin: 0 0 20px 0; font-size: 20px;">📋 Booking Details</h3>
            <div style="color: #374151; line-height: 1.8;">
              <p style="margin: 0 0 10px 0;"><strong>Service:</strong> ${service}</p>
              <p style="margin: 0 0 10px 0;"><strong>Amount:</strong> ${amount}</p>
              <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 0 0 10px 0;"><strong>Status:</strong> <span style="color: #059669; font-weight: 600;">Confirmed</span></p>
            </div>
          </div>
          
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 25px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">📝 What Happens Next?</h3>
            <ol style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>We'll review your questionnaire responses</li>
              <li>Tania will personally analyze your photos and answers</li>
              <li>You'll receive your detailed color analysis within 3-5 business days</li>
              <li>Follow-up consultation call will be scheduled if included in your service</li>
            </ol>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #1a202c; margin: 0 0 15px 0; font-size: 18px;">💡 Preparation Tips</h3>
            <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Make sure your photos are clear and well-lit</li>
              <li>Remove any makeup for the most accurate analysis</li>
              <li>Have a white or neutral background if possible</li>
              <li>Include photos with different lighting conditions</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #4a5568; margin: 0 0 20px 0;">Questions about your booking?</p>
            <a href="mailto:hello@auracolor.com" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Contact Us
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin: 30px 0 0 0;">
            Excited to reveal your colors!<br>
            <strong>Tania & The AuraColor Team</strong><br>
            Glasgow, Scotland
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            AuraColor | Professional Color Analysis | Glasgow, Scotland<br>
            <a href="mailto:hello@auracolor.com" style="color: #667eea;">hello@auracolor.com</a> | +44 (0) 123 456 7890
          </p>
        </div>
      </div>
    `
  }),

  // Welcome/Newsletter signup
  welcome: (name: string) => ({
    subject: "Welcome to AuraColor! Your style journey begins now 🌈",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🌈 Welcome to AuraColor!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your personal style transformation starts here</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px;">Hi ${name}! 👋</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin: 0 0 25px 0;">
            Welcome to the AuraColor family! I'm Tania, and I'm thrilled you've joined us on this colorful journey of self-discovery and style transformation.
          </p>
          
          <div style="background: linear-gradient(135deg, #fef7ff 0%, #f0f9ff 100%); padding: 25px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 18px;">🎨 What You Can Expect</h3>
            <ul style="color: #4a5568; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Weekly style tips and color inspiration</li>
              <li>Exclusive access to new services and offers</li>
              <li>Personal styling advice from Tania</li>
              <li>Seasonal color trend updates</li>
              <li>Behind-the-scenes content from Glasgow</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 18px;">Ready to discover your perfect colors?</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/questionnaire" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block; margin-bottom: 15px;">
              Take Free Color Quiz
            </a>
            <br>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/services" 
               style="color: #667eea; text-decoration: none; font-weight: 500;">
              Or browse our services →
            </a>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border-left: 4px solid #667eea; margin: 30px 0;">
            <h3 style="color: #667eea; margin: 0 0 10px 0; font-size: 16px;">💌 A Personal Note from Tania</h3>
            <p style="color: #4a5568; line-height: 1.6; margin: 0; font-style: italic;">
              "Every person has colors that make them shine. My mission is to help you discover yours and feel confident in your own skin. From Barcelona to Glasgow, I've learned that style is universal, but your colors are uniquely yours."
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin: 30px 0 0 0;">
            Here's to your most colorful chapter yet!<br>
            <strong>Tania Hernando Crespo</strong><br>
            Founder & Color Analyst<br>
            AuraColor, Glasgow
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 10px 0;">
            Connect with us:
          </p>
          <div style="margin: 10px 0;">
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Instagram</a>
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Pinterest</a>
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">TikTok</a>
          </div>
          <p style="color: #64748b; font-size: 12px; margin: 10px 0 0 0;">
            AuraColor | Glasgow, Scotland<br>
            <a href="mailto:hello@auracolor.com" style="color: #667eea;">hello@auracolor.com</a>
          </p>
        </div>
      </div>
    `
  })
}