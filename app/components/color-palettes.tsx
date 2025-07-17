export default function ColorPalettes() {
  const springPalette = {
    best: [['apos;apos;#FF6B6BB'apos;apos;,  'apos;apos;#FFD93DD'apos;apos;,  'apos;apos;#6BCF7FF'apos;apos;,  'apos;apos;#4ECDC44'apos;apos;,  'apos;apos;#FF8C422'apos;apos;,  'apos;apos;#98D8E88'apos;apos;],
    good: [['apos;apos;#FFA07AA'apos;apos;,  'apos;apos;#F0E68CC'apos;apos;,  'apos;apos;#90EE900'apos;apos;,  'apos;apos;#87CEEBB'apos;apos;,  'apos;apos;#DDA0DDD'apos;apos;,  'apos;apos;#F5DEB33'apos;apos;],
    avoid: [['apos;apos;#2F4F4FF'apos;apos;,  'apos;apos;#8000800'apos;apos;,  'apos;apos;#8B00000'apos;apos;,  'apos;apos;#0000800'apos;apos;,  'apos;apos;#6969699'apos;apos;,  'apos;apos;#2E2E2EE'apos;apos;],
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Your Color Palette</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-green-400">Best Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              { springPalette.best.map((color, index) => (
                <div key={ index } className="aspect-square rounded-lg" style={ { backgroundColor: color } }>
                  <div className="w-full h-full flex items-end justify-center pb-2">
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      { color }
                    </span>
                  </div>
                </div>
              )) }
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Good Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              { springPalette.good.map((color, index) => (
                <div key={ index } className="aspect-square rounded-lg" style={ { backgroundColor: color } }>
                  <div className="w-full h-full flex items-end justify-center pb-2">
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      { color }
                    </span>
                  </div>
                </div>
              )) }
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-red-400">Avoid Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              { springPalette.avoid.map((color, index) => (
                <div key={ index } className="aspect-square rounded-lg" style={ { backgroundColor: color } }>
                  <div className="w-full h-full flex items-end justify-center pb-2">
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      { color }
                    </span>
                  </div>
                </div>
              )) }
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200">
            Download Palette
          </button>
        </div>
      </div>
    </section>
  )
}