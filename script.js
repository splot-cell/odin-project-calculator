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
    return a / b;
}

const Calculator = {
    display: document.getElementById("display"),
    displayValue: display.textContent,
    firstOperand: null,
    secondOperand: null,
    operator: null,
    updateDisplay(result) {
        this.display.textContent = result;
        this.displayValue = result;
    },
    operate() {
        let result;
        switch (this.operator) {
            case "add":
                result = add(this.firstOperand, this.secondOperand);
                break;
            case "subtract":
                result = subtract(this.firstOperand, this.secondOperand);
                break;
            case "multiply":
                result = multiply(this.firstOperand, this.secondOperand);
                break;
            case "divide":
                result = divide(this.firstOperand, this.secondOperand);
                break;
        }
    }
};