import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import PDFDocument from 'pdfkit'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  
  try {
    const supabase = await createClient()
    
    const { data: report } = await supabase
      .from('analyst_reports')
      .select('*, questionnaire_submissions(*)')
      .eq('id', params.id)
      .single()

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    const pdfBuffer = await generatePDF(report)
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="color-analysis-${params.id}.pdf"`
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}

function generatePDF(report: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 })
    const chunks: Buffer[] = []
    
    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // Header
    doc.fontSize(24).fillColor('#7C3AED').text('AuraColor Analysis Report', { align: 'center' })
    doc.moveDown(2)

    // Customer Info
    const customer = report.questionnaire_submissions
    if (customer) {
      doc.fontSize(16).fillColor('#374151').text(`Customer: ${customer.name}`)
      doc.fontSize(12).fillColor('#6B7280').text(`Email: ${customer.email}`)
      doc.moveDown()
    }

    // Analysis Results
    const analysis = report.ai_analysis || {}
    doc.fontSize(20).fillColor('#1F2937').text('Your Color Season')
    doc.fontSize(16).fillColor('#7C3AED').text(analysis.season || 'Not determined', { indent: 20 })
    doc.moveDown()

    doc.fontSize(14).fillColor('#374151').text(`Confidence Score: ${report.confidence_score || 0}%`)
    doc.moveDown()

    // Color Palette
    if (report.color_recommendations?.length > 0) {
      doc.fontSize(16).fillColor('#1F2937').text('Recommended Colors:')
      report.color_recommendations.forEach((color: string) => {
        doc.fontSize(12).fillColor('#6B7280').text(`• ${color}`, { indent: 20 })
      })
      doc.moveDown()
    }

    // Styling Notes
    if (report.styling_notes) {
      doc.fontSize(14).fillColor('#374151').text('Analysis Details:')
      doc.fontSize(11).fillColor('#6B7280').text(report.styling_notes, { indent: 20 })
    }

    // Footer
    doc.fontSize(10).fillColor('#9CA3AF')
      .text(`Generated on ${new Date().toLocaleDateString()}`, 50, doc.page.height - 50)
      .text('AuraColor Professional Color Analysis', { align: 'right' })

    doc.end()
  })
}