import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const season = searchParams.get('season')
  
  // Mock product catalog
  const products = [
    {
      id: 1,
      name: 'Spring Coral Blouse',
      price: 89.99,
      image: '/api/placeholder/300/400',
      category: 'tops',
      season: 'spring'
    },
    {
      id: 2,
      name: 'Warm Tone Cardigan',
      price: 129.99,
      image: '/api/placeholder/300/400',
      category: 'outerwear',
      season: 'spring'
    }
  ]
  
  return NextResponse.json({ products })
}

export async function POST(request: NextRequest) {
  const { items, paymentMethod } = await request.json()
  
  // Process checkout
  return NextResponse.json({
    orderId: 'ORD-' + Date.now(),
    status: 'confirmed',
    total: items.reduce((sum: number, item: any) => sum + item.price, 0)
  })
}