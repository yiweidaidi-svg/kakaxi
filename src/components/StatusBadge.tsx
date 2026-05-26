import { FeedbackStatus } from '@/types/feedback'

const statusConfig: Record<FeedbackStatus, { label: string; className: string }> = {
  new: {
    label: '新建',
    className: 'bg-zinc-800 text-zinc-400',
  },
  in_review: {
    label: '审核中',
    className: 'bg-blue-900 text-blue-300',
  },
  task_created: {
    label: '已建任务',
    className: 'bg-orange-900 text-orange-300',
  },
  resolved: {
    label: '已解决',
    className: 'bg-green-900 text-green-300',
  },
}

interface StatusBadgeProps {
  status: FeedbackStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
