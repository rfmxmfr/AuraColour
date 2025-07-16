import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendClientConfirmation, sendAdminAlert } from '@/lib/email-notifications'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = createClient()
    
    const voucherCode = `GV-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 12)
    
    const { data: voucher } = await supabase.from('gift_vouchers').insert({
      voucher_code: voucherCode,
      purchaser_email: data.purchaser_email,
      purchaser_name: data.purchaser_name,
      recipient_email: data.recipient_email,
      recipient_name: data.recipient_name,
      amount: data.amount || 75,
      personal_message: data.personal_message,
      expiry_date: expiryDate.toISOString(),
      status: 'active',
      services_eligible: ['color_analysis', 'virtual_wardrobe', 'personal_shopping', 'style_coaching']
    }).select().single()

    await Promise.all([
      sendGiftVoucherEmail(data.recipient_email, data.recipient_name, {
        code: voucherCode,
        amount: data.amount || 75,
        message: data.personal_message,
        from: data.purchaser_name
      }),
      sendAdminAlert('Gift Voucher Purchase', { 
        purchaser: data.purchaser_name,
        recipient: data.recipient_name,
        amount: data.amount || 75
      })
    ])

    return NextResponse.json({
      success: true,
      voucher_code: voucherCode,
      expiry_date: expiryDate.toISOString(),
      message: 'Gift voucher created successfully'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Voucher creation failed' }, { status: 500 })
  }
}

async function sendGiftVoucherEmail(email: string, name: string, voucher: any) {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: 'AuraColor <gifts@auracolor.com>',
    to: email,
    subject: `You've received an AuraColor gift voucher!`,
    html: `
      <h2>Hello ${name}!</h2>
      <p>You've received a gift voucher from ${voucher.from}!</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>Voucher Code: <strong>${voucher.code}</strong></h3>
        <p>Value: £${voucher.amount}</p>
        <p>Valid for 12 months</p>
      </div>
      ${voucher.message ? `<p><em>"${voucher.message}"</em></p>` : ''}
      <p>Redeem at auracolor.com</p>
    `
  })
}