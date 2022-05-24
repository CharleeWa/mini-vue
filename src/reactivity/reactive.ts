import { mutableHandles, readonlyHandles } from "./baseHandles";
import { track, trigger } from "./effect";

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles);
}

function createActiveObject(raw: any, baseHandles) {
  return new Proxy(raw, baseHandles)
}