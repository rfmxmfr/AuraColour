export interface ServiceConfig {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  endpoint: string
  questionnaire_fields: string[]
}

export const SERVICES: ServiceConfig[] = [
  {
    id: 'virtual_wardrobe',
    name: 'Virtual Wardrobe Curation',
    price: 100,
    description: 'A service to help clients organize, optimize, and plan their existing wardrobe virtually.',
    features: ['Wardrobe audit', 'Outfit combinations', 'Gap analysis', 'Shopping list'],
    endpoint: '/api/virtual-wardrobe',
    questionnaire_fields: ['wardrobe_size', 'style_goals', 'budget', 'current_challenges'],
  },
  {
    id: 'personal_shopping',
    name: 'Personal Shopping Service',
    price: 150,
    description: 'A service providing guided shopping assistance to help clients acquire new clothing and accessories.',
    features: ['Personal shopping session', 'Curated selections', 'Fitting assistance', 'Style coaching'],
    endpoint: '/api/personal-shopping',
    questionnaire_fields: ['budget', 'shopping_goals', 'preferred_brands', 'size_info', 'style_preferences'],
  },
  {
    id: 'style_coaching',
    name: 'Style Evolution Coaching',
    price: 300,
    description: 'A comprehensive style transformation program with ongoing support.',
    features: ['Complete style makeover', '3-month support', 'Personal styling sessions', 'Confidence coaching'],
    endpoint: '/api/style-coaching',
    questionnaire_fields: ['current_style_challenges', 'style_goals', 'lifestyle', 'confidence_level'],
  },
  {
    id: 'gift_vouchers',
    name: 'Gift Vouchers',
    price: 75,
    description: 'Give the gift of confidence and style with our flexible gift vouchers.',
    features: ['Flexible redemption', '12-month validity', 'Personal message', 'Digital delivery'],
    endpoint: '/api/gift-vouchers',
    questionnaire_fields: ['recipient_name', 'recipient_email', 'personal_message', 'amount'],
  },
]

export function getServiceById(id: string): ServiceConfig | undefined {
  return SERVICES.find(service => service.id === id)
}

export function getServicePrice(id: string): number {
  const service = getServiceById(id)
  return service?.price || 0
}