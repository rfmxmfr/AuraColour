import { NextRequest, NextResponse } from 'next/server'

interface ReportData {
  id: string
  clientId: string
  season: string
  confidence: number
  colors: string[]
  recommendations?: string[]
}

function generatePDFContent(data: ReportData): string {
  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 300
>>
stream
BT
/F1 16 Tf
50 750 Td
(AuraColor Analysis Report) Tj
0 -30 Td
/F1 12 Tf
(Season: ${ data.season }) Tj
0 -20 Td
(Confidence: ${ Math.round(data.confidence * 100) }%) Tj
0 -20 Td
(Colors: ${ data.colors.join(', ') }) Tj
0 -30 Td
(Generated: ${ new Date().toLocaleDateString() }) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
492
%%EOF`
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  
  try {
    const mockData: ReportData = {
      id: params.id,
      clientId: 'client_' + params.id,
      season: 'Deep Winter',
      confidence: 0.92,
      colors: ['#000080', '#8B0000', '#4B0082', '#006400'],
    }

    const pdfContent = generatePDFContent(mockData)
    
    return new NextResponse(pdfContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="color-analysis-${ params.id }.pdf"`,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  
  try {
    const { email } = await request.json()
    
    const mockData: ReportData = {
      id: params.id,
      clientId: 'client_' + params.id,
      season: 'Deep Winter',
      confidence: 0.92,
      colors: ['#000080', '#8B0000', '#4B0082', '#006400'],
    }

    const pdfContent = generatePDFContent(mockData)
    
    if (email) {
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Your AuraColor Analysis Report',
          html: `<h1>Your Color Analysis Report</h1><p>Please find your ${ mockData.season } color analysis report attached.</p>`,
          attachments: [{
            filename: `color-analysis-${ params.id }.pdf`,
            content: Buffer.from(pdfContent).toString('base64'),
          }],
        }),
      })
      
      if (emailResponse.ok) {
        return NextResponse.json({ success: true, message: 'Report sent via email' })
      }
    }
    
    return new NextResponse(pdfContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="color-analysis-${ params.id }.pdf"`,
      },
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
      doc.fontSize(16).fillColor('#374151').text(`Customer: ${ customer.name }`)
      doc.fontSize(12).fillColor('#6B7280').text(`Email: ${ customer.email }`)
      doc.moveDown()
    }

    // Analysis Results
    const analysis = report.ai_analysis || { }
    doc.fontSize(20).fillColor('#1F2937').text('Your Color Season')
    doc.fontSize(16).fillColor('#7C3AED').text(analysis.season || 'Not determined', { indent: 20 })
    doc.moveDown()

    doc.fontSize(14).fillColor('#374151').text(`Confidence Score: ${ report.confidence_score || 0 }%`)
    doc.moveDown()

    // Color Palette
    if (report.color_recommendations?.length > 0) {
      doc.fontSize(16).fillColor('#1F2937').text('Recommended Colors:')
      report.color_recommendations.forEach((color: string) => {
        doc.fontSize(12).fillColor('#6B7280').text(`• ${ color }`, { indent: 20 })
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
      .text(`Generated on ${ new Date().toLocaleDateString() }`, 50, doc.page.height - 50)
      .text('AuraColor Professional Color Analysis', { align: 'right' })

    doc.end()
  })
}