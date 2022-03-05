import {actions} from '../App'

export default function OperationBtn({dispatch, operation}) {
  return (
    <button 
        onClick={()=> dispatch({type: actions.choose_operation, payload: {operation}})}>
        {operation}
    </button>
  )
}
