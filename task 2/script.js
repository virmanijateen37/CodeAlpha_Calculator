 class Calculator {
            constructor(previousOperandTextElement, currentOperandTextElement) {
                this.previousOperandTextElement = previousOperandTextElement;
                this.currentOperandTextElement = currentOperandTextElement;
                this.clear();
            }

            clear() {
                this.currentOperand = '';
                this.previousOperand = '';
                this.operation = undefined;
                this.updateDisplay();
            }

            delete() {
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
                this.updateDisplay();
            }

            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                this.currentOperand = this.currentOperand.toString() + number.toString();
                this.updateDisplay();
            }

            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
                this.updateDisplay();
            }

            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);
                if (isNaN(prev) || isNaN(current)) return;

                switch (this.operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '×':
                        computation = prev * current;
                        break;
                    case '÷':
                        if (current === 0) {
                            alert('Cannot divide by zero!');
                            return;
                        }
                        computation = prev / current;
                        break;
                    default:
                        return;
                }
                this.currentOperand = computation;
                this.operation = undefined;
                this.previousOperand = '';
                this.updateDisplay();
            }

            getDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
                }
                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }

            updateDisplay() {
                if (this.currentOperand === '') {
                    this.currentOperandTextElement.innerText = '0';
                } else {
                    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
                }
                
                if (this.operation != null) {
                    this.previousOperandTextElement.innerText = 
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    this.previousOperandTextElement.innerText = '';
                }
            }
        }

        // Initialize calculator
        const previousOperandTextElement = document.getElementById('previous-operand');
        const currentOperandTextElement = document.getElementById('current-operand');
        const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

        // Visual feedback for button presses
        function addActiveClass(button) {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 150);
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            let button;

            if (key >= '0' && key <= '9') {
                calculator.appendNumber(key);
                button = document.querySelector(`button[onclick*="appendNumber('${key}')"]`);
            } else if (key === '.') {
                calculator.appendNumber('.');
                button = document.querySelector(`button[onclick*="appendNumber('.')"]`);
            } else if (key === '+') {
                calculator.chooseOperation('+');
                button = document.querySelector(`button[onclick*="chooseOperation('+')"]`);
            } else if (key === '-') {
                calculator.chooseOperation('-');
                button = document.querySelector(`button[onclick*="chooseOperation('-')"]`);
            } else if (key === '*') {
                calculator.chooseOperation('×');
                button = document.querySelector(`button[onclick*="chooseOperation('×')"]`);
            } else if (key === '/') {
                e.preventDefault();
                calculator.chooseOperation('÷');
                button = document.querySelector(`button[onclick*="chooseOperation('÷')"]`);
            } else if (key === 'Enter' || key === '=') {
                calculator.compute();
                button = document.querySelector('.equals');
            } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                calculator.clear();
                button = document.querySelector(`button[onclick*="clear()"]`);
            } else if (key === 'Backspace' || key.toLowerCase() === 'd') {
                calculator.delete();
                button = document.querySelector(`button[onclick*="delete()"]`);
            }

            if (button) {
                addActiveClass(button);
            }
        });

        // Add click feedback to all buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                addActiveClass(button);
            });
        });
   