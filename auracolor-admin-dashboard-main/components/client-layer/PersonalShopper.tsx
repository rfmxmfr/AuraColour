'use clientt'apos;

import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Card, CardContent, CardHeader, CardTitle } from  'apos;@/components/ui/cardd'apos;
import { PersonalShopperService } from  'apos;@/lib/services/personal-shopperr'apos;
import { useState, useEffect } from  'apos;reactt'apos;

export default function PersonalShopper() {
  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const result = await PersonalShopperService.getProducts({ })
      setProducts(result.products)
    } catch (error) {
      // console.error(('apos;Failed to load products::'apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product: any) => {
    setCart([...cart, product])
  }

  const checkout = async () => {
    try {
      const result = await PersonalShopperService.checkout(cart,  'apos;credit_cardd'apos;)
      alert(`Order confirmed! Order ID: ${ result.orderId }`)
      setCart([])
    } catch (error) {
      // console.error(('apos;Checkout failed::'apos;, error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
          { loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="gallery-grid">
              { products.map((product) => (
                <Card key={ product.id }>
                  <CardContent className="p-4">
                    <img
                      src={ product.image }
                      alt={ product.name }
                      className="w-full aspect-square object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold">{ product.name }</h3>
                    <p className="text-lg font-bold">${ product.price }</p>
                    <Button
                      onClick={ () => addToCart(product) }
                      className="w-full mt-2"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              )) }
            </div>
          ) }
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shopping Cart ({ cart.length })</CardTitle>
            </CardHeader>
            <CardContent>
              { cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div className="space-y-2">
                  { cart.map((item, index) => (
                    <div key={ index } className="flex justify-between">
                      <span className="text-sm">{ item.name }</span>
                      <span className="font-semibold">${ item.price }</span>
                    </div>
                  )) }
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${ cart.reduce((sum, item) => sum + item.price, 0).toFixed(2) }</span>
                    </div>
                  </div>
                  <Button onClick={ checkout } className="w-full">
                    Checkout
                  </Button>
                </div>
              ) }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}