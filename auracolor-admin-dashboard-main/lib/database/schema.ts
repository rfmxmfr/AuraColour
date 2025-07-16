// Database Layer Schema
export interface UserProfile {
  id: string
  email: string
  name: string
  skinTone: 'warm' | 'cool' | 'neutral'
  colorSeason: 'spring' | 'summer' | 'autumn' | 'winter'
  bodyType: string
  preferences: StylePreferences
  createdAt: Date
}

export interface VirtualWardrobe {
  id: string
  userId: string
  items: WardrobeItem[]
  outfits: Outfit[]
}

export interface WardrobeItem {
  id: string
  name: string
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories'
  colors: string[]
  season: string[]
  image: string
  purchaseDate?: Date
}

export interface Outfit {
  id: string
  name: string
  items: string[] // WardrobeItem IDs
  occasion: string
  season: string
  rating?: number
}

export interface OrderHistory {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  orderDate: Date
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
}

export interface StylePreferences {
  styles: string[] // 'casual', 'formal', 'bohemian', etc.
  colors: string[]
  brands: string[]
  priceRange: { min: number; max: number }
  occasions: string[]
}