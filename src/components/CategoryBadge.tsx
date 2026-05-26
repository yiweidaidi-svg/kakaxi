import { FeedbackCategory } from '@/types/feedback'

const categoryConfig: Record<FeedbackCategory, { label: string; className: string }> = {
  bug: {
    label: '🔴 Bug',
    className: 'bg-red-950 text-red-400 border border-red-900',
  },
  feature_request: {
    label: '🟢 功能需求',
    className: 'bg-green-950 text-green-400 border border-green-900',
  },
  question: {
    label: '🟡 问题',
    className: 'bg-yellow-950 text-yellow-400 border border-yellow-900',
  },
  gameplay: {
    label: '🔵 玩法',
    className: 'bg-blue-950 text-blue-400 border border-blue-900',
  },
  ux: {
    label: '🟣 体验',
    className: 'bg-purple-950 text-purple-400 border border-purple-900',
  },
}

interface CategoryBadgeProps {
  category: FeedbackCategory
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
