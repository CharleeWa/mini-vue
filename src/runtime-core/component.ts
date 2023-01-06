export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {}
  }

  return component
}

export function setupComponent(instance) {
  // initProps()
  // initSlots()
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type

  // ctx
  instance.proxy = new Proxy({}, {
    get(target, key) {
      const { setupState } = instance
      if(key in setupState) {
        return setupState[key]
      }
    }
  })

  const { setup } = Component

  if(setup) {
    // funcation object
    const setupResult = setup()
    handleSetupResult(instance ,setupResult)
  }
}

function handleSetupResult(instance ,setupResult:any) {
  // function object
  // TODO function
  if(typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  instance.render = Component.render
}

