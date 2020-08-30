import TempButton from '../TempButton.vue'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

export default {
  title: 'Components',
  decorators: [withKnobs]
};

export const MenuButton = () => ({
  components: { TempButton },
  props: {
    iconSrc: {
      default: text(
        'iconSrc',
        'https://m-influencer.pstatic.net/img/intro-cate-img-9@2x.2423fda37001eabc664d10f7170a5a80.png'
      )
    },
    element: {
      default: select(
        'element',
        {
          button: 'button',
          a: 'a',
          div: 'div',
          span: 'span'
        },
        'button'
      )
    },
    disableClickable: {
      default: boolean('disableClickable', true)
    }
  },
  data() {
    return {};
  },
  template: `
    <div>
      <temp-button :iconSrc="iconSrc" :element="element" :disableClickable="disableClickable">
        <span>왼쪽</span>
        <template #bside>오른쪽</template>
      </temp-button>
      <br/>
      <br/>
      <temp-button :iconSrc="iconSrc" :element="element">
        <template #icon>[#icon]</template>
        <span>#default</span>
        <template #bside>#bside</template>
      </temp-button>
    </div>
  `,
  methods: {}
});

MenuButton.story = {
  name: 'TempButton',
  parameters: {
    notes: {
      markdown: require('./TempButton.md')
    }
  }
};
