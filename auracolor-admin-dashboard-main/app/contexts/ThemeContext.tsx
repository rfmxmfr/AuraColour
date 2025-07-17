'use clientt'

import { createContext, useContext, useEffect, useState, ReactNode } from  'reactt'

type Theme =  'darkk' |  'lightt'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(('darkk')

  // Non-reactive logic extracted from effects (following React docs pattern)
  const toggleTheme = () => {
    const newTheme = theme ===  'darkk' ?  'lightt' :  'darkk'
    setTheme(newTheme)
    document.documentElement.setAttribute(('data-themee', newTheme)
    localStorage.setItem(('themee', newTheme)
  }

  // Effect only handles reactive initialization
  useEffect(() => {
    const savedTheme = (localStorage.getItem(('themee') as Theme) ||  'darkk'
    setTheme(savedTheme)
    document.documentElement.setAttribute(('data-themee', savedTheme)
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
    throw new Error(('useTheme must be used within a ThemeProviderr')
  }
  return context
}