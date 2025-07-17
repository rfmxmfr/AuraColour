import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = createClient()
    
    const { data: report } = await supabase
      .from('analyst_reports')
      .select('*, questionnaire_submissions(*)')
      .eq('id', params.id)
      .single()

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    const customerEmail = report.questionnaire_submissions?.email
    const customerName = report.ai_analysis?.customerName || 'Valued Customer'

    await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: [customerEmail],
      subject: 'Your Personal Color Analysis Report is Ready! 🎨',
      html: generateReportHTML(report.ai_analysis),
    })

    await supabase
      .from('analyst_reports')
      .update({ status: 'sent' })
      .eq('id', params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send report' }, { status: 500 })
  }
}

function generateReportHTML(reportData: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #21808D; font-size: 28px;">Your Personal Color Analysis</h1>
        <h2 style="color: #666; font-size: 24px;">You are a ${ reportData.season }!</h2>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3 style="color: #21808D;">Your Perfect Colors</h3>
        <div style="display: flex; gap: 10px; justify-content: center; margin: 15px 0;">
          ${ reportData.bestColors?.map((color: string) => 
    `<div style="width: 40px; height: 40px; background: ${ color }; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>`
  ).join('') || '' }
        </div>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="color: #21808D;">Makeup Tips</h3>
        <p>${ reportData.makeupTips }</p>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="color: #21808D;">Wardrobe Recommendations</h3>
        <p>${ reportData.wardrobeTips }</p>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="color: #21808D;">Shopping Guide</h3>
        <p>${ reportData.shoppingGuide }</p>
      </div>

      <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-style: italic;">${ reportData.personalMessage }</p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #666;">Thank you for choosing AuraColor!</p>
      </div>
    </div>
  `
}