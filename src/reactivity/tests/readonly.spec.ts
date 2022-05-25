import { readonly, isReadonly } from "../reactive"

describe('readonly', () => { 
  test('happy path', () => { 
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(wrapped.foo).toBe(1)
  })

  test('warn then call set', () => {

    console.warn = jest.fn()

    const user = readonly({
      age: 10
    })

    user.age = 11

    expect(console.warn).toBeCalled()
  })
})