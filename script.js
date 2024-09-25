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
let plusMinus = document.querySelector(".plusMinus");
let c = document.querySelector("#c");
let dot = document.querySelector("#dot");

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
        value = display.textContent =firstValue +' '+operator+' '+(-secondValue);
    }
    else if(splity[2] === ''){
        if(Number(firstValue)>0){
            value = display.textContent = '-'+firstValue;
        }
        else{
            firstValue= Math.abs(firstValue);
            value = display.textContent = firstValue.toString();
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
let valueTwo;
//função que apenas permite usar um operador caso exista um valor inicial e não permite duplicar o operador
operators.forEach(button => button.addEventListener("click", ()=>{
    if(value && operatorClickCount==0){
        operator = button.innerText;
        value = display.textContent += ' '+operator+' ';
        dotClickCount = 0;
        operatorClickCount=1;
}}));




let equalBtn = document.querySelector("#equal");
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
    let cra;
    let clear;

    function cray(){
       console.log("cray");
    };
    function empty(){
        return display.textContent="";
    };

    if(operator == '/'){
        if(secondValue == 0){
            setTimeout(cray(),5000);
            //clear=setTimeout(empty(),2000);
        }
        else{
        value = operate(divide,firstValue,secondValue);
        display.textContent = value;
        console.log(value);
    }
}
    
    operatorClickCount=0;

});


//clean "=" event listener 
//ver divisão por 0