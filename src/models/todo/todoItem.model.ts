import { ITodoItem } from './types'
import { Model } from '@/models/core/Model'
import { reactive } from '@vue/composition-api'
import { DefaultPriority } from '@/constants/todo'
import { IStorageTodoItem } from '@/models/storage/types'
import { timeToDate } from '@/libs/format'

export class TodoItem extends Model<ITodoItem> {
  state = reactive<ITodoItem>({
    uuid: '',
    createdAt: null,
    title: '',
    description: '',
    priorityLabel: DefaultPriority.label,
    priority: DefaultPriority.value,
    dueDate: '',
    isDone: false,
    isVisible: true
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromVo (vo: IStorageTodoItem | any): TodoItem {
    const { uuid, createdAt, title, description, priorityLabel, priority, dueDate, isDone, isVisible } = vo

    this.state.uuid = uuid || this.uuid
    this.state.createdAt = createdAt || new Date()
    this.state.title = title
    this.state.description = description
    this.state.priorityLabel = priorityLabel
    this.state.priority = parseInt(priority, 10)
    this.state.dueDate = (() => {
      if (!dueDate) {
        return ''
      }

      const isDate = dueDate instanceof Date
      return isDate ? dueDate : timeToDate(dueDate) as Date
    })()
    this.state.isDone = typeof isDone === 'string' ? isDone === 'true' : isDone
    this.state.isVisible = typeof isVisible === 'undefined' ? true : isVisible

    return this
  }

  toVo (): ITodoItem {
    const dueDate = (this.state.dueDate instanceof Date) ? this.state.dueDate.toTimeString().substr(0, 5) : ''
    return Object.assign({}, { ...this.state, dueDate })
  }
}
