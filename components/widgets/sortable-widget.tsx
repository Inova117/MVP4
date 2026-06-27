// Sortable Widget Wrapper
'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Widget } from './widget'
import type { Widget as WidgetType } from '@/types'

interface SortableWidgetProps {
  widget: WidgetType
  onDelete: () => void
  onUpdate: () => void
}

// Static maps so Tailwind keeps these classes in the build.
const lgColSpan: Record<number, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
}
const lgRowSpan: Record<number, string> = {
  1: 'lg:row-span-1',
  2: 'lg:row-span-2',
  3: 'lg:row-span-3',
  4: 'lg:row-span-4',
  5: 'lg:row-span-5',
  6: 'lg:row-span-6',
}

export function SortableWidget({
  widget,
  onDelete,
  onUpdate,
}: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 40 : undefined,
  }

  const width = Math.min(widget.width, 12)
  const height = Math.min(widget.height, 6)
  const colSpan = lgColSpan[width] || 'lg:col-span-12'
  const rowSpan = lgRowSpan[height] || 'lg:row-span-2'
  // KPI cards sit two-up on tablet; charts go full width.
  const smSpan = width <= 3 ? 'sm:col-span-1' : 'sm:col-span-2'
  const minH = width <= 3 ? 'min-h-[150px]' : 'min-h-[320px]'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${smSpan} ${colSpan} ${rowSpan} ${minH}`}
      {...attributes}
    >
      <Widget
        widget={widget}
        onDelete={onDelete}
        onUpdate={onUpdate}
        dragHandleProps={listeners}
      />
    </div>
  )
}
