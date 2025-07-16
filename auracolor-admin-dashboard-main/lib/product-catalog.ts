export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image_url: string
  category: string
  colors: string[]
  seasons: string[]
  description: string
  affiliate_url?: string
  in_stock: boolean
}

export const PRODUCT_CATALOG: Product[] = [
  // Spring Products
  {
    id: 'spring-blouse-1',
    name: 'Coral Silk Blouse',
    brand: 'Everlane',
    price: 89.00,
    image_url: '/api/placeholder/300/400',
    category: 'tops',
    colors: ['#FF6B6B', '#FF7F7F'],
    seasons: ['spring'],
    description: 'Elegant silk blouse in spring coral',
    in_stock: true
  },
  {
    id: 'spring-dress-1',
    name: 'Mint Green Wrap Dress',
    brand: 'Reformation',
    price: 128.00,
    image_url: '/api/placeholder/300/400',
    category: 'dresses',
    colors: ['#4ECDC4', '#96CEB4'],
    seasons: ['spring'],
    description: 'Flowy wrap dress in fresh mint',
    in_stock: true
  },
  // Summer Products
  {
    id: 'summer-top-1',
    name: 'Lavender Linen Top',
    brand: 'COS',
    price: 65.00,
    image_url: '/api/placeholder/300/400',
    category: 'tops',
    colors: ['#A29BFE', '#6C5CE7'],
    seasons: ['summer'],
    description: 'Soft linen top in summer lavender',
    in_stock: true
  },
  {
    id: 'summer-pants-1',
    name: 'Powder Blue Trousers',
    brand: 'Arket',
    price: 89.00,
    image_url: '/api/placeholder/300/400',
    category: 'bottoms',
    colors: ['#74B9FF', '#81ECEC'],
    seasons: ['summer'],
    description: 'Tailored trousers in soft blue',
    in_stock: true
  },
  // Autumn Products
  {
    id: 'autumn-sweater-1',
    name: 'Rust Orange Cashmere Sweater',
    brand: 'Uniqlo',
    price: 99.00,
    image_url: '/api/placeholder/300/400',
    category: 'sweaters',
    colors: ['#E17055', '#D63031'],
    seasons: ['autumn'],
    description: 'Luxurious cashmere in autumn rust',
    in_stock: true
  },
  {
    id: 'autumn-coat-1',
    name: 'Camel Wool Coat',
    brand: 'Massimo Dutti',
    price: 299.00,
    image_url: '/api/placeholder/300/400',
    category: 'outerwear',
    colors: ['#FDCB6E', '#F39C12'],
    seasons: ['autumn'],
    description: 'Classic wool coat in warm camel',
    in_stock: true
  },
  // Winter Products
  {
    id: 'winter-blazer-1',
    name: 'Navy Wool Blazer',
    brand: 'Theory',
    price: 395.00,
    image_url: '/api/placeholder/300/400',
    category: 'blazers',
    colors: ['#2D3436', '#0984E3'],
    seasons: ['winter'],
    description: 'Sharp tailored blazer in winter navy',
    in_stock: true
  },
  {
    id: 'winter-dress-1',
    name: 'Emerald Green Cocktail Dress',
    brand: 'Zara',
    price: 79.00,
    image_url: '/api/placeholder/300/400',
    category: 'dresses',
    colors: ['#00B894', '#E84393'],
    seasons: ['winter'],
    description: 'Elegant dress in jewel-tone emerald',
    in_stock: true
  }
]

export function getProductsBySeason(season: string): Product[] {
  return PRODUCT_CATALOG.filter(product => 
    product.seasons.includes(season.toLowerCase())
  )
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCT_CATALOG.filter(product => 
    product.category === category.toLowerCase()
  )
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return PRODUCT_CATALOG.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

export function getRecommendedProducts(season: string, colors: string[]): Product[] {
  return PRODUCT_CATALOG
    .filter(product => product.seasons.includes(season.toLowerCase()))
    .sort((a, b) => {
      // Prioritize products with matching colors
      const aColorMatch = a.colors.some(color => colors.includes(color))
      const bColorMatch = b.colors.some(color => colors.includes(color))
      
      if (aColorMatch && !bColorMatch) return -1
      if (!aColorMatch && bColorMatch) return 1
      return 0
    })
    .slice(0, 6)
}