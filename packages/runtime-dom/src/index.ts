import { createRenderer } from '@mini-vue/runtime-core'

function createElement(type) {
  return document.createElement(type)
}

function patchProp(el, key, prevVal, nextval) {
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  if(isOn(key)) {
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, nextval)
  } else {
    if(nextval === undefined || nextval === null) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextval)
    }
  }
}

function insert(child, parent, anchor){
  parent.insertBefore(child, anchor || null)
}

function remove(child) {
  const parent = child.parentNode
  if(parent) {
    parent.removeChild(child)
  }
}

function setElementText(el, text) {
  el.textContent = text
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText
})

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '@mini-vue/runtime-core'
