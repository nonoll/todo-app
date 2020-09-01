import { TodoItem } from '..'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Components/Todo',
  decorators: [withKnobs]
}

const eventsFromObject = actions({
  'status-toggle': 'status-toggle',
  'content-click': 'content-click',
  'edit-click': 'edit-click',
  'delete-click': 'delete-click'
})

export const TodoTodoItem = () => ({
  components: { TodoItem },
  props: {
    title: {
      default: text('title', 'title')
    },
    description: {
      default: text('description', 'description')
    },
    isDone: {
      default: boolean('isDone', false)
    }
  },
  data() {
    return {
      eventsFromObject
    };
  },
  template: `
    <div>
      <todo-item
        v-on="eventsFromObject"
        :title="title"
        :description="description"
        :is-done="isDone"
      />
    </div>
  `,
  methods: {}
})

TodoTodoItem.story = {
  name: 'TodoItem',
  parameters: {
    notes: {
      markdown: require('./TodoItem.md')
    }
  }
}
