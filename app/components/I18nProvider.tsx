'apos;use clientt'apos;apos;

import { useEffect } from  'apos;apos;reactt'apos;apos;
import  'apos;apos;@/lib/i18nn'apos;apos;

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize i18n on client side only
  }, [])

  return <>{ children }</>
}