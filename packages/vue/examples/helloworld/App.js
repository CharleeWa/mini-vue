import { h } from '../../dist/mini-vue.esm.js'
import { Foo } from "./Foo.js"

window.self = null
export const App = {
  name: 'App',
  render() {
    window.self = this
    // ui
    return h('div', {
      id: 'root',
      class: ['red', 'hard'],
      onClick() {
        console.log('click')
      }
    },
    [h('div', {}, 'hi,' + this.msg), h(Foo, { count: 2 })]
    // 'hi, '+ this.msg
    // string
    // 'hi, mini-vue'
    // array
    // [h('p', { class: 'red'}, 'hi'), h('p', { class: 'blue'}, 'mini-vue')]
    )  
  },

  setup(){
    return {
      msg: 'mini-vue-haha'
    }
  }
}