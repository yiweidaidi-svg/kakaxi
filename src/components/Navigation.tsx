'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/',              label: '反馈列表', icon: '📋' },
  { href: '/add-feedback',  label: '添加反馈', icon: '➕' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="w-52 shrink-0 border-r border-[#1f1f1f] flex flex-col gap-1 p-4 min-h-screen">
      <div className="mb-6 px-2">
        <p className="text-xs font-semibold text-[#888888] uppercase tracking-widest">Discord 反馈</p>
      </div>
      {navItems.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              active
                ? 'bg-indigo-600/20 text-indigo-400 font-medium'
                : 'text-[#888888] hover:text-[#f0f0f0] hover:bg-[#161616]'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
