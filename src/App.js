import { useReducer } from 'react';
import DigitBtn from './digitsoperations/DigitBtn';
import OperationBtn from './digitsoperations/OperationBtn';
import './App.css';

export const actions ={
  add_digit: 'add_digit',
  choose_operation: 'choose_operation',
  clear: 'clear',
  delete_digit:'delete_digit',
  evaluate:'evaluate'
}
const reducer = (state,{type,payload} )=>{
  
  switch(type) {
    case actions.add_digit:
      if(payload.digit === "0" && state.currentInput === "0"){
        return state
      }
      
      if(payload.digit === "." && state.currentInput.includes(".")){
        return state
      }
      
      return{ 
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`
      }

    case actions.choose_operation:
      if (state.currentInput==null && state.previousInput== null){
        return state
      }

      if(state.currentInput ==null){
        return{
          ...state,
          operation: payload.operation
        }
      }

      if(state.previousInput==null){
        return {
          ...state,
          operation: payload.operation,
          previousInput: state.currentInput,
          currentInput:null
        }
      }

      return{
        ...state,
        previousInput: evaluate(state),
        operation: payload.operation,
        currentInput: null
      }
    
    case actions.clear:
        return {}
    default : return null
  }
}

function evaluate({currentInput, previousInput, operation}) {
  const current = parseFloat(currentInput)
  const prev = parseFloat(previousInput)
  if(isNaN(prev) || isNaN(current)) return ""
  let evaluation = ""

  switch(operation) {
    case "/":
      evaluation = prev / current
      break
    case "*":
      evaluation = prev * current
      break
    case "+":
      evaluation = prev + current
      break
    case "-":
      evaluation = prev - current
      break
    default: evaluation =""
  }
  console.log(evaluation)
  return evaluation.toString()
  
}

function App() {  
  // reducer
  const [{currentInput, previousInput, operation}, dispatch] = useReducer(reducer,{})
  
  return (
    <div className='container'>
      <div className="calculator__grid container">
        <div className="output">
          <div className="previous__input">{previousInput} {operation}</div>
          <div className="current__input">{currentInput}</div>
        </div>
        <button className="span2" onClick={() => dispatch({ type: actions.clear })}>AC</button>
        <button><i class="ri-delete-back-2-line"></i></button>
        
        <OperationBtn operation ="/" dispatch={dispatch}/>
        <DigitBtn digit ="7" dispatch={dispatch}/>
        <DigitBtn digit ="8" dispatch={dispatch}/>
        <DigitBtn digit ="9" dispatch={dispatch}/>
         
        <OperationBtn operation ="*" dispatch={dispatch}/>
        <DigitBtn digit ="4" dispatch={dispatch}/>      
        <DigitBtn digit ="5" dispatch={dispatch}/>      
        <DigitBtn digit ="6" dispatch={dispatch}/>      
              
        <OperationBtn operation ="+" dispatch={dispatch}/>
        <DigitBtn digit ="1" dispatch={dispatch}/>
        <DigitBtn digit ="2" dispatch={dispatch}/>
        <DigitBtn digit ="3" dispatch={dispatch}/>
                   
        <OperationBtn operation ="-" dispatch={dispatch}/>            
        <DigitBtn digit ="." dispatch={dispatch}/>
        <DigitBtn digit ="0" dispatch={dispatch}/>            
        <button className="span2">=</button>            
            
      </div>
    </div>
  );
}

export default App;
