import { NextRequest } from 'next/server';
import { createApiHandler } from '@/lib/api/handler';

// Example service data
const services = [
  {
    id: '1',
    name: '12-Season Color Analysis',
    price: 75,
    description: 'Personal color season identification with comprehensive palette'
  },
  {
    id: '2',
    name: 'Virtual Wardrobe Curation',
    price: 100,
    description: 'Wardrobe audit and outfit combinations'
  },
  {
    id: '3',
    name: 'Personal Shopping Service',
    price: 150,
    description: 'Guided shopping assistance'
  },
  {
    id: '4',
    name: 'Style Evolution Coaching',
    price: 300,
    description: 'Complete style transformation program'
  },
  {
    id: '5',
    name: 'Gift Vouchers',
    price: 75,
    description: 'Flexible gift options'
  }
];

// GET handler for services
export const GET = createApiHandler(async (req: NextRequest) => {
  // Get query parameters
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  
  // Return specific service or all services
  if (id) {
    const service = services.find(s => s.id === id);
    if (!service) {
      throw { message: 'Service not found', status: 404, code: 'NOT_FOUND' };
    }
    return service;
  }
  
  return services;
});