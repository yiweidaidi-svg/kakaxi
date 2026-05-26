'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { FeedbackCategory } from '@/types/feedback'

// 分类选项：英文代码 → 中文显示标签
const categoryOptions: { value: FeedbackCategory; label: string; desc: string }[] = [
  { value: 'bug',             label: '🔴 Bug（程序故障）',     desc: '功能无法正常使用、崩溃、报错等' },
  { value: 'feature_request', label: '🟢 功能建议',            desc: '用户希望新增某个功能' },
  { value: 'question',        label: '🟡 问题咨询',            desc: '用户不理解某个功能或机制' },
  { value: 'gameplay',        label: '🔵 游戏玩法',            desc: '任务、剧情、道具、角色等玩法相关' },
  { value: 'ux',              label: '🟣 界面体验',            desc: '操作不方便、功能入口找不到等' },
]

export default function AddFeedback() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',        // Discord 帖子原标题（英文）
    titleZh: '',      // 中文翻译标题（方便运营理解）
    author: '',       // Discord 用户名
    content: '',      // 帖子内容摘要（英文原文）
    contentZh: '',    // 中文翻译内容（方便运营理解）
    category: 'question' as FeedbackCategory,
    reactions: 0,     // 表情反应数量（热度指标，>5 自动标记热门）
    replies: 0,       // 评论回复数量（热度指标，>3 自动标记热门）
    hoursAgo: 1,      // 几小时前发帖
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
    // 实际项目中这里会保存到数据库；目前显示成功提示后跳回主页
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
          {/* 页面标题 */}
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
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors"
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
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors"
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
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors"
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
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors resize-none"
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
                placeholder="用中文说清楚用户在反映什么问题，方便你快速理解"
                className="w-full rounded-lg bg-[#111111] border border-[#1f1f1f] focus:border-indigo-600 focus:outline-none px-3 py-2 text-sm text-[#f0f0f0] placeholder-[#444444] transition-colors resize-none"
              />
            </div>

            {/* 分类 */}
            <div>
              <label className="block text-xs font-medium text-[#888888] mb-1.5">问题分类</label>
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
              {/* 当前选中分类的说明 */}
              <p className="text-[#444444] text-xs mt-1">
                {categoryOptions.find((o) => o.value === form.category)?.desc}
              </p>
            </div>

            {/* 数字字段：反应数、评论数、发帖时间 */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  👍 表情反应数
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
                  💬 评论回复数
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
                  ⏱ 几小时前发的
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

            {/* 热门判断说明 */}
            <p className="text-[#444444] text-xs -mt-2">
              💡 表情反应 &gt; 5 或 评论回复 &gt; 3，系统自动标记为 🔥 热门
            </p>

            {/* 操作按钮 */}
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
