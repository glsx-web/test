const components = require.context('./', true, /\.vue$/)
const install = (Vue) => {
  components.keys().map(item => {
    Vue.component(item.replace(/\.\//, '').replace(/\.vue$/, ''), components(item).default)
  })
}
export default install
