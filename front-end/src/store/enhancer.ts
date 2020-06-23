import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'

const promise = createPromise({ promiseTypeDelimiter: '/' })
const middlewares: any[] = [thunk, promise]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').default)
}

const composeEnhancers = (process.env.NODE_ENV === 'development' && (typeof window !== 'undefined')
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const enhancer = composeEnhancers(applyMiddleware<any>(...middlewares))

export default enhancer