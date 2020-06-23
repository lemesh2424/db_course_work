import { useDispatch } from 'react-redux'
import { Action } from 'redux-actions'

export default function useAsyncDispatch() {
  const dispatch = useDispatch()

  return (action: Action<any>): Promise<any> => {
    return Promise.resolve(dispatch(action))
  }
}