import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function generateVoucherCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 16; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { amount, recipientEmail, purchaserEmail, message } = data
    
    if (!amount || !recipientEmail || !purchaserEmail) {
      return NextResponse.json(
        { error: 'Amount, recipient email, and purchaser email are required' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const voucherCode = generateVoucherCode()
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)

    const { data: voucher, error } = await supabase
      .from('vouchers')
      .insert({
        code: voucherCode,
        initial_value: amount * 100,
        balance: amount * 100,
        owner_email: recipientEmail,
        purchaser_email: purchaserEmail,
        message: message || '',
        expiry_date: expiryDate.toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      voucherCode,
      amount,
      expiryDate: expiryDate.toISOString()
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    
    if (!code) {
      return NextResponse.json(
        { error: 'Voucher code is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const { data: voucher, error } = await supabase
      .from('vouchers')
      .select('*')
      .eq('code', code)
      .single()

    if (error || !voucher) {
      return NextResponse.json(
        { error: 'Voucher not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      code: voucher.code,
      balance: voucher.balance / 100,
      status: voucher.status,
      expiryDate: voucher.expiry_date
    })

  } catch (error) {
    console.error('Voucher lookup error:', error)
    return NextResponse.json(
      { error: 'Failed to lookup voucher' },
      { status: 500 }
    )
  }
}