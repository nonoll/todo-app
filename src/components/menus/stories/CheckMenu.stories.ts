import { CheckMenu } from '..'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, object } from '@storybook/addon-knobs'

export default {
  title: 'Components/Menus',
  decorators: [withKnobs]
}

const eventsFromObject = actions({
  change: 'change'
})

export const MenusCheckMenu = () => ({
  components: { CheckMenu },
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
        '세부 작업 내용을 입력합니다.'
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
    iconClassName: {
      default: select(
        'iconClassName',
        {
          'el-icon-chat-line-square': 'el-icon-chat-line-square',
          'el-icon-s-flag': 'el-icon-s-flag',
          'el-icon-star-on': 'el-icon-star-on'
        },
        'el-icon-chat-line-square'
      )
    },
    blind: {
      default: text(
        'blind',
        '내용 추가'
      )
    },
    payload: {
      default: object(
        'payload',
        {
          a: 'a',
          b: 'b'
        }
      )
    }
  },
  data() {
    return {
      eventsFromObject
    };
  },
  template: `
    <div>
      <check-menu
        v-on="eventsFromObject"
        :tooltip-effect="tooltipEffect"
        :tooltip-message="tooltipMessage"
        :icon-class-name="iconClassName"
        :blind="blind"
        :payload="payload"
      />
    </div>
  `,
  methods: {}
})

MenusCheckMenu.story = {
  name: 'CheckMenu',
  parameters: {
    notes: {
      markdown: require('./CheckMenu.md')
    }
  }
}
