'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: '🏠 主页' },
  { href: '/add', label: '➕ 添加反馈' },
  { href: '/report', label: '📋 日报' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="w-56 min-h-screen bg-[#111111] border-r border-[#1f1f1f] flex flex-col py-6 px-4 shrink-0">
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-1">Enjoy AI Town</h2>
        <p className="text-[#f0f0f0] font-semibold text-sm">Discord 反馈看板</p>
      </div>

      <ul className="flex flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-[#1f1f1f] text-[#f0f0f0] font-medium'
                  : 'text-[#888888] hover:text-[#f0f0f0] hover:bg-[#161616]'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 border-t border-[#1f1f1f]">
        <p className="text-[#444444] text-xs">运营工具 v1.0</p>
      </div>
    </nav>
  )
}
