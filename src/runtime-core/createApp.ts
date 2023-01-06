import { render } from "./renderer"
import { createVNode } from "./vnode"

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先vnode
      // component => vnode
      // 所有逻辑操作都是基于vnode做处理
      const vnode = createVNode(rootComponent)
      
      render(vnode, rootContainer)
    }
  }
}
