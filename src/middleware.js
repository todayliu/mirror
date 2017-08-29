import {effects} from './effects'
import {hooks} from './hook'

export default function createMiddleware() {
  return store =>next => action => {
    const result = next(action)
    let effectResult
    if (typeof effects[action.type] === 'function') {
      effectResult = effects[action.type](action.data,store)
    }
    hooks.forEach(hook => hook(action, store))
    return effectResult || result
  }
}
