// Widget Grid with Drag & Drop
'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableWidget } from './sortable-widget'
import { dataClient } from '@/lib/supabase'
import type { Widget } from '@/types'

interface WidgetGridProps {
  widgets: Widget[]
  onUpdate: () => void
}

export function WidgetGrid({ widgets, onUpdate }: WidgetGridProps) {
  const [items, setItems] = useState(widgets)

  // Update items when widgets prop changes
  useEffect(() => {
    setItems(widgets)
  }, [widgets])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      const newItems = arrayMove(items, oldIndex, newIndex)
      setItems(newItems)

      // Update positions in database
      try {
        const movedWidget = items[oldIndex]
        const targetWidget = items[newIndex]

        await dataClient.updateWidget(movedWidget.id, {
          position_x: targetWidget.position_x,
          position_y: targetWidget.position_y,
        })

        onUpdate()
      } catch (error) {
        console.error('Error updating widget position:', error)
        // Revert on error
        setItems(items)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((w) => w.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[5.5rem]">
          {items.map((widget) => (
            <SortableWidget
              key={widget.id}
              widget={widget}
              onUpdate={onUpdate}
              onDelete={async () => {
                await dataClient.deleteWidget(widget.id)
                onUpdate()
              }}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
