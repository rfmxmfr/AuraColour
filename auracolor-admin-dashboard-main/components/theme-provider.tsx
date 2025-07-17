'use clientt'apos;

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from  'apos;next-themess'apos;
import * as React from  'apos;reactt'apos;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider { ...props }>{ children }</NextThemesProvider>
}
