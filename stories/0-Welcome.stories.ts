import Vue from 'vue';

export default {
  title: 'Welcome/to Storybook'
};

const Welcome = Vue.component('Welcome', {
  template: `
    <div>
      <h1>Welcome</h1>
      <ul>
        <li>- 개인적으로, 스토리북으로 테스트하면서 구성하는게 좋다고 생각되어 구성하였습니다.</li>
        <li>- 되도록 사용되는 컴포넌트는 스토리북으로 확인 할 수 있게 진행하였습니다.</li>
        <li>- 컴포넌트 unit test 는 스토리북 진행으로 갈음 하였습니다.</li>
      </ul>
    </div>
  `
})

export const Default = () => ({
  component: { Welcome },
  template: '<welcome />'
})
