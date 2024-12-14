const displayScreen = document.getElementById('display');
const calcCountElement = document.getElementById('calc-count');
const currentOperatorElement = document.getElementById('current-operator');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

let currentNumber = '';
let previousNumber = '';
let currentOperator = '';
let calculationCount = 0;

function updateDisplay(value) {
    displayScreen.value = value || '0';
}

function updateCalculationCount() {
    calculationCount++;
    calcCountElement.textContent = calculationCount;
}

function updateCurrentOperatorDisplay(operator) {
    currentOperatorElement.textContent = operator || '';
}

function handleNumberClick(number) {
    if (currentNumber.length < 15) {
        currentNumber += number;
        updateDisplay(currentNumber);
    }
}

function handleOperatorClick(operator) {
    // Case 1: If there is a current number (second number is entered)
    if (currentNumber) {
        if (previousNumber && currentOperator) {
            // Perform the calculation if there's a previous number and an operator
            previousNumber = calculateResult(previousNumber, currentNumber, currentOperator);
            updateDisplay(previousNumber);
        } else {
            // Otherwise, store the current number as the previous number
            previousNumber = currentNumber;
        }
        currentNumber = ''; // Reset current number after using it

        // Only update calculation count after entering the second number
        updateCalculationCount();
    }

    // Update the operator (regardless of calculation)
    currentOperator = operator === '−' ? '-' : operator;
    updateCurrentOperatorDisplay(currentOperator);
}
function handleEqualClick() {
    if (previousNumber && currentNumber && currentOperator) {
        // Perform the calculation if both numbers and operator are available
        const result = calculateResult(previousNumber, currentNumber, currentOperator);
        updateDisplay(result);

        // Reset the state for the next operation
        previousNumber = result;
        currentNumber = '';
        currentOperator = '';
        updateCurrentOperatorDisplay('');
    }
    // **Do not increment calc-count when the equals button is clicked**.
}

function calculateResult(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) return 'Error';

    switch (operator) {
        case '+': return (num1 + num2).toString();
        case '-': return (num1 - num2).toString();
        case '×': return (num1 * num2).toString();
        case '÷': return num2 !== 0 ? (num1 / num2).toString() : 'Error';
        default: return 'Error';
    }
}

function handleClearClick() {
    currentNumber = '';
    previousNumber = '';
    currentOperator = '';
    calculationCount = 0;
    updateDisplay('');
    calcCountElement.textContent = calculationCount;
    updateCurrentOperatorDisplay('');
}

function handleBackspaceClick() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay(currentNumber);
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => handleNumberClick(button.textContent));
});

operatorButtons.forEach(button => {
    if (button.id === 'equals') {
        button.addEventListener('click', handleEqualClick);
    } else if (button.id === 'clear') {
        button.addEventListener('click', handleClearClick);
    } else if (button.id === 'backspace') {
        button.addEventListener('click', handleBackspaceClick);
    } else {
        button.addEventListener('click', () => handleOperatorClick(button.textContent));
    }
});

updateDisplay('');
updateCurrentOperatorDisplay('');