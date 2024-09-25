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

//selectors
let display = document.querySelector("p");
let digitsBtns = document.querySelectorAll("button.digit");
let operatorBtns = document.querySelectorAll("button.operator");
let plusMinus = document.querySelector("#plusMinus");
let c = document.querySelector("#c");
let dot = document.querySelector("#dot");
let equalBtn = document.querySelector("#equal");


//transformar querySelectorAll em arrays
let digits = Array.from(digitsBtns);
let operators = Array.from(operatorBtns);

let value;
let operator;
let operatorClickCount = 0;

//event listeners
c.addEventListener("click",()=>{
    value=0;
    display.textContent ='';
    operatorClickCount=0;
})

digits.forEach(button => button.addEventListener("click", ()=>{
    value = display.textContent += button.innerText;
}));

let dotClickCount = 0;
dot.addEventListener("click",()=>{
    if(value && dotClickCount==0){
    value = display.textContent = value + '.';
    dotClickCount =1;
    }
});


plusMinus.addEventListener("click",()=>{
    splity = value.toString().split(" ");
    let firstValue=splity[0];
    let secondValue=splity[2];
    
    
    if(splity.length>1){
        if(splity[2] === ''){
            if(Number(firstValue)>0){
                value = display.textContent = '-'+firstValue;
            }
            else{
                firstValue= Math.abs(firstValue);
                value = display.textContent = firstValue.toString();
            }
        }
        else{
        value = display.textContent =firstValue +' '+operator+' '+(-secondValue);
        }
        operatorClickCount=0;
    }
    else{
        if(Number(firstValue)>0){
            value = display.textContent = '-'+firstValue;
        }
        else{
            firstValue= Math.abs(firstValue);
            value = display.textContent = firstValue.toString();
        }
    }
});

//função que apenas permite usar um operador caso exista um valor inicial e não permite duplicar o operador
operators.forEach(button => button.addEventListener("click", ()=>{
    if(value && operatorClickCount==0){
        operator = button.innerText;
        value = display.textContent += ' '+operator+' ';
        dotClickCount = 0;
        operatorClickCount=1;
}}));




// sleep time expects milliseconds~

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function checkOperator(operator,firstValue,secondValue){
    switch(operator){
        case '+':
            value = operate(add,firstValue,secondValue);
            display.textContent = value;
            break;
        case '-':
            value = operate(subtract,firstValue,secondValue);
            display.textContent = value;
            break;
        case '*':
            value = operate(multiply,firstValue,secondValue);
            display.textContent = value;
            break;
        case '/':
            if(secondValue == 0){
                display.textContent="Bad math :/";
                sleep(2000).then(() => {
                    display.textContent="";
                });
            }
            else{
            value = operate(divide,firstValue,secondValue);
            display.textContent = value;
            }
            break;
        default:
            display.textContent="";
            
    }
}

let splitByOperators;
equalBtn.addEventListener("click",()=>{
    splitByOperators = value.split(" ");
    let firstValue = splitByOperators[0];
    let secondValue = splitByOperators[2];
    
    //limpar segundo valor se tiver * ou /
    if(secondValue.includes("*")){
        secondValue = secondValue.replace("*","");
    }
    if(secondValue.includes("/")){
        secondValue = secondValue.replace("/","");
    }

    checkOperator(operator,firstValue,secondValue);

    operatorClickCount=0;

});


