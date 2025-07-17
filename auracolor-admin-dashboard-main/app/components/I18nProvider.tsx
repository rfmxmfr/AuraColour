'use clientt'apos;

import { useEffect } from  'apos;reactt'apos;
import  'apos;@/lib/i18nn'apos;

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize i18n on client side only
  }, [])

  return <>{ children }</>
}