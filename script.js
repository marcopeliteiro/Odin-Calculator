function add(a,b){
    return (Number(a))+(Number(b));
}

function subtract(a,b){
    return (Number(a))-(-Number(b));
}

function multiply(a,b){
    return (Number(a))*(Number(b));
}

function divide(a,b){
    return (Number(a))/(Number(b));
}

function operate(operator,firstNumber,secondNumber){
    return operator(firstNumber,secondNumber);
}

let display = document.querySelector("p");
let digitsBtns = document.querySelectorAll("button.digit");
let operatorBtns = document.querySelectorAll("button.operator");

let buttons = Array.from(digitsBtns);
let operators = Array.from(operatorBtns);

let value;
let operator;

buttons.forEach(button => button.addEventListener("click", ()=>{
    value = display.textContent += button.innerText;
}));

operators.forEach(button => button.addEventListener("click", ()=>{
    operator = button.innerText;
    value = display.textContent += button.innerText;
}));

let equalBtn = document.querySelector("#equal");
let splitByOperators;

equalBtn.addEventListener("click",()=>{
    splitByOperators = value.split(/(?=[-+*\/])/);
    let firstValue = splitByOperators[0];
    let secondValue = splitByOperators[1];

    if(operator == '+'){
        value = operate(add,firstValue,secondValue);
        display.textContent = value;
        console.log(value);
    }
    if(operator == '-'){
        value = operate(subtract,firstValue,secondValue);
        display.textContent = value;
        console.log(value);
    }
    if(operator == '*'){
        value = operate(multiply,firstValue,secondValue);
        display.textContent = value;
        console.log(value);
    }
    if(operator == '/'){
        value = operate(divide,firstValue,secondValue);
        display.textContent = value;
        console.log(value);
    }

});

//clean "=" event listener 
//split by operators if it contains * ou /