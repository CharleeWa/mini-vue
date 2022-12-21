export const App = {
  render() {
    // ui
    return history('div', 'hi, '+ this.msg)  
  },

  setup(){
    return {
      msg: 'mini-vue'
    }
  }
}