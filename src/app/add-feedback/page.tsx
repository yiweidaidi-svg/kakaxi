'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { FeedbackCategory, Feedback } from '@/types/feedback'

const categoryOptions: { value: FeedbackCategory; label: string; desc: string }[] = [
  { value: 'bug',             label: '🔴 Bug（程序故障）',  desc: '功能无法正常使用、崩溃、报错等' },
  { value: 'feature_request', label: '🟢 功能建议',         desc: '用户希望新增某个功能' },
  { value: 'question',        label: '🟡 问题咨询',         desc: '用户不理解某个功能或机制' },
  { value: 'gameplay',        label: '🔵 游戏玩法',         desc: '任务、剧情、道具、角色等玩法相关' },
  { value: 'ux',              label: '🟣 界面体验',         desc: '操作不方便、功能入口找不到等' },
]

export default function AddFeedback() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    titleZh: '',
    author: '',
    content: '',
    contentZh: '',
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
    const item: Feedback = {
      id: crypto.randomUUID(),
      ...form,
      isHot: form.reactions > 5 || form.replies > 3,
      createdAt: Date.now(),
    }
    const existing: Feedback[] = JSON.parse(localStorage.getItem('feedbacks') ?? '[]')
    localStorage.setItem('feedbacks', JSON.stringify([item, ...existing]))
    setSubmitted(true)
    setTimeout(() => router.push('/'), 1500)
  }

  const inputClass =
    'w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors'

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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#f0f0f0]">添加 Discord 反馈</h1>
            <p className="text-[#888888] text-sm mt-1">手动录入来自 Discord 社区的玩家反馈，英文和中文都要填</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* 帖子标题（英文原文） */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                标题（英文原文）<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="直接复制 Discord 帖子标题，例如：Music creation keeps failing"
                className={inputClass}
              />
            </div>

            {/* 帖子标题（中文翻译） */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                标题（中文翻译）<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="titleZh"
                required
                value={form.titleZh}
                onChange={handleChange}
                placeholder="翻译成中文，例如：音乐创作功能一直报错"
                className={inputClass}
              />
            </div>

            {/* Discord 用户名 */}
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
                placeholder="发帖人的 Discord 用户名，例如：Caveman Diaz"
                className={inputClass}
              />
            </div>

            {/* 内容摘要（英文原文） */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                内容摘要（英文原文）<span className="text-red-400">*</span>
              </label>
              <textarea
                name="content"
                required
                rows={3}
                value={form.content}
                onChange={handleChange}
                placeholder="简短概括帖子内容（英文），可以不是全文"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* 内容摘要（中文翻译） */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                内容摘要（中文翻译）<span className="text-red-400">*</span>
              </label>
              <textarea
                name="contentZh"
                required
                rows={3}
                value={form.contentZh}
                onChange={handleChange}
                placeholder="翻译成中文"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* 分类 */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">
                分类 <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} title={opt.desc}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[#444444] text-xs mt-1">
                {categoryOptions.find((o) => o.value === form.category)?.desc}
              </p>
            </div>

            {/* 热度数据 */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  表情反应数
                </label>
                <input
                  type="number"
                  name="reactions"
                  min={0}
                  value={form.reactions}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  回复数
                </label>
                <input
                  type="number"
                  name="replies"
                  min={0}
                  value={form.replies}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  几小时前发帖
                </label>
                <input
                  type="number"
                  name="hoursAgo"
                  min={0}
                  value={form.hoursAgo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
            {(form.reactions > 5 || form.replies > 3) && (
              <p className="text-xs text-amber-400">🔥 热度较高，将自动标记为热门</p>
            )}

            <button
              type="submit"
              className="mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 px-4 py-2.5 text-sm font-medium text-white transition-colors"
            >
              提交反馈
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
