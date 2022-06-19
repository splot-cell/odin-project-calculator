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
    currentInputOperand: "firstOperand",
    operator: null,
    allowNumericalInput: true,
    allowOperatorInput: true,
    allowDecimalInput: true,

    reset() {
        this.firstOperand = null;
        this.currentInputOperand = "firstOperand";
        this.operator = null;
        this.secondOperand = null;
        this.updateDisplay(0);
        this.allowNumericalInput = true;
        this.allowDecimalInput = true;
        this.allowOperatorInput = true;
    },
   
    updateDisplay(result) {
        this.display.textContent = result.toString().slice(0, 12);
        // Rounding in js can easily lead to errors. Simple truncation of the display seems like a better solution given the context of this app.
    },

    haltAllInput() {
        this.allowNumericalInput = false;
        this.allowDecimalInput = false;
        this.allowOperatorInput = false;
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
                if (+this.secondOperand === 0) {
                    result = "NOPE!";
                    this.haltAllInput();
                    break;
                }
                result = divide(Number(this.firstOperand), Number(this.secondOperand));
                break;
        }
        this.updateDisplay(result);

        this.firstOperand = result;
        this.operator = null;
        this.secondOperand = null;

        this.allowNumericalInput = false;
    },

    operatorPressed(operator) {
        if (!this.allowOperatorInput) {
            return;
        }
        
        if (this.secondOperand) {
            this.operate();
        }
        
        this.allowNumericalInput = true;
        this.allowDecimalInput = true;
        
        if (this.firstOperand) {
            this.operator = operator;
        }

        this.currentInputOperand = "secondOperand";
    },

    equalsPressed() {
        if (this.secondOperand) {
            this.operate();
            this.currentInputOperand = "firstOperand";
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
        if (!this.allowNumericalInput) {
            return;
        }

        if (digit === "." && !this.allowDecimalInput) {
            return;
        } else if (digit === ".") {
            this.allowDecimalInput = false;
        }

        this[this.currentInputOperand] = this.appendDigit(this[this.currentInputOperand], digit);
        this.updateDisplay(this[this.currentInputOperand]);
    },

    deletePressed() {
        if (!this.allowNumericalInput) {
            return;
        }

        if (!this[this.currentInputOperand]) {
            return;
        }

        let arr = this[this.currentInputOperand].split("");
        let lastChar = arr.pop();
        this[this.currentInputOperand] = arr.join("");

        if (lastChar === ".") {
            this.allowDecimalInput = true;
        }
        this.updateDisplay(this[this.currentInputOperand]);
    },

    plusMinusPressed() {
        if (!this[this.currentInputOperand]) {
            return;
        }
        let number = Number(this[this.currentInputOperand]);
        if (isNaN(number)) { // In case user has deleted input back to just "-" or "."
            return;
        }
        number *= -1;
        this[this.currentInputOperand] = number.toString();
        this.updateDisplay(this[this.currentInputOperand]);
    }
};

function keyboardEventHandler(e) {
    if (e.key >= 0 && e.key <= 9) { Calculator.digitPressed(e.key) };
    if (e.key === ".") { Calculator.digitPressed(e.key) };
    if (e.key === "+") { Calculator.operatorPressed("add") };
    if (e.key === "-") { Calculator.operatorPressed("subtract") };
    if (e.key === "*") { Calculator.operatorPressed("multiply") };
    if (e.key === "/") { Calculator.operatorPressed("divide") };
    if (e.key === "=" || e.key === "Enter") { Calculator.equalsPressed() };
    if (e.key === "Backspace") { Calculator.deletePressed() };
    if (e.key === "Clear") { Calculator.reset() };
    if (e.key === "±") { Calculator.plusMinusPressed() };
};

function setup() {
    document.querySelectorAll(".operator").forEach( button => {
        button.addEventListener("click", (e) => Calculator.operatorPressed(e.target.id));
    });

    document.getElementById("equals").addEventListener("click", () => Calculator.equalsPressed());

    document.querySelectorAll(".digit").forEach( digit => digit.addEventListener("click", (e) => Calculator.digitPressed(e.target.textContent)));

    document.getElementById("clear").addEventListener("click", () => Calculator.reset());

    document.getElementById("delete").addEventListener("click", () => Calculator.deletePressed());

    document.getElementById("plus-minus").addEventListener("click", () => Calculator.plusMinusPressed());

    document.addEventListener("keydown", keyboardEventHandler);
};

setup();