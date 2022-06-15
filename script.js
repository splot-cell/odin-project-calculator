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
                result = add(Number(this.firstOperand), Number(this.secondOperand));
                break;
            case "subtract":
                result = subtract(Number(this.firstOperand), Number(this.secondOperand));
                break;
            case "multiply":
                result = multiply(Number(this.firstOperand), Number(this.secondOperand));
                break;
            case "divide":
                result = divide(Number(this.firstOperand), Number(this.secondOperand));
                break;
        }
        this.updateDisplay(result);
        this.firstOperand = result;
        this.operator = null;
        this.secondOperand = null;
    },

    operatorPressed(operator) {
        if (this.operator && this.secondOperand) {
            this.operate();
        }
        if (this.firstOperand) {
            this.operator = operator;
        }
    },

    appendDigit(currentValue, digit) {
        if (currentValue) {
            return currentValue + digit;
        } else {
            return digit;
        }
    },

    digitPressed(digit) {
        if (!this.operator) {
           this.firstOperand = this.appendDigit(this.firstOperand, digit);
        } else {
            this.secondOperand = this.appendDigit(this.secondOperand, digit);
        }
    },
};

function setup() {
    document.querySelectorAll(".operator").forEach( button => {
        button.addEventListener("click", (e) => Calculator.operatorPressed(e.target.id));
    });

    document.getElementById("equals").addEventListener("click", () => Calculator.operate());

    document.querySelectorAll(".digit").forEach( digit => digit.addEventListener("click", (e) => Calculator.digitPressed(e.target.textContent)));
};

setup();