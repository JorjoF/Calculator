let firstOperand = '';
let secondOperand = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

const operatorButton = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');

const point = document.querySelector('.point');
point.addEventListener('click', addDecimal)

const nButton = document.querySelector('.sign');
nButton.addEventListener('click', () => {
    firstOperand = Number(firstOperand);
    firstOperand -= (firstOperand * 2);
    firstOperand = firstOperand.toString();
    currentDisplayNumber.textContent = firstOperand;
});

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    if(firstOperand != "" && secondOperand != ""){
        compute();
    }
});

const cButton = document.querySelector('.clear');
cButton.addEventListener('click', clear);

numberButtons.forEach((button) => 
    button.addEventListener('click', (e) => {
        appendNumber(e.target.textContent);
    })
);

function appendNumber(number){
    if(secondOperand !== "" && firstOperand !== "" && operator === ""){
        secondOperand = "";
        currentDisplayNumber.textContent = firstOperand;
    }
    if (firstOperand.length <= 11) {
        firstOperand += number;
        currentDisplayNumber.textContent = firstOperand;
    }
}

operatorButton.forEach((button) => 
    button.addEventListener('click', (e) =>{
        handleOperator(e.target.textContent);
    })
);

function handleOperator(op){
    if(secondOperand === ""){
        secondOperand = firstOperand;
        operatorCheck(op)
    }else if  (firstOperand === ""){
        operatorCheck(op);
    }else{
        compute();
        operator = op;
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = secondOperand + " " + operator;
    }
}

function operatorCheck(text){
    operator = text;
    previousDisplayNumber.textContent = secondOperand + " " + operator;
    currentDisplayNumber.textContent = "0";
    firstOperand = "";
}

function compute(){
    secondOperand = Number(secondOperand);
    firstOperand = Number(firstOperand);

    if (operator === "+"){
        secondOperand += firstOperand;
    }else if(operator === "-"){
        secondOperand -= firstOperand;
    }else if(operator === "x"){
        secondOperand *= firstOperand;
    }else if(operator === "/") {
        if(firstOperand <= 0){
            secondOperand = "err";
            displayResults();
            return;
        }
        secondOperand /= firstOperand;
    }else if(operator === "%"){
        secondOperand *= (firstOperand/100);
    }

    secondOperand = roundNumber(secondOperand);
    secondOperand = secondOperand.toString();
    displayResults();
}

function roundNumber(num){
    return Math.round(num * 100000) / 100000;
}

function displayResults(){
    if(secondOperand.length <= 11){
        currentDisplayNumber.textContent = secondOperand;
    }else{
        currentDisplayNumber.textContent = secondOperand.slice(0,11) + "..."
    }
    previousDisplayNumber.textContent ="";
    operator = '';
    firstOperand = '';
}

function clear(){
    firstOperand = "";
    secondOperand = "";
    operator = ""
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

function addDecimal(){
    if(!firstOperand.includes(".")){
        firstOperand += ".";
        currentDisplayNumber.textContent = firstOperand;
    }
}



