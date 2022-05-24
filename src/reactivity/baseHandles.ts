import { track, trigger } from "./effect";

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(readonly = false) {
  return function get(target, key) {
    //https://www.zhangxinxu.com/wordpress/2021/07/js-proxy-reflect/
    const res = Reflect.get(target, key);

    if (!readonly) { 
      // TODO 依赖收集
      track(target, key)
    }
  
    return res;
  }
}

function createSetter() { 
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)

    // TODO 触发依赖
    trigger(target, key);
    return res;
  }
}

export const mutableHandles = {
  get,
  set
}

export const readonlyHandles = {
  get: readonlyGet,

  set(target, key, value) {
    console.warn(`key: ${key} set 失败 因为 target 是 readonly`, target)
    return true;
  }
}