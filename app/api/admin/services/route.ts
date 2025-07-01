import { NextRequest, NextResponse } from 'next/server'

// Mock data - in real app this would come from database
let services = [
  {
    id: 1,
    title: "12-Season Color Analysis",
    description: "Unlock your natural radiance by identifying your unique color profile, so you can build a wardrobe you love and shop with confidence.",
    image: "https://i0.wp.com/www.lesbonsplansdemodange.com/wp-content/uploads/2020/04/cercle-chromatique.jpg?w=500&ssl=1"
  },
  {
    id: 2,
    title: "Virtual Wardrobe Curation",
    description: "Detox your closet. We help you organize what you own, identify gaps, and create dozens of new outfits without buying a thing.",
    image: "https://i.pinimg.com/736x/eb/4b/80/eb4b8075c2fb78868ba8e2b4b5a0f0d0.jpg"
  },
  {
    id: 3,
    title: "Personal Shopping Service",
    description: "Shop smarter, not harder. Get a curated list of items that perfectly match your color palette, style, and budget.",
    image: "http://www.charlotteloves.co.uk/wp-content/uploads/2017/03/corporate_styling.jpg"
  }
]

export async function GET() {
  return NextResponse.json({ services })
}

export async function PUT(request: NextRequest) {
  const updatedService = await request.json()
  
  services = services.map(service => 
    service.id === updatedService.id ? updatedService : service
  )
  
  return NextResponse.json({ success: true, service: updatedService })
}