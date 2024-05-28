// script.js
document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
  
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let resultDisplayed = false;
  
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const value = this.textContent;
  
        if (this.id === 'clear') {
          clearAll();
        } else if (this.id === 'backspace') {
          backspace();
        } else if (this.id === 'equals') {
          if (previousInput && currentInput && operator) {
            currentInput = calculate(previousInput, currentInput, operator);
            displayResult(currentInput);
            previousInput = '';
            operator = '';
          }
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(this.id)) {
          setOperator(value);
        } else {
          appendNumber(value);
        }
      });
    });
  
    function clearAll() {
      currentInput = '';
      previousInput = '';
      operator = '';
      display.textContent = '0';
    }
  
    function backspace() {
      if (resultDisplayed) {
        clearAll();
      } else {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
      }
    }
  
    function setOperator(op) {
      if (currentInput) {
        if (previousInput && operator) {
          previousInput = calculate(previousInput, currentInput, operator);
        } else {
          previousInput = currentInput;
        }
        operator = op;
        currentInput = '';
      }
    }
  
    function appendNumber(value) {
      if (resultDisplayed) {
        clearAll();
        resultDisplayed = false;
      }
  
      if (value === '.' && currentInput.includes('.')) return;
      currentInput += value;
      display.textContent = currentInput;
    }
  
    function calculate(a, b, op) {
      a = parseFloat(a);
      b = parseFloat(b);
      let result;
      switch (op) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '×':
          result = a * b;
          break;
        case '÷':
          result = b === 0 ? 'Error' : a / b;
          break;
        default:
          result = '';
      }
      return result.toString();
    }
  
    function displayResult(result) {
      if (result.length > 10) {
        result = parseFloat(result).toPrecision(10);
      }
      display.textContent = result;
      currentInput = result;
      resultDisplayed = true;
    }
  });
  