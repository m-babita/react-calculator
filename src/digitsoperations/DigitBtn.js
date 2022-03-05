import {actions} from '../App'

export default function DigitBtn({dispatch, digit}) {
  return (
    <button 
        onClick={()=> dispatch({type: actions.add_digit, payload: {digit}})}>
        {digit}
    </button>
  )
}
