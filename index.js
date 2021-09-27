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
        const currentNumber = parseFloat(display.textContent);
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
        display.textContent = textKey;
        newNumber = false;
    }else{
        display.textContent += textKey;
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
        previousNumber = parseFloat(display.textContent);
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