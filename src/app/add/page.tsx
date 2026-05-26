'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { FeedbackCategory } from '@/types/feedback'

const categoryOptions: { value: FeedbackCategory; label: string }[] = [
  { value: 'bug', label: '🔴 Bug' },
  { value: 'feature_request', label: '🟢 功能需求' },
  { value: 'question', label: '🟡 问题' },
  { value: 'gameplay', label: '🔵 玩法' },
  { value: 'ux', label: '🟣 体验' },
]

export default function AddFeedback() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    author: '',
    content: '',
    category: 'question' as FeedbackCategory,
    reactions: 0,
    replies: 0,
    hoursAgo: 1,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'reactions' || name === 'replies' || name === 'hoursAgo'
          ? Number(value)
          : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app this would persist; for now show success state
    setSubmitted(true)
    setTimeout(() => router.push('/'), 1500)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">✅</p>
            <p className="text-[#f0f0f0] text-lg font-medium">反馈已添加</p>
            <p className="text-[#888888] text-sm mt-1">正在返回主页…</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#f0f0f0]">添加 Discord 反馈</h1>
            <p className="text-[#888888] text-sm mt-1">手动录入来自 Discord 社区的玩家反馈</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                标题 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="反馈标题（来自 Discord 消息主题）"
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                Discord 用户名 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="author"
                required
                value={form.author}
                onChange={handleChange}
                placeholder="e.g. Caveman Diaz"
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                内容摘要 <span className="text-red-400">*</span>
              </label>
              <textarea
                name="content"
                required
                rows={4}
                value={form.content}
                onChange={handleChange}
                placeholder="简述反馈内容…"
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">分类</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] transition-colors"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Numeric fields */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  👍 Reactions
                </label>
                <input
                  type="number"
                  name="reactions"
                  min={0}
                  value={form.reactions}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  💬 Replies
                </label>
                <input
                  type="number"
                  name="replies"
                  min={0}
                  value={form.replies}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  ⏱ 多少小时前
                </label>
                <input
                  type="number"
                  name="hoursAgo"
                  min={0}
                  value={form.hoursAgo}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] transition-colors"
                />
              </div>
            </div>

            {/* isHot hint */}
            <p className="text-[#444444] text-xs -mt-2">
              * Reactions &gt; 5 或 Replies &gt; 3 时自动标记为 🔥 HOT
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                ➕ 添加反馈
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-4 py-2 rounded-lg border border-[#1f1f1f] text-[#888888] hover:text-[#f0f0f0] hover:border-[#2d2d2d] text-sm transition-colors"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
