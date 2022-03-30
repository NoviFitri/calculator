const numbersBtn = document.querySelectorAll(".number")
const currentDisplay = document.querySelector(".current")
const prevDisplay = document.querySelector('.prev')
const operatorsBtn = document.querySelectorAll(".operator")
const equalsBtn = document.querySelector('.equals')
const clearBtn = document.querySelector('.all-clear')
const decimalBtn = document.querySelector('.decimal')
const deleteBtn = document.querySelector('.delete')
const persenBtn = document.querySelector('.persen')
const positif_negatifBtn = document.querySelector('.positif-negatif')

let prevNumber = ''
let calculatorOperator = ''
let currentNumber = '0'

positif_negatifBtn.addEventListener('click', ()=>{
    makeNegative()
    updateDisplay(currentNumber)
})
persenBtn.addEventListener('click', ()=>{
    persentase()
    updateDisplay(currentNumber)
})
numbersBtn.forEach((number)=>{
    number.addEventListener("click", (event)=>{
        inputNumber(event.target.value)
        updateDisplay(currentNumber)
    })
})

operatorsBtn.forEach((operator)=>{
    operator.addEventListener('click', (event)=>{
        inputOperator(event.target.value)
        updateDisplay(currentNumber)
    })
})

equalsBtn.addEventListener('click', ()=>{
    calculate()
    updateDisplay(currentNumber)
})

clearBtn.addEventListener('click', ()=>{
    clearAll()
    updateDisplay(currentNumber)
})
deleteBtn.addEventListener('click', ()=>{
    deleteNumber()
    updateDisplay(currentNumber)
})
decimalBtn.addEventListener('click', (event)=>{
    inputDecimal(event.target.value)
    updateDisplay(currentNumber)
})  

const updateDisplay = (number)=>{
    prevDisplay.innerText = prevNumber
    currentDisplay.innerText = number
    if(calculatorOperator != ''){
        prevDisplay.innerText = `${prevNumber} ${calculatorOperator}`
    }
}

const inputNumber = (number)=>{
    if(currentNumber === '0' || currentNumber === "-0"){
        currentNumber = number
    }else{
        currentNumber += number
    }
}
const inputOperator = (operator)=>{
    if(currentNumber === '') return
    if(prevNumber !== ''){
        calculate()
    }
    calculatorOperator = operator
    prevNumber = currentNumber
    currentNumber = ''
}
const calculate = ()=>{
    let result = ''
    let a = parseFloat(prevNumber)
    let b = parseFloat(currentNumber)
    if(isNaN(a) || isNaN(b)) return

    switch(calculatorOperator){
        case "+":
            result = a + b
            break
        case "-":
            result = a - b
            break
        case "*":
            result = a * b
            break
        case "/":
            result = a / b
            break 
        default:
            break
    }

    currentNumber = result
    calculatorOperator = ''
    prevNumber = ''
}
const clearAll= ()=>{
    prevNumber = ''
    currentNumber = '0'
    calculatorOperator = ''
}
const inputDecimal = (dot)=>{
    if(currentNumber.includes('.')){
        return
    }
    currentNumber += dot
}
const deleteNumber = ()=>{
    currentNumber = currentNumber.slice(0,-1)
}
const persentase = ()=>{
    if(currentNumber == '0'){
        return
    }else{
        currentNumber = currentNumber / 100
    }
}
const makeNegative = ()=>{
    let val = []
    val = currentNumber.split("")
    if(val.length < 1) {
        return
    }
    else if(val[0] == "-"){
        val.shift()
    }else{
        val.unshift("-")
     
    }
    currentNumber = val.join("")
}