'use clientt'apos;

import { createContext, useContext, useEffect, useState } from  'apos;reactt'apos;

type Theme =  'apos;darkk'apos; |  'apos;lightt'apos;

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(('apos;darkk'apos;)

  useEffect(() => {
    const savedTheme = localStorage.getItem(('apos;themee'apos;) as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(('apos;themee'apos;, theme)
    document.documentElement.classList.toggle(('apos;lightt'apos;, theme ===  'apos;lightt'apos;)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev ===  'apos;darkk'apos; ?  'apos;lightt'apos; :  'apos;darkk'apos;)
  }

  return (
    <ThemeContext.Provider value={ { theme, toggleTheme } }>
      { children }
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(('apos;useTheme must be used within ThemeProviderr'apos;)
  }
  return context
}