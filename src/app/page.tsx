'use client'

import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import FeedbackCard from '@/components/FeedbackCard'
import { feedbackData } from '@/data/feedback'

const today = new Date('2026-05-26').toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
})

export default function Home() {
  const router = useRouter()

  const total = feedbackData.length
  const hotIssues = feedbackData.filter((f) => f.isHot)
  const pending = feedbackData.filter((f) => f.status === 'new' || f.status === 'in_review')
  const resolved = feedbackData.filter((f) => f.status === 'resolved')

  const hotSorted = [...hotIssues].sort((a, b) => b.reactions - a.reactions)
  const allSorted = [...feedbackData].sort((a, b) => b.reactions - a.reactions)

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#f0f0f0]">Discord 反馈看板</h1>
            <p className="text-[#888888] text-sm mt-1">{today}</p>
          </div>
          <button
            onClick={() => router.push('/report')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            📋 生成日报
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="总反馈" value={total} color="text-[#f0f0f0]" />
          <StatCard label="🔥 热点问题" value={hotIssues.length} color="text-orange-400" />
          <StatCard label="待处理" value={pending.length} color="text-yellow-400" />
          <StatCard label="已解决" value={resolved.length} color="text-green-400" />
        </div>

        {/* Hot Issues Section */}
        {hotSorted.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-[#888888] uppercase tracking-widest mb-3">
              🔥 热点问题（按反应数排序）
            </h2>
            <div className="flex flex-col gap-3">
              {hotSorted.map((item) => (
                <FeedbackCard key={item.id} item={item} highlight />
              ))}
            </div>
          </section>
        )}

        {/* All Feedback */}
        <section>
          <h2 className="text-sm font-semibold text-[#888888] uppercase tracking-widest mb-3">
            全部反馈（按反应数排序）
          </h2>
          <div className="flex flex-col gap-3">
            {allSorted.map((item) => (
              <FeedbackCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
      <p className="text-[#888888] text-xs mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
