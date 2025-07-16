export default function SeasonResults() {
  const seasons = [
    {
      name: 'Spring',
      description: 'Warm, bright, and clear colors',
      characteristics: ['Warm undertones', 'Bright and clear', 'Light to medium depth'],
      colors: ['#FF6B6B', '#FFD93D', '#6BCF7F', '#4ECDC4']
    },
    {
      name: 'Summer',
      description: 'Cool, soft, and muted colors',
      characteristics: ['Cool undertones', 'Soft and muted', 'Light to medium depth'],
      colors: ['#B19CD9', '#87CEEB', '#FFB6C1', '#98FB98']
    },
    {
      name: 'Autumn',
      description: 'Warm, rich, and earthy colors',
      characteristics: ['Warm undertones', 'Rich and deep', 'Medium to dark depth'],
      colors: ['#CD853F', '#D2691E', '#8B4513', '#A0522D']
    },
    {
      name: 'Winter',
      description: 'Cool, clear, and dramatic colors',
      characteristics: ['Cool undertones', 'Clear and bright', 'High contrast'],
      colors: ['#000080', '#DC143C', '#800080', '#008B8B']
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Your Season: Spring</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {seasons.map((season) => (
            <div
              key={season.name}
              className={`p-6 rounded-lg border-2 ${
                season.name === 'Spring' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-600'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{season.name}</h3>
              <p className="text-gray-300 mb-4">{season.description}</p>
              
              <div className="flex gap-2 mb-4">
                {season.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <ul className="text-sm text-gray-400">
                {season.characteristics.map((char, index) => (
                  <li key={index}>• {char}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}