import Vue from 'vue';
export default {
  title: 'Welcome/to Storybook'
};

const Welcome = Vue.component('Welcome', {
  template: `
    <div>
      <h1>Welcome</h1>
    </div>
  `
})

export const Default = () => ({
  component: { Welcome },
  template: '<welcome />'
})
