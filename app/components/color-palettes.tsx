export default function ColorPalettes() {
  const springPalette = {
    best: ['#FF6B6B', '#FFD93D', '#6BCF7F', '#4ECDC4', '#FF8C42', '#98D8E8'],
    good: ['#FFA07A', '#F0E68C', '#90EE90', '#87CEEB', '#DDA0DD', '#F5DEB3'],
    avoid: ['#2F4F4F', '#800080', '#8B0000', '#000080', '#696969', '#2E2E2E']
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Your Color Palette</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-green-400">Best Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              {springPalette.best.map((color, index) => (
                <div key={index} className="aspect-square rounded-lg" style={{ backgroundColor: color }}>
                  <div className="w-full h-full flex items-end justify-center pb-2">
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      {color}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Good Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              {springPalette.good.map((color, index) => (
                <div key={index} className="aspect-square rounded-lg" style={{ backgroundColor: color }}>
                  <div className="w-full h-full flex items-end justify-center pb-2">
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      {color}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-red-400">Avoid Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              {springPalette.avoid.map((color, index) => (
                <div key={index} className="aspect-square rounded-lg" style={{ backgroundColor: color }}>
                  <div className="w-full h-full flex items-end justify-center pb-2">
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded">
                      {color}
                    </span>
                  </div>
                </div>
              ))}
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