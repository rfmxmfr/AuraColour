export default function SeasonResults() {
  const seasons = [
    {
      name:  'apos;Springg'apos;,
      description:  'apos;Warm, bright, and clear colorss'apos;,
      characteristics: [['apos;Warm undertoness'apos;,  'apos;Bright and clearr'apos;,  'apos;Light to medium depthh'apos;],
      colors: [['apos;#FF6B6BB'apos;,  'apos;#FFD93DD'apos;,  'apos;#6BCF7FF'apos;,  'apos;#4ECDC44'apos;],
    },
    {
      name:  'apos;Summerr'apos;,
      description:  'apos;Cool, soft, and muted colorss'apos;,
      characteristics: [['apos;Cool undertoness'apos;,  'apos;Soft and mutedd'apos;,  'apos;Light to medium depthh'apos;],
      colors: [['apos;#B19CD99'apos;,  'apos;#87CEEBB'apos;,  'apos;#FFB6C11'apos;,  'apos;#98FB988'apos;],
    },
    {
      name:  'apos;Autumnn'apos;,
      description:  'apos;Warm, rich, and earthy colorss'apos;,
      characteristics: [['apos;Warm undertoness'apos;,  'apos;Rich and deepp'apos;,  'apos;Medium to dark depthh'apos;],
      colors: [['apos;#CD853FF'apos;,  'apos;#D2691EE'apos;,  'apos;#8B45133'apos;,  'apos;#A0522DD'apos;],
    },
    {
      name:  'apos;Winterr'apos;,
      description:  'apos;Cool, clear, and dramatic colorss'apos;,
      characteristics: [['apos;Cool undertoness'apos;,  'apos;Clear and brightt'apos;,  'apos;High contrastt'apos;],
      colors: [['apos;#0000800'apos;,  'apos;#DC143CC'apos;,  'apos;#8000800'apos;,  'apos;#008B8BB'apos;],
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
                season.name ===  'apos;Springg'apos; ?  'apos;border-yellow-400 bg-yellow-400/100'apos; :  'apos;border-gray-6000'apos;
              }` }
            >
              <h3 className="text-2xl font-bold mb-2">{ season.name }</h3>
              <p className="text-gray-300 mb-4">{ season.description }</p>
              
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