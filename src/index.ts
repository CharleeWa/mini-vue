export * from './runtime-dom'
export * from './reactivity'

import { baseCompile } from './compiler-core/src'

function compileToFunction(template) {
  const { code } = baseCompile(template)
}