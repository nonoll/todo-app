import { SelectMenu } from '../'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, object } from '@storybook/addon-knobs'

export default {
  title: 'Components/Menus',
  decorators: [withKnobs]
};

const defaultOptions = [
  {
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
  }
] as const;

const eventsFromObject = actions({
  change: 'change'
})

export const MenusSelectMenu = () => ({
  components: { SelectMenu },
  props: {
    tooltipEffect: {
      default: select(
        'tooltipEffect',
        {
          dark: 'dark',
          light: 'light'
        },
        'dark'
      )
    },
    tooltipMessage: {
      default: text(
        'tooltipMessage',
        '일감을 정렬합니다.'
      )
    },
    tooltipPlacement: {
      default: select(
        'tooltipPlacement',
        (() => {
          const acceptedValues = 'top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end'.split('/')
          return acceptedValues.reduce((types: any, value) => {
            types[value] = value
            return types
          }, {})
        })(),
        'top-start'
      )
    },
    placeholder: {
      default: text(
        'placeholder',
        'Select'
      )
    },
    selected: {
      default: text(
        'selected',
        defaultOptions[0].label
      )
    },
    options: {
      default: object('options', defaultOptions)
    }
  },
  data() {
    return {
      eventsFromObject
    };
  },
  template: `
    <div>
      <select-menu
        v-on="eventsFromObject"
        :tooltip-effect="tooltipEffect"
        :tooltip-message="tooltipMessage"
        :placeholder="placeholder"
        :selected="selected"
        :options="options"
      />
    </div>
  `,
  methods: {}
})

MenusSelectMenu.story = {
  name: 'SelectMenu',
  parameters: {
    notes: {
      markdown: require('./SelectMenu.md')
    }
  }
}
