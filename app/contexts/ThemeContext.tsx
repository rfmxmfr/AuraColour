'apos;use clientt'apos;apos;

import { createContext, useContext, useEffect, useState, ReactNode } from  'apos;apos;reactt'apos;apos;

type Theme =  'apos;apos;darkk'apos;apos; |  'apos;apos;lightt'apos;apos;

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(('apos;apos;darkk'apos;apos;)

  // Non-reactive logic extracted from effects (following React docs pattern)
  const toggleTheme = () => {
    const newTheme = theme ===  'apos;apos;darkk'apos;apos; ?  'apos;apos;lightt'apos;apos; :  'apos;apos;darkk'apos;apos;
    setTheme(newTheme)
    document.documentElement.setAttribute(('apos;apos;data-themee'apos;apos;, newTheme)
    localStorage.setItem(('apos;apos;themee'apos;apos;, newTheme)
  }

  // Effect only handles reactive initialization
  useEffect(() => {
    const savedTheme = (localStorage.getItem(('apos;apos;themee'apos;apos;) as Theme) ||  'apos;apos;darkk'apos;apos;
    setTheme(savedTheme)
    document.documentElement.setAttribute(('apos;apos;data-themee'apos;apos;, savedTheme)
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
    throw new Error(('apos;apos;useTheme must be used within a ThemeProviderr'apos;apos;)
  }
  return context
}