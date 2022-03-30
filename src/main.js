let previousNumber = '';
let currentNumber = '';
let operator = '';

const currentDisplayNumber = document.querySelector('#currentNumber');
const previousDisplayNumber = document.querySelector('#previousNumber');

window.addEventListener('keydown', handleKeyPress);

const operatorButton = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');

const point = document.querySelector('.decimal');
point.addEventListener('click', addDecimal)

const nButton = document.querySelector('.sign');
nButton.addEventListener('click', () => {
    handleDelete();
});

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    if(currentNumber != "" && previousNumber != ""){
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
    if(previousNumber !== "" && previousNumber !== "" && operator === ""){
        previousNumber = "";
        currentDisplayNumber.textContent = currentNumber;
    }
    if (currentNumber.length <= 11) {
        currentNumber += number;
        currentDisplayNumber.textContent = currentNumber;
    }
}

operatorButton.forEach((button) => 
    button.addEventListener('click', (e) =>{
        handleOperator(e.target.textContent);
    })
);

function handleOperator(op){
    if(previousNumber === ""){
        previousNumber = currentNumber;
        operatorCheck(op)
    }else if  (currentNumber === ""){
        operatorCheck(op);
    }else{
        compute();
        operator = op;
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = previousNumber + " " + operator;
    }
}

function operatorCheck(text){
    operator = text;
    previousDisplayNumber.textContent = previousNumber + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNumber = "";
}

function compute(){
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    if (operator === "+"){
        previousNumber += currentNumber;
    }else if(operator === "-"){
        previousNumber -= currentNumber;
    }else if(operator === "x"){
        previousNumber *= currentNumber;
    }else if(operator === "/") {
        if(currentNumber <= 0){
            previousNumber = "err";
            displayResults();
            return;
        }
        previousNumber /= currentNumber;
    }else if(operator === "%"){
        previousNumber *= (currentNumber/100);
    }

    previousNumber = roundNumber(previousNumber);
    previousNumber = previousNumber.toString();
    displayResults();
}

function roundNumber(num){
    return Math.round(num * 100000) / 100000;
}

function displayResults(){
    if(previousNumber.length <= 11){
        currentDisplayNumber.textContent = previousNumber;
    }else{
        currentDisplayNumber.textContent = previousNumber.slice(0,11) + "..."
    }
    previousDisplayNumber.textContent ="";
    operator = '';
    currentNumber = '';
}

function clear(){
    currentNumber = "";
    previousNumber = "";
    operator = ""
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

function addDecimal(){
    if(!currentNumber.includes(".")){
        currentNumber += ".";
        currentDisplayNumber.textContent = currentNumber;
    }
}

function handleKeyPress(e){
    e.preventDefault();
    if(e.key >= 0 && e.key <= 9){
        appendNumber(e.key);
    }
    if(e.key === "Enter" || (e.key === "=" && currentNumber != "" && previousNumber !="")){
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
    if( currentNumber != ""){
        currentNumber = currentNumber.slice(0,-1);
        currentDisplayNumber.textContent = currentNumber;
        if(currentNumber === ""){
            currentDisplayNumber.textContent = "";
        }
    }
    if(currentNumber === "" && previousNumber !== "" && operator === ""){
        previousNumber = previousNumber.slice(0, -1);
        currentDisplayNumber.textContent = previousNumber;
    }
}