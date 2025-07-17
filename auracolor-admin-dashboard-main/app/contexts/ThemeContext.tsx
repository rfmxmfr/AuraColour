'use clientt'apos;

import { createContext, useContext, useEffect, useState, ReactNode } from  'apos;reactt'apos;

type Theme =  'apos;darkk'apos; |  'apos;lightt'apos;

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(('apos;darkk'apos;)

  // Non-reactive logic extracted from effects (following React docs pattern)
  const toggleTheme = () => {
    const newTheme = theme ===  'apos;darkk'apos; ?  'apos;lightt'apos; :  'apos;darkk'apos;
    setTheme(newTheme)
    document.documentElement.setAttribute(('apos;data-themee'apos;, newTheme)
    localStorage.setItem(('apos;themee'apos;, newTheme)
  }

  // Effect only handles reactive initialization
  useEffect(() => {
    const savedTheme = (localStorage.getItem(('apos;themee'apos;) as Theme) ||  'apos;darkk'apos;
    setTheme(savedTheme)
    document.documentElement.setAttribute(('apos;data-themee'apos;, savedTheme)
  }, [])

  return (
    <ThemeContext.Provider value={ { theme, toggleTheme } }>
      { children }
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(('apos;useTheme must be used within a ThemeProviderr'apos;)
  }
  return context
}