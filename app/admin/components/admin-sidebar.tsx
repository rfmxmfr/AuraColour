'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/users', label: 'Users' },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded transition-colors ${
              pathname === link.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}