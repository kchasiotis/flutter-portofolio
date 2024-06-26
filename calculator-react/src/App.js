import './App.css';
import {useState} from 'react';

const CalculatorButton = ({number, handlePressed}) => {
    return <button onClick={() => handlePressed(number)}>{number}</button>
}
const CalculatorAction = ({number, handlePressed}) => {
    return <button onClick={() => handlePressed(number)}>{number}</button>
}

const Calculator = () => {
    const [result, setResult] = useState('0')
    const [actionArray, setActionArray] = useState([]);

    const add = (number1, number2) => {
        return number1 + number2;
    }

    const subtract = (number1, number2) => {
        return number1 - number2;
    }

    const removeLastCharacter = ()=>{
        setResult(result.slice(0, result.length - 1));
    }

    const handleNumberPressed = (numberPressed) => {
        const newText = result === '0' ? numberPressed.toString() : result + numberPressed.toString() + '';
        setResult(newText)
    }

    const handleAction = (action) => {
        setActionArray([...actionArray, action]);
        const lastChar = result.charAt(result.length - 1);
        if (['+', '-'].includes(lastChar)) {
            return;
        }

        setResult(action.name === 'add' ? result + '+' : result + '-')
    }

    const calcResult = () => {
        const numberList = result.match(/\d+/g);
        if (actionArray.length >= numberList.length) {
            return;
        }

        let calculationResult = parseInt(numberList[0]);
        for (let i = 0; i < actionArray.length; i++) {
            calculationResult = actionArray[i](calculationResult, parseInt(numberList[i+1]));

        }
        setResult(calculationResult.toString());

        setActionArray([]);
    }

    return <div className="calculator">
        <div className="calculatorHeader">
            <p style={{color: "black"}}>{result}</p>
        </div>
        <div className="calcBody">
            <div className="numberButtons">
                <div className="numberRow">
                    <CalculatorButton number={7} handlePressed={handleNumberPressed}/>
                    <CalculatorButton number={8} handlePressed={handleNumberPressed}/>
                    <CalculatorButton number={9} handlePressed={handleNumberPressed}/>
                </div>
                <div className="numberRow">
                    <CalculatorButton number={4} handlePressed={handleNumberPressed}/>
                    <CalculatorButton number={5} handlePressed={handleNumberPressed}/>
                    <CalculatorButton number={6} handlePressed={handleNumberPressed}/>
                </div>
                <div className="numberRow">
                    <CalculatorButton number={1} handlePressed={handleNumberPressed}/>
                    <CalculatorButton number={2} handlePressed={handleNumberPressed}/>
                    <CalculatorButton number={3} handlePressed={handleNumberPressed}/>
                </div>
                <div className="numberRow">
                    <CalculatorButton number={0} handlePressed={handleNumberPressed}/>
                </div>
            </div>
            <div className="actionColumn">
                <CalculatorAction number={'c'} handlePressed={() => removeLastCharacter()}/>
                <CalculatorAction number={'+'} handlePressed={() => handleAction(add)}/>
                <CalculatorAction number={'-'} handlePressed={() => handleAction(subtract)}/>
                <CalculatorAction number={'='} handlePressed={calcResult}/>
            </div>
        </div>
    </div>;
}

function App() {
    return (
        <div className="App">
            <Calculator></Calculator>
        </div>
    );
}

export default App;
