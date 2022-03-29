let firstOperand = '';
let secondOperand = '';
let currentOperation = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

const operatorButton = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const cButton = document.querySelector('.clear');
const nButton = document.querySelector('.sign');
const screen = document.querySelector('.screen');
const point = document.querySelector('.point');
const equal = document.querySelector('.equal');

numberButtons.forEach((button) => 
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    })
);

operatorButton.forEach((button) => 
    button.addEventListener('click', () =>{

    })
);

cButton.addEventListener('click', clear);

function appendNumber(number){
    screen.value += number
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0){
        return "err divide by zero";
    }else{
        return a / b;
    }
}

function percentage(a, b){
 return b * (a/100);
}

function clear(){
    screen.value = 0;
}

function sign(a){
    return a - (a*2);
}



