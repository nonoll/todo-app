import { TodoList, TodoItem } from '..'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Components/Todo',
  decorators: [withKnobs]
}

const defaultTodoList = [
  {
    title: '일감 1',
    description: '일감 1, 상세 내용',
    isDone: false
  },
  {
    title: '일감 2',
    description: '일감 2, 상세 내용',
    isDone: false
  },
  {
    title: '일감 3',
    description: '일감 3, 상세 내용',
    isDone: true
  }
]

const eventsFromObject = actions({
  'status-toggle': 'status-toggle',
  'content-click': 'content-click',
  'edit-click': 'edit-click',
  'delete-click': 'delete-click'
})

export const TodoTodoList = () => ({
  components: { TodoList, TodoItem },
  props: {
    todoList: {
      default: object('todoList', defaultTodoList)
    }
  },
  data() {
    return {
      eventsFromObject
    };
  },
  template: `
    <div>
      <todo-list
        v-on="eventsFromObject"
        :todo-list="todoList"
      />
    </div>
  `,
  methods: {}
})

TodoTodoList.story = {
  name: 'TodoList',
  parameters: {
    notes: {
      markdown: require('./TodoList.md')
    }
  }
}
