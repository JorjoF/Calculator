// Variables for math operations
let previousNumber = '';
let currentNumber = '';
let operator = '';

// Grab display from the dom
const currentDisplayNumber = document.querySelector('#currentNumber');
const previousDisplayNumber = document.querySelector('#previousNumber');

//Listen for keyboard input
window.addEventListener('keydown', handleKeyPress);

//Grab buttons from the dom
const operatorButton = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');
const nButton = document.querySelector('.sign');
const point = document.querySelector('.decimal');
const equal = document.querySelector('.equal');
const cButton = document.querySelector('.clear');

//Call diferent function depending on button pressed
point.addEventListener('click', addDecimal)

nButton.addEventListener('click', () => {
    handleDelete();
});

equal.addEventListener('click', () => {
    if(currentNumber != "" && previousNumber != ""){
        compute();
    }
});

cButton.addEventListener('click', clear);

numberButtons.forEach((button) => 
    button.addEventListener('click', (e) => {
        appendNumber(e.target.textContent);
    })
);

operatorButton.forEach((button) => 
    button.addEventListener('click', (e) =>{
        handleOperator(e.target.textContent);
    })
);

/*
Append the text content of current number button being pressed
to bottom part of the screen
*/
function appendNumber(number){
    if(previousNumber !== "" && currentNumber !== "" && operator === ""){
        previousNumber = "";
        currentDisplayNumber.textContent = currentNumber;
    }
    if (currentNumber.length <= 11) {
        currentNumber += number;
        currentDisplayNumber.textContent = currentNumber;
    }
}

/*
Figure out where to append the operator
*/
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

/*
Append the text context of current operator button
being pressed to current nuumber and move both 
to top part of the screen
*/
function operatorCheck(text){
    operator = text;
    previousDisplayNumber.textContent = previousNumber + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNumber = "";
}

/*
compute operation requestion by the user
*/
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

//round number to five decimal points
function roundNumber(num){
    return Math.round(num * 100000) / 100000;
}

//if full number excieds 11 ints then add ...
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

//Clear Screen
function clear(){
    currentNumber = "";
    previousNumber = "";
    operator = ""
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

//Adds decimal to end of number
function addDecimal(){
    if(!currentNumber.includes(".")){
        currentNumber += ".";
        currentDisplayNumber.textContent = currentNumber;
    }
}

//convert keyboard inputs to on screen buttons
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

//Delete last digit of number
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