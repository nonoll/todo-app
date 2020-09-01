import { LinkMenu } from '..'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'

export default {
  title: 'Components/Menus',
  decorators: [withKnobs]
}

const eventsFromObject = actions({
  click: 'click'
})

export const MenusLinkMenu = () => ({
  components: { LinkMenu },
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
        '일감을 편집합니다.'
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
          'el-icon-more-outline': 'el-icon-more-outline',
          'el-icon-s-flag': 'el-icon-s-flag',
          'el-icon-star-on': 'el-icon-star-on'
        },
        'el-icon-more-outline'
      )
    },
    text: {
      default: text(
        'text',
        ''
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
      <link-menu
        v-on="eventsFromObject"
        :tooltip-effect="tooltipEffect"
        :tooltip-message="tooltipMessage"
        :icon-class-name="iconClassName"
        :text="text"
      />
    </div>
  `,
  methods: {}
})

MenusLinkMenu.story = {
  name: 'LinkMenu',
  parameters: {
    notes: {
      markdown: require('./LinkMenu.md')
    }
  }
}
