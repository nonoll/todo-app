/** eslint-disable */
import { TodoEditor } from '..'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import { TODO_EDITOR_MODE, PRIORITYS_LABELS, PRIORITYS_VALUES, DefaultPriority } from '@/constants/todo'

export default {
  title: 'Components/Todo',
  decorators: [withKnobs]
}

const eventsFromObject = actions({
  opened: 'opened',
  closed: 'closed',
  save: 'save',
  modify: 'modify',
  cancel: 'cancel'
})

export const TodoTodoEditor = () => ({
  components: { TodoEditor },
  props: {
    visible: {
      default: boolean('visible', false)
    },
    mode: {
      default: select(
        'mode',
        {
          ADD: TODO_EDITOR_MODE.ADD,
          MODIFY: TODO_EDITOR_MODE.MODIFY
        },
        TODO_EDITOR_MODE.ADD as string
      )
    },
    autoFocus: {
      default: boolean('autoFocus', true)
    },
    title: {
      default: text('title', '일감 제목')
    },
    description: {
      default: text('description', '일감 내용')
    },
    priorityLabel: {
      default: text('priorityLabel', DefaultPriority.label)
    },
    priority: {
      default: select('priority', {
        [PRIORITYS_LABELS.LABEL_1]: PRIORITYS_VALUES.VALUE_1,
        [PRIORITYS_LABELS.LABEL_2]: PRIORITYS_VALUES.VALUE_2,
        [PRIORITYS_LABELS.LABEL_3]: PRIORITYS_VALUES.VALUE_3,
        [PRIORITYS_LABELS.LABEL_4]: PRIORITYS_VALUES.VALUE_4
      }, DefaultPriority.value)
    },
    dueDate: {
      default: text('dueDate', '19:00')
    }
  },
  data () {
    return {
      eventsFromObject
    }
  },
  template: `
    <div>
      <button
        style="padding:5px;border:1px solid black;border-radius:5px;cursor:pointer"
        @click="onOpenClick"
      >open todoEditor</button>
      <todo-editor
        v-on="eventsFromObject"
        :visible="visible"
        :mode="mode"
        :auto-focus="autoFocus"
        :title="title"
        :description="description"
        :priority-label="priorityLabel"
        :priority="priority"
        :due-date="dueDate"
      />
    </div>
  `,
  methods: {
    onOpenClick () {
      (this as any).visible = false
      /** eslint-disable */
      setTimeout(() => {
        (this as any).visible = true
      })
    }
  }
})

TodoTodoEditor.story = {
  name: 'TodoEditor',
  parameters: {
    notes: {
      markdown: require('./TodoEditor.md')
    }
  }
}
