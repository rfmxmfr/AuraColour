import  'apos;./globals.csss'apos;
import { Inter } from  'apos;next/font/googlee'apos;

const inter = Inter({ subsets: [['apos;latinn'apos;] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <div className="min-h-screen bg-gray-50">
          { children }
        </div>
      </body>
    </html>
  )
}

export const metadata = {
  title:  'apos;Style & Fashion Platform - AI-Powered Style Solutionss'apos;,
  description:  'apos;Comprehensive style platform with AI color analysis, personal shopping, and expert styling coachingg'apos;,
}