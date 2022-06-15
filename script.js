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
    firstOperand: null,
    secondOperand: null,
    operator: null,

    reset() {
        this.firstOperand = null;
        this.operator = null;
        this.secondOperand = null;
        this.updateDisplay(0);
    },
   
    updateDisplay(result) {
        this.display.textContent = result.toString().slice(0, 12);
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
        if (this.secondOperand) { // only need to check secondOperand?
            this.operate();
        }
        if (this.firstOperand) {
            this.operator = operator;
        }
    },

    equalsPressed() {
        if (this.secondOperand) { // only need to check secondOperand?
            this.operate();
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
           this.updateDisplay(this.firstOperand);
        } else {
            this.secondOperand = this.appendDigit(this.secondOperand, digit);
            this.updateDisplay(this.secondOperand);
        }
    },
};

function setup() {
    document.querySelectorAll(".operator").forEach( button => {
        button.addEventListener("click", (e) => Calculator.operatorPressed(e.target.id));
    });

    document.getElementById("equals").addEventListener("click", () => Calculator.equalsPressed());

    document.querySelectorAll(".digit").forEach( digit => digit.addEventListener("click", (e) => Calculator.digitPressed(e.target.textContent)));

    document.getElementById("clear").addEventListener("click", () => Calculator.reset());
};

setup();