import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { voucher_code, service_id, customer_email } = await request.json()
    
    const supabase = await createClient()
    
    const { data: voucher, error } = await supabase
      .from('gift_vouchers')
      .select('*')
      .eq('voucher_code', voucher_code)
      .eq('status', 'active')
      .single()
    
    if (error || !voucher) {
      return NextResponse.json({ error: 'Invalid or expired voucher' }, { status: 400 })
    }
    
    if (new Date(voucher.expiry_date) < new Date()) {
      return NextResponse.json({ error: 'Voucher has expired' }, { status: 400 })
    }
    
    if (!voucher.services_eligible.includes(service_id)) {
      return NextResponse.json({ error: 'Voucher not valid for this service' }, { status: 400 })
    }
    
    await supabase
      .from('gift_vouchers')
      .update({ 
        status: 'redeemed',
        redeemed_at: new Date().toISOString(),
        redeemed_by: customer_email,
        service_used: service_id
      })
      .eq('voucher_code', voucher_code)
    
    return NextResponse.json({
      success: true,
      discount_amount: voucher.amount,
      message: 'Voucher redeemed successfully'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Redemption failed' }, { status: 500 })
  }
}