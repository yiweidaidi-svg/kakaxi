'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { feedbackData } from '@/data/feedback'
import { FeedbackCategory } from '@/types/feedback'

const REPORT_DATE = '2026-05-26'

const categoryLabels: Record<FeedbackCategory, string> = {
  bug: '🔴 Bug',
  feature_request: '🟢 功能需求',
  question: '🟡 问题',
  gameplay: '🔵 玩法',
  ux: '🟣 体验',
}

function buildReportText(): string {
  const total = feedbackData.length
  const hotItems = feedbackData.filter((f) => f.isHot).sort((a, b) => b.reactions - a.reactions)
  const categories = (Object.keys(categoryLabels) as FeedbackCategory[]).map((cat) => ({
    cat,
    count: feedbackData.filter((f) => f.category === cat).length,
  }))
  const actionItems = feedbackData.filter(
    (f) => f.isHot && f.status !== 'task_created' && f.status !== 'resolved'
  )

  const lines: string[] = [
    `【Enjoy AI Town Discord 日报】${REPORT_DATE}`,
    ``,
    `📊 数据汇总`,
    `- 总反馈数：${total}`,
    `- 热点问题：${hotItems.length}`,
    `- 待处理：${feedbackData.filter((f) => f.status === 'new' || f.status === 'in_review').length}`,
    `- 已解决：${feedbackData.filter((f) => f.status === 'resolved').length}`,
    ``,
    `🔥 热点问题（按 reactions 排序）`,
    ...hotItems.map(
      (f) =>
        `• [${categoryLabels[f.category]}] ${f.title}（@${f.author}）👍${f.reactions} 💬${f.replies}`
    ),
    ``,
    `📁 分类统计`,
    ...categories.filter((c) => c.count > 0).map((c) => `• ${categoryLabels[c.cat]}：${c.count} 条`),
    ``,
    `✅ 待建任务`,
    ...actionItems.map((f) => `• ${f.title}（@${f.author}）— 👍${f.reactions} 💬${f.replies}`),
    actionItems.length === 0 ? '  暂无' : '',
  ]

  return lines.filter((l) => l !== undefined).join('\n').trim()
}

export default function ReportPage() {
  const [copied, setCopied] = useState(false)

  const total = feedbackData.length
  const hotItems = feedbackData.filter((f) => f.isHot).sort((a, b) => b.reactions - a.reactions)
  const pending = feedbackData.filter((f) => f.status === 'new' || f.status === 'in_review')
  const resolved = feedbackData.filter((f) => f.status === 'resolved')
  const categories = (Object.keys(categoryLabels) as FeedbackCategory[]).map((cat) => ({
    cat,
    count: feedbackData.filter((f) => f.category === cat).length,
  }))
  const actionItems = feedbackData.filter(
    (f) => f.isHot && f.status !== 'task_created' && f.status !== 'resolved'
  )

  function handleCopy() {
    const text = buildReportText()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#f0f0f0]">Discord 日报</h1>
              <p className="text-[#888888] text-sm mt-1">{REPORT_DATE} · Enjoy AI Town</p>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-700 text-green-100'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {copied ? '✅ 已复制' : '📋 复制报告'}
            </button>
          </div>

          {/* Summary stats */}
          <section className="mb-8 bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <h2 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-4">
              📊 数据汇总
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              <Stat label="总反馈" value={total} color="text-[#f0f0f0]" />
              <Stat label="热点问题" value={hotItems.length} color="text-orange-400" />
              <Stat label="待处理" value={pending.length} color="text-yellow-400" />
              <Stat label="已解决" value={resolved.length} color="text-green-400" />
            </div>
          </section>

          {/* Hot Issues */}
          <section className="mb-8">
            <h2 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">
              🔥 热点问题（按 reactions 排序）
            </h2>
            <div className="flex flex-col gap-2">
              {hotItems.length === 0 && (
                <p className="text-[#444444] text-sm">暂无热点问题</p>
              )}
              {hotItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#1a1208] border border-yellow-800 rounded-lg px-4 py-3"
                >
                  <div>
                    <span className="text-xs font-medium text-orange-400 mr-2">
                      {categoryLabels[item.category]}
                    </span>
                    <span className="text-sm text-[#f0f0f0] font-medium">{item.titleZh}</span>
                    <span className="text-xs text-[#888888] ml-1">({item.title})</span>
                    <span className="text-xs text-[#666666] ml-2">@{item.author}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-[#888888]">👍 {item.reactions}</span>
                    <span className="text-xs text-[#888888]">💬 {item.replies}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Category breakdown */}
          <section className="mb-8">
            <h2 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">
              📁 分类统计
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {categories.map(({ cat, count }) => (
                <div
                  key={cat}
                  className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-3 text-center"
                >
                  <p className="text-xs text-[#888888] mb-1">{categoryLabels[cat]}</p>
                  <p className="text-2xl font-bold text-[#f0f0f0]">{count}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Action Items */}
          <section className="mb-8">
            <h2 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">
              ✅ 待建任务
            </h2>
            {actionItems.length === 0 ? (
              <p className="text-[#444444] text-sm">暂无待建任务</p>
            ) : (
              <div className="flex flex-col gap-2">
                {actionItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#111111] border border-[#1f1f1f] rounded-lg px-4 py-3"
                  >
                    <div>
                      <span className="text-xs font-medium text-[#888888] mr-2">
                        {categoryLabels[item.category]}
                      </span>
                      <span className="text-sm text-[#f0f0f0]">{item.titleZh}</span>
                      <span className="text-xs text-[#888888] ml-1">({item.title})</span>
                      <span className="text-xs text-[#666666] ml-2">@{item.author}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-[#888888]">👍 {item.reactions}</span>
                      <span className="text-xs text-[#888888]">💬 {item.replies}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Raw report preview */}
          <section>
            <h2 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">
              📄 报告预览（可直接复制发送）
            </h2>
            <pre className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-5 text-xs text-[#c8c8c8] whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto">
              {buildReportText()}
            </pre>
          </section>
        </div>
      </main>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-[#888888] text-xs mt-0.5">{label}</p>
    </div>
  )
}
