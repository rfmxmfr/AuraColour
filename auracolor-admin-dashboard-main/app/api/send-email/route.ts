import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, attachments } = await request.json()

    const { data, error } = await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.co.uk>',
      to,
      subject,
      html,
      attachments,
    })

    if (error) {
      // console.error('Email send error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })

  } catch (error) {
    // console.error('Email API error:', error)
    return NextResponse.json({ error: 'Email service error' }, { status: 500 })
  }
}