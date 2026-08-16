let currentNum = 0; // current number being updated: nums[0] or nums[1]
let nums = [null, null, null]; // nums[2]: result of the previous calculation
let operator;

const OPERATORS = {
    "buttonDivide": "OPERATOR_DIVIDE",
    "buttonTimes": "OPERATOR_MULTIPLY",
    "buttonMinus": "OPERATOR_SUBTRACT",
    "buttonPlus": "OPERATOR_ADD"
}


// math logic
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
    if (b === 0) return "";
    return a / b;
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

function calculateResult() {
    let result; 

    if ((nums[0] !== null & nums[1] !== null) & operator !== null) {
        // both numbers and operator provided
        // get result rounded to 4 decimal places
        result = operate(nums[0], nums[1], operator);
        result = Math.round(result * 1e4) / 1e4;
    } else {
        // incomplete input
        result = nums[0];
    } 

    display.textContent = result;

    // set globals
    currentNum = 0;
    nums = [null, null, result]; // store result as nums[2]
    operator = null;
}


// UI functionality
const display = document.querySelector(".display p");
const buttons = document.querySelectorAll(".calc-buttons");

function handleDigitBtn(btnText) {
    /**
     * Callback function for digit button press. Updates either nums[0] or nums
     * [1] based on the value of currentNum. Displays the updated number in the 
     * calculator console.
     * 
     * @method handleDigitBtn
     * @param {String} btnText Text content of the button that was pressed
     */
    let digit = parseInt(btnText);

    // if there is an existing result with no operator, clear it
    if (nums[2]) {
        nums[2] = null;
        display.textContent = "";
    };
    
    nums[currentNum] = (nums[currentNum] * 10) + digit;
    display.textContent = display.textContent + digit;
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
            nums = [null, null, null];
            operator = null;

            // clear text
            display.textContent = "";
            break;
        case "buttonEquals":
            calculateResult();
            break;
        default:
            // other operator button pressed
            
            if (nums[0] !== null & nums[1] !== null) {
                // 2 numbers already entered
                // calculate result before proceeding
                calculateResult();
            }

            if (nums[2]) {
                // if there is a pre-existing result, use it as the first number
                nums[0] = nums[2];
                nums[2] = null;
            }

            operator = OPERATORS[btnId];
            display.textContent = display.textContent + ` ${btn.textContent} `;

            // swap current num being updated
            currentNum === 0 ? currentNum = 1 : currentNum = 0;
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
