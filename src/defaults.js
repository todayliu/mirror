export const options = {
  // global initial state
  // initialState: undefined,

  // Should be one of ['browser', 'hash', 'memory']
  // Learn more: https://github.com/ReactTraining/history/blob/master/README.md
  historyMode: 'browser',

  // A list of the standard Redux middleware
  middlewares: [],
  // A list of the standard Redux reduce
  reduces:{},
}

const historyModes = ['browser', 'hash', 'memory']

export default function defaults(opts = {}) {

  const {
    historyMode,
    middlewares,
    reducers,
  } = opts

  if (historyMode && !~historyModes.indexOf(historyMode)) {
    throw new Error(`historyMode "${historyMode}" is invalid, must be one of ${historyModes.join(', ')}!`)
  }

  if (middlewares && !Array.isArray(middlewares)) {
    throw new Error(`middlewares "${middlewares}" is invalid, must be an Array!`)
  }

  if (reducers && Object.prototype.toString.call(reducers)!== '[object Object]') {
    throw new Error(`middlewares "${reducers}" is invalid, must be an Object!`)
  }

  Object.keys(opts).forEach(key => {
    options[key] = opts[key]
  })
}
