import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import I18nProvider from "./components/I18nProvider"
import { Toaster } from "sonner"
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
          <SpeedInsights />
        </I18nProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
