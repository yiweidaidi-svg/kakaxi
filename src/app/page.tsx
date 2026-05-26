'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Feedback, FeedbackCategory } from '@/types/feedback'

const categoryMeta: Record<FeedbackCategory, { label: string; color: string }> = {
  bug:             { label: 'Bug',  color: 'text-red-400 bg-red-400/10' },
  feature_request: { label: '功能建议', color: 'text-green-400 bg-green-400/10' },
  question:        { label: '问题咨询', color: 'text-yellow-400 bg-yellow-400/10' },
  gameplay:        { label: '游戏玩法', color: 'text-blue-400 bg-blue-400/10' },
  ux:              { label: '界面体验', color: 'text-purple-400 bg-purple-400/10' },
}

const allCategories: FeedbackCategory[] = ['bug', 'feature_request', 'question', 'gameplay', 'ux']

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [filter, setFilter] = useState<FeedbackCategory | 'all'>('all')

  useEffect(() => {
    const stored = localStorage.getItem('feedbacks')
    if (stored) setFeedbacks(JSON.parse(stored))
  }, [])

  const filtered = filter === 'all' ? feedbacks : feedbacks.filter((f) => f.category === filter)

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 p-8 overflow-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#f0f0f0]">Discord 反馈列表</h1>
            <p className="text-[#888888] text-sm mt-0.5">共 {feedbacks.length} 条反馈</p>
          </div>
          <Link
            href="/add-feedback"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            + 添加反馈
          </Link>
        </div>

        {/* 分类过滤 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#f0f0f0] text-[#0a0a0a]'
                : 'bg-[#111111] border border-[#1f1f1f] text-[#888888] hover:text-[#f0f0f0]'
            }`}
          >
            全部
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === cat
                  ? `${categoryMeta[cat].color} border border-current/30`
                  : 'bg-[#111111] border border-[#1f1f1f] text-[#888888] hover:text-[#f0f0f0]'
              }`}
            >
              {categoryMeta[cat].label}
            </button>
          ))}
        </div>

        {/* 列表 */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <p className="text-4xl">📭</p>
            <p className="text-[#888888] text-sm">暂无反馈，点击右上角"添加反馈"开始录入</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#1f1f1f] bg-[#111111] hover:border-[#2d2d2d] transition-colors p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${categoryMeta[item.category].color}`}
                      >
                        {categoryMeta[item.category].label}
                      </span>
                      {item.isHot && (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-400/10 text-amber-400">
                          🔥 热门
                        </span>
                      )}
                    </div>
                    <p className="text-[#f0f0f0] text-sm font-medium leading-snug">{item.titleZh}</p>
                    <p className="text-[#444444] text-xs mt-0.5">{item.title}</p>
                    {item.contentZh && (
                      <p className="text-[#888888] text-xs mt-2 line-clamp-2">{item.contentZh}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-right text-xs text-[#444444] space-y-1">
                    <p>{item.author}</p>
                    <p>{item.hoursAgo}h 前</p>
                    <div className="flex gap-2 justify-end text-[#444444]">
                      <span title="表情反应">👍 {item.reactions}</span>
                      <span title="回复数">💬 {item.replies}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
