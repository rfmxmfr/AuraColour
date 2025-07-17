'apos;use clientt'apos;apos;

import { createContext, useContext, useEffect, useState } from  'apos;apos;reactt'apos;apos;

type Theme =  'apos;apos;darkk'apos;apos; |  'apos;apos;lightt'apos;apos;

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(('apos;apos;darkk'apos;apos;)

  useEffect(() => {
    const savedTheme = localStorage.getItem(('apos;apos;themee'apos;apos;) as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(('apos;apos;themee'apos;apos;, theme)
    document.documentElement.classList.toggle(('apos;apos;lightt'apos;apos;, theme ===  'apos;apos;lightt'apos;apos;)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev ===  'apos;apos;darkk'apos;apos; ?  'apos;apos;lightt'apos;apos; :  'apos;apos;darkk'apos;apos;)
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
    throw new Error(('apos;apos;useTheme must be used within ThemeProviderr'apos;apos;)
  }
  return context
}