import { h } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
  setup(props){},
  render() {
    return h('div', {}, 'foo:' + this.count)
  }
}