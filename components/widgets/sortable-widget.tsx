// Sortable Widget Wrapper
'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Widget } from './widget'
import type { Widget as WidgetType } from '@/types'

interface SortableWidgetProps {
    widget: WidgetType
    onDelete: () => void
}

export function SortableWidget({ widget, onDelete }: SortableWidgetProps) {
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
    }

    // Map for Tailwind class detection (safelist)
    const colSpanMap: Record<number, string> = {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
    }

    const rowSpanMap: Record<number, string> = {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
    }

    const colSpan = colSpanMap[Math.min(widget.width, 12)] || 'col-span-12'
    const rowSpan = rowSpanMap[Math.min(widget.height, 6)] || 'row-span-1'

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${colSpan} ${rowSpan}`}
            {...attributes}
        >
            <Widget widget={widget} onDelete={onDelete} dragHandleProps={listeners} />
        </div>
    )
}
