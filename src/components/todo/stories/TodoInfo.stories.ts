import { TodoInfo } from '..'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Components/Todo',
  decorators: [withKnobs]
}

const eventsFromObject = actions({
  'add-todo': 'add-todo',
  'filter-change': 'filter-change'
})

const defaultFilterOptions = [{
  value: 'ALL',
  label: '전체'
}, {
  value: 'PRIORITY',
  label: '우선순위'
}, {
  value: 'DUE_DATE',
  label: '마감기한'
}, {
  value: 'DONE',
  label: '완료'
}]

export const TodoTodoInfo = () => ({
  components: { TodoInfo },
  props: {
    title: {
      default: text('title', '오늘(화요일) 09월 01일')
    },
    filter: {
      default: text('description', defaultFilterOptions[0].label)
    },
    filterOptions: {
      default: object('filterOptions', defaultFilterOptions)
    }
  },
  data() {
    return {
      eventsFromObject
    };
  },
  template: `
    <div>
      <todo-info
        v-on="eventsFromObject"
        :title="title"
        :filter="filter"
        :filter-options="filterOptions"
      />
    </div>
  `,
  methods: {}
})

TodoTodoInfo.story = {
  name: 'TodoInfo',
  parameters: {
    notes: {
      markdown: require('./TodoInfo.md')
    }
  }
}
