'use strict';

//variaveis de ligacao com html
const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=Operator]');

let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator !== undefined;

//funcao que realiza as operacoes basicas
const calculate = () => {
    if (pendingOperation()) {
        const currentNumber = parseFloat(display.textContent.replace(",", "."));
        newNumber = true;
        if (operator == "+") {
            updateDisplay(previousNumber + currentNumber);
        } else if (operator == "-") {
            updateDisplay(previousNumber - currentNumber);
        } else if (operator == "X") {
            updateDisplay(previousNumber * currentNumber);
        } else if (operator == "÷") {
            updateDisplay(previousNumber / currentNumber);
        }
    }
}

//funcao que atualiza a tela com os novos numeros clicados 
const updateDisplay = (textKey) => {
    if(newNumber){
        display.textContent = textKey.toLocaleString("BR");
        newNumber = false;
    }else{
        display.textContent += textKey.toLocaleString("BR");
    }
    
}
const insertNum = (eventBtn) => updateDisplay(eventBtn.target.textContent);

//funcao que verifica constantemente se o usuario clicou em alguma tecla de numero 
numbers.forEach(num => 
    num.addEventListener('click', insertNum)
);

//funcao que verifica qual operacao foi selecionada. Toda vez que um numero ja nao e mais novo a operacao pode ser acionada 
const selectOperator = (eventBtn) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        operator = eventBtn.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(",", "."));
        console.log(operator);
    }
    
}
//funcao que verifica constantemente se o usuario clicou em alguma tecla de operador
operators.forEach(operator => 
    operator.addEventListener('click', selectOperator)
);

//funcao que ativa o botao de igual
const activeEqual = () => {
    calculate();
    operator = undefined;
}
document.getElementById("equal-btn").addEventListener("click", activeEqual);

//apagar numeros do display
const cleanDisplay = () => display.textContent = "";
document.getElementById("clean-display-btn").addEventListener('click', cleanDisplay);

//apagar calculo (que esta armazenado)
const cleanCalculation = () => {
    cleanDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}
document.getElementById("clean-calculation-btn").addEventListener("click", cleanCalculation);

//backspace
const deletePreviousNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById("clear-number-btn").addEventListener("click", deletePreviousNumber);

//funcao de inverter o sinal
const invertSign = () => {
    newNumber = true;
    updateDisplay(display.textContent * - 1);
}
document.getElementById("invert-sign-btn").addEventListener("click", invertSign);

//transformando numeros em decimais
const exixstDecimal = () => display.textContent.indexOf(",") !== -1;
const existValue = () => display.textContent.length > 0;
const transformToDecimal = () => {
    if (!exixstDecimal()) {
        if (existValue()) {
            updateDisplay(",");
        }else {
            updateDisplay("0,");
        }
    }
}
document.getElementById("decimal-btn").addEventListener("click", transformToDecimal);