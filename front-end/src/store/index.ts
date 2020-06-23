import { createStore } from 'redux'
import reducers from './reducers'
import enhancer from './enhancer'

const store = createStore(reducers, {}, enhancer);

export default store