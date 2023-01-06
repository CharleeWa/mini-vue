export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type
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
    instance.setupResult = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  instance.render = Component.render
}

