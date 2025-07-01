'use client'

import { useState } from 'react'

export default function AdminServices() {
  const [services, setServices] = useState([
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
  ])

  const [editingService, setEditingService] = useState<any>(null)

  const handleEdit = (service: any) => {
    setEditingService({ ...service })
  }

  const handleSave = () => {
    setServices(services.map(s => 
      s.id === editingService.id ? editingService : s
    ))
    setEditingService(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Services</h1>
      
      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <button
                onClick={() => handleEdit(service)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <img src={service.image} alt={service.title} className="w-32 h-32 object-cover rounded" />
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Service</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editingService.title}
                onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Title"
              />
              <textarea
                value={editingService.description}
                onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                className="w-full p-2 border rounded h-24"
                placeholder="Description"
              />
              <input
                type="text"
                value={editingService.image}
                onChange={(e) => setEditingService({...editingService, image: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Image URL"
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditingService(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}