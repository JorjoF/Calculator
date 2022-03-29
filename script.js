let firstOperand = '';
let secondOperand = '';

const operatorButton = document.querySelectorAll('[data-operator]');
const cButton = document.querySelector('.clear');
const nButton = document.querySelector('.sign');
const screen = document.querySelector('.screen');
const numberButtons = document.querySelectorAll('[data-number]');

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
    return 0;
}

function sign(a){
    return a - (a*2);
}

numberButtons.forEach((button) => 
button.addEventListener('click', () => {
    
})
);



