import { mutableHandles, readonlyHandles, shallowReadonlyHandles } from "./baseHandles";

export const enum ReactiveFlags {
  IS_REACTIVE = '_v_isReactive',
  IS_READONLY = '_v_isReadonly'
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles);
}

export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandles)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

function createActiveObject(raw: any, baseHandles) {
  return new Proxy(raw, baseHandles)
}
