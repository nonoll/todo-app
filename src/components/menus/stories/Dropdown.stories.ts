/** eslint-disable */
import { Dropdown } from '..'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, object } from '@storybook/addon-knobs'

export default {
  title: 'Components/Menus',
  decorators: [withKnobs]
}

const defaultMenus = [
  {
    label: '우선순위 1',
    value: 1
  },
  {
    label: '우선순위 2',
    value: 2
  },
  {
    label: '우선순위 3',
    value: 3
  },
  {
    label: '우선순위 4',
    value: 4
  }
] as const

const eventsFromObject = actions({
  change: 'change'
})

export const MenusDropdown = () => ({
  components: { Dropdown },
  props: {
    trigger: {
      default: select(
        'trigger',
        {
          click: 'click',
          hover: 'hover'
        },
        'click'
      )
    },
    primaryLabel: {
      default: text(
        'primaryLabel',
        '우선순위 4'
      )
    },
    iconClassName: {
      default: select(
        'iconClassName',
        {
          'el-icon-s-flag': 'el-icon-s-flag',
          'el-icon-star-on': 'el-icon-star-on'
        },
        'el-icon-s-flag'
      )
    },
    menus: {
      default: object('menus', defaultMenus)
    }
  },
  data () {
    return {
      eventsFromObject
    }
  },
  template: `
    <div>
      <dropdown
        v-on="eventsFromObject"
        :trigger="trigger"
        :primary-label="primaryLabel"
        :icon-class-name="iconClassName"
        :menus="menus"
      />
    </div>
  `,
  methods: {}
})

MenusDropdown.story = {
  name: 'Dropdown',
  parameters: {
    notes: {
      markdown: require('./Dropdown.md')
    }
  }
}

export const SampleDropdown = () => ({
  components: { Dropdown },
  props: {
    trigger: {
      default: select(
        'trigger',
        {
          click: 'click',
          hover: 'hover'
        },
        'click'
      )
    },
    primaryLabel: {
      default: text(
        'primaryLabel',
        '우선순위 4'
      )
    },
    iconClassName: {
      default: select(
        'iconClassName',
        {
          'el-icon-s-flag': 'el-icon-s-flag',
          'el-icon-star-on': 'el-icon-star-on'
        },
        'el-icon-s-flag'
      )
    },
    menus: {
      default: object('menus', defaultMenus)
    }
  },
  data () {
    return {
      eventsFromObject
    }
  },
  template: `
    <div>
      <dropdown
        :trigger="trigger"
        :primary-label="primaryLabel"
        :icon-class-name="iconClassName"
        :menus="menus"
        @change="onChange"
      />
    </div>
  `,
  methods: {
    onChange (value: { label: string; value: number }) {
      const { label } = value;
      (this as any).primaryLabel = label
    }
  }
})

SampleDropdown.story = {
  name: 'Sample: Dropdown'
}
