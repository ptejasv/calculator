OPERATOR_ADD = "+"
OPERATOR_SUBTRACT = "-"
OPERATOR_MULTIPLY = "*"
OPERATOR_DIVIDE = "/"

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
    switch (operator) {
        case OPERATOR_ADD:
            return add(a, b);
        case OPERATOR_SUBTRACT:
            return subtract(a, b);
        case OPERATOR_MULTIPLY:
            return multiply(a, b);
        case OPERATOR_DIVIDE:
            return divide(a, b);
    }
}
