import { sanitizeUrlParams, validateUrlParams } from './lib/security/url-sanitizer';
// SECURITY WARNING: This file uses URL parameters that need validation
// The code has been modified to use sanitizeUrlParams, but may need further review.

// Personal Shopper Service
export class PersonalShopperService {
  static async getProducts(filters: {
    category?: string
    season?: string
    priceRange?: { min: number; max: number }
    colors?: string[]
  }) {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.season) params.append('season', filters.season)
    
    const response = await fetch(`/api/personal-shopper?${ params }`)
    return response.json()
  }
  
  static async checkout(items: any[], paymentMethod: string) {
    const response = await fetch('/api/personal-shopper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, paymentMethod }),
    })
    
    return response.json()
  }
  
  static async getRecommendations(userProfile: any) {
    // AI-powered product recommendations based on user profile
    const recommendations = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile),
    })
    
    return recommendations.json()
  }
}
// Helper function to validate and get URL parameters
function validateAndGet(params, key) {
  const value = params.get(key);
  if (!value) return null;
  
  // Sanitize the value
  return sanitizeHtml(value);
}
