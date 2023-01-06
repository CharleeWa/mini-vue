import { isObject } from "../shared/index"
import { createComponentInstance, setupComponent } from "./component"
import { createVNode } from "./vnode"

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  if(typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processComponent(vnode:any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(initialVNode: any, container: any) {
  const instance = createComponentInstance(initialVNode)
  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container: any) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  patch(subTree, container)

  initialVNode.el = subTree.el
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const el = ( vnode.el = document.createElement(vnode.type))

  // string array
  const { children } = vnode

  if(typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }
  // props
  const { props } = vnode

  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}