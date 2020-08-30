module.exports = {
  stories: ['../**/**/*.stories.(js|ts)'],
  addons: [
    '@storybook/addon-notes/register-panel',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register'
  ]
};
