import { ShapeFlags } from "../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from "./vnode"

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  const { type, shapeFlag } = vnode

  // Fragment -> 只渲染 children
  switch (type) {
    case Fragment:
      processFragment(vnode, container)
      break;
    case Text:
      processText(vnode, container)
      break;
  
    default:
      if(shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container)
      }
      break
  }
}

function processText(vnode: any, container: any) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
}

function processFragment(vnode: any, container: any) {
  mountChildren(vnode, container)
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
  const { children, shapeFlag } = vnode

  if(shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }
  // props
  const { props } = vnode

  for (const key in props) {
    const val = props[key]
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if(isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}

