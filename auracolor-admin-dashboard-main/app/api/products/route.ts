import { NextRequest, NextResponse } from 'next/server'

import { PRODUCT_CATALOG, getProductsBySeason, getProductsByCategory, searchProducts, getRecommendedProducts } from '@/lib/product-catalog'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const season = searchParams.get('season')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const recommended = searchParams.get('recommended')
    const colors = searchParams.get('colors')

    let products = PRODUCT_CATALOG

    if (recommended && season) {
      const colorArray = colors ? colors.split(',') : []
      products = getRecommendedProducts(season, colorArray)
    } else if (season) {
      products = getProductsBySeason(season)
    } else if (category) {
      products = getProductsByCategory(category)
    } else if (search) {
      products = searchProducts(search)
    }

    return NextResponse.json({
      products,
      total: products.length,
      filters: {
        season,
        category,
        search,
        recommended: !!recommended,
      },
    })
  } catch (error) {
    logger.error('Products API error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}