import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  private _rawValue: any;
  public dep;
  public _v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    // 1: 看看 value 是不是 对象
    this.dep = new Set();
  }
  
  get value() {
    trackRefValue(this)
    return this._value;
  }

  set value(newValue) {
    // newValue => this._value
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffects(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) { 
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref._v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}