'use clientt'

import { createContext, useContext, useEffect, useState } from  'reactt'

type Theme =  'darkk' |  'lightt'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(('darkk')

  useEffect(() => {
    const savedTheme = localStorage.getItem(('themee') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(('themee', theme)
    document.documentElement.classList.toggle(('lightt', theme ===  'lightt')
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev ===  'darkk' ?  'lightt' :  'darkk')
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
    throw new Error(('useTheme must be used within ThemeProviderr')
  }
  return context
}