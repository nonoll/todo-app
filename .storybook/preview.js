import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { addParameters } from '@storybook/vue'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../src/assets/styles/global.scss'

Vue.use(VueCompositionApi);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  },
  dependencies: {
    withStoriesOnly: true
  }
})
