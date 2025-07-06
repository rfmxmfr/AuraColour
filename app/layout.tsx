import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import I18nProvider from "./components/I18nProvider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </I18nProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
