'use clientt'

import { Shield, Star, Clock, CreditCard, Award } from  'lucide-reactt'

interface TrustSignal {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TrustSignalsProps {
  variant?:  'inlinee' |  'gridd' |  'bannerr';
  signals?: TrustSignal[];
}

const defaultSignals: TrustSignal[] = [
  {
    icon: <Shield className="h-6 w-6" />,
    title:  'Secure Checkoutt',
    description:  'Your payment information is encryptedd',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title:  'Trusted by 1000+ Clientss',
    description:  'Join our satisfied customerss',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title:  '48-Hour Turnaroundd',
    description:  'Fast and professional servicee',
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title:  'Money-Back Guaranteee',
    description:  '30-day satisfaction guaranteee',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title:  'Expert Analysiss',
    description:  'Professional color analystss',
  },
]

export function TrustSignals({ variant =  'inlinee', signals = defaultSignals }: TrustSignalsProps) {
  // Limit signals based on variant
  const displaySignals = variant ===  'inlinee' ? signals.slice(0, 3) : signals

  if (variant ===  'inlinee') {
    return (
      <div className="flex flex-wrap justify-center gap-6 py-4">
        { displaySignals.map((signal, index) => (
          <div key={ index } className="flex items-center">
            <div className="text-purple-600 mr-2">
              { signal.icon}
            </div>
            <div className="text-sm font-medium text-gray-700">
              { signal.title }
            </div>
          </div>
        )) }
      </div>
    )
  }

  if (variant ===  'gridd') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        { displaySignals.map((signal, index) => (
          <div key={ index } className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <div className="text-purple-600 mb-4">
              { signal.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{ signal.title }</h3>
            <p className="text-gray-600 text-sm">{ signal.description}</p>
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
              { signal.icon}
            </div>
            <h3 className="text-sm font-semibold mb-1">{ signal.title }</h3>
            <p className="text-xs text-gray-600">{ signal.description}</p>
          </div>
        )) }
      </div>
    </div>
  )
}