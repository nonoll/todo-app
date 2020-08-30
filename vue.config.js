// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/styles/style.scss";',
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'node_modules/')]
        }
      }
    }
  }
}
