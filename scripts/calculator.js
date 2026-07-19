let currentNum = 0; // current number being updated: num0 or num1
let num0 = num1 = 0; // values of the 2 numbers to operate on
let operator = null; 

const OPERATORS = {
    "buttonDivide": "OPERATOR_DIVIDE",
    "buttonTimes": "OPERATOR_MULTIPLY",
    "buttonMinus": "OPERATOR_SUBTRACT",
    "buttonPlus": "OPERATOR_ADD"
}

// basic math operators
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // TODO: rounding/significant digits
    return a / b
}

function operate(a, b, operator) {
    /**
     * Calculates [a] [operator] [b].
     * 
     * @method operate
     * @param {String} a First number to operate on
     * @param {String} b Second number to operate on
     * @return {Number} Returns the value of the operation
     */
    switch (operator) {
        case "OPERATOR_ADD":
            return add(a, b);
        case "OPERATOR_SUBTRACT":
            return subtract(a, b);
        case "OPERATOR_MULTIPLY":
            return multiply(a, b);
        case "OPERATOR_DIVIDE":
            return divide(a, b);
    }
}

const display = document.querySelector(".display p");
const buttons = document.querySelectorAll(".calc-buttons");

function addToDisplay(text) {
    display.textContent = display.textContent + text;
}

function handleDigitBtn(btnText) {
    /**
     * Callback function for digit button press. Updates either num0 or num1 
     * based on the value of currentNum. Displays the updated number in the 
     * calculator console.
     * 
     * @method handleDigitBtn
     * @param {String} btnText Text content of the button that was pressed
     */
    let digit = parseInt(btnText);
    
    if (currentNum == 0) num0 = (num0 * 10) + digit;
    else num1 = (num1 * 10) + digit;

    addToDisplay(digit);
}

function handleOpBtn(btn) {
    /**
     * Callback function for operator button presses. Operators can be AC, 
     * equals, add, subtract, times or divide.
     * 
     * @method handleOpBtn
     * @param {Element} btn The button node that was clicked
     */
    const btnId = btn.getAttribute("id");

    switch (btnId) {
        case "buttonAC":
            // reset globals
            currentNum = 0;
            num0 = num1 = 0;
            operator = null;

            // clear text
            display.textContent = "";
            break;
        case "buttonEquals":
            // get result
            let result = operate(num0, num1, operator);
            display.textContent = result;

            // reset globals
            currentNum = 0;
            num0 = num1 = 0;
            operator = null;

            break;
        default:
            operator = OPERATORS[btnId];
            addToDisplay(` ${btn.textContent} `);

            // swap current num being updated
            currentNum = !currentNum;
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-digit")) {
            // digit button pressed
            handleDigitBtn(e.target.textContent);
        } else if (e.target.classList.contains("btn-op")) {
            // operator button pressed
            handleOpBtn(e.target);
        }
    })
})
