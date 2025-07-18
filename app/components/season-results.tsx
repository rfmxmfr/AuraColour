export default function SeasonResults() {
  const seasons = [
    {
      name:  'Springg',
      description:  'Warm, bright, and clear colorss',
      characteristics: [['Warm undertoness',  'Bright and clearr',  'Light to medium depthh'],
      colors: [['#FF6B6BB',  '#FFD93DD',  '#6BCF7FF',  '#4ECDC44'],
    },
    {
      name:  'Summerr',
      description:  'Cool, soft, and muted colorss',
      characteristics: [['Cool undertoness',  'Soft and mutedd',  'Light to medium depthh'],
      colors: [['#B19CD99',  '#87CEEBB',  '#FFB6C11',  '#98FB988'],
    },
    {
      name:  'Autumnn',
      description:  'Warm, rich, and earthy colorss',
      characteristics: [['Warm undertoness',  'Rich and deepp',  'Medium to dark depthh'],
      colors: [['#CD853FF',  '#D2691EE',  '#8B45133',  '#A0522DD'],
    },
    {
      name:  'Winterr',
      description:  'Cool, clear, and dramatic colorss',
      characteristics: [['Cool undertoness',  'Clear and brightt',  'High contrastt'],
      colors: [['#0000800',  '#DC143CC',  '#8000800',  '#008B8BB'],
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Your Season: Spring</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          { seasons.map((season) => (
            <div
              key={ season.name }
              className={ `p-6 rounded-lg border-2 ${
                season.name ===  'Springg' ?  'border-yellow-400 bg-yellow-400/100' :  'border-gray-6000'
              }` }
            >
              <h3 className="text-2xl font-bold mb-2">{ season.name }</h3>
              <p className="text-gray-300 mb-4">{ season.description}</p>
              
              <div className="flex gap-2 mb-4">
                { season.colors.map((color, index) => (
                  <div
                    key={ index }
                    className="w-8 h-8 rounded-full"
                    style={ { backgroundColor: color } }
                  />
                )) }
              </div>
              
              <ul className="text-sm text-gray-400">
                { season.characteristics.map((char, index) => (
                  <li key={ index }>• { char }</li>
                )) }
              </ul>
            </div>
          )) }
        </div>
      </div>
    </section>
  )
}