import { FeedbackItem } from '@/types/feedback'
import CategoryBadge from './CategoryBadge'
import StatusBadge from './StatusBadge'

interface FeedbackCardProps {
  item: FeedbackItem
  highlight?: boolean
}

export default function FeedbackCard({ item, highlight = false }: FeedbackCardProps) {
  return (
    <div
      className={`rounded-xl p-4 border transition-colors ${
        highlight
          ? 'bg-[#1a1208] border-yellow-800 hover:border-yellow-700'
          : 'bg-[#111111] border-[#1f1f1f] hover:border-[#2d2d2d]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {item.isHot && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-orange-950 text-orange-400 border border-orange-800">
                🔥 HOT
              </span>
            )}
            <CategoryBadge category={item.category} />
            <StatusBadge status={item.status} />
          </div>
          <h3 className="text-[#f0f0f0] font-medium text-sm leading-snug mt-1">{item.title}</h3>
          <p className="text-[#888888] text-xs mt-1 line-clamp-2">{item.content}</p>
          <p className="text-[#444444] text-xs mt-2">
            <span className="text-[#666666]">@{item.author}</span> · {item.hoursAgo}小时前
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0 text-right">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#888888]" title="reactions">
              👍 {item.reactions}
            </span>
            <span className="text-xs text-[#888888]" title="replies">
              💬 {item.replies}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
