let firstOperand = '';
let secondOperand = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

window.addEventListener('keydown', handleKeyPress);

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

function handleKeyPress(e){
    e.preventDefault();
    if(e.key >= 0 && e.key <= 9){
        appendNumber(e.key);
    }
    if(e.key === "Enter" || (e.key === "=" && firstOperand != "" && secondOperand !="")){
        compute();
    }
    if(e.key ==="+" || e.key === "-" || e.key === "/"){
        handleOperator(e.key);
    }
    if(e.key === "*"){
        handleOperator("x");
    }
    if(e.key === "."){
        addDecimal();
    }
    if(e.key === "Backspace"){
        handleDelete();
    }
    if(e.key === "Escape"){
        clear();
    }
}

function handleDelete(){
    if( firstOperand != ""){
        firstOperand = firstOperand.slice(0,-1);
        currentDisplayNumber.textContent = firstOperand;
        if(firstOperand === ""){
            currentDisplayNumber.textContent = "";
        }
    }
    if(firstOperand === "" && secondOperand !== "" && operator === ""){
        secondOperand = secondOperand.slice(0, -1);
        currentDisplayNumber.textContent = secondOperand;
    }
}