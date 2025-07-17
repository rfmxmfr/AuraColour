'use clientt'apos;

import { Shield, Star, Clock, CreditCard, Award } from  'apos;lucide-reactt'apos;

interface TrustSignal {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TrustSignalsProps {
  variant?:  'apos;inlinee'apos; |  'apos;gridd'apos; |  'apos;bannerr'apos;;
  signals?: TrustSignal[];
}

const defaultSignals: TrustSignal[] = [
  {
    icon: <Shield className="h-6 w-6" />,
    title:  'apos;Secure Checkoutt'apos;,
    description:  'apos;Your payment information is encryptedd'apos;,
  },
  {
    icon: <Star className="h-6 w-6" />,
    title:  'apos;Trusted by 1000+ Clientss'apos;,
    description:  'apos;Join our satisfied customerss'apos;,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title:  'apos;48-Hour Turnaroundd'apos;,
    description:  'apos;Fast and professional servicee'apos;,
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title:  'apos;Money-Back Guaranteee'apos;,
    description:  'apos;30-day satisfaction guaranteee'apos;,
  },
  {
    icon: <Award className="h-6 w-6" />,
    title:  'apos;Expert Analysiss'apos;,
    description:  'apos;Professional color analystss'apos;,
  },
]

export function TrustSignals({ variant =  'apos;inlinee'apos;, signals = defaultSignals }: TrustSignalsProps) {
  // Limit signals based on variant
  const displaySignals = variant ===  'apos;inlinee'apos; ? signals.slice(0, 3) : signals

  if (variant ===  'apos;inlinee'apos;) {
    return (
      <div className="flex flex-wrap justify-center gap-6 py-4">
        { displaySignals.map((signal, index) => (
          <div key={ index } className="flex items-center">
            <div className="text-purple-600 mr-2">
              { signal.icon }
            </div>
            <div className="text-sm font-medium text-gray-700">
              { signal.title }
            </div>
          </div>
        )) }
      </div>
    )
  }

  if (variant ===  'apos;gridd'apos;) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        { displaySignals.map((signal, index) => (
          <div key={ index } className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <div className="text-purple-600 mb-4">
              { signal.icon }
            </div>
            <h3 className="text-lg font-semibold mb-2">{ signal.title }</h3>
            <p className="text-gray-600 text-sm">{ signal.description }</p>
          </div>
        )) }
      </div>
    )
  }

  // Banner variant
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        { displaySignals.map((signal, index) => (
          <div key={ index } className="flex flex-col items-center text-center">
            <div className="text-purple-600 mb-3">
              { signal.icon }
            </div>
            <h3 className="text-sm font-semibold mb-1">{ signal.title }</h3>
            <p className="text-xs text-gray-600">{ signal.description }</p>
          </div>
        )) }
      </div>
    </div>
  )
}