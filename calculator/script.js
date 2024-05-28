document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');
  
  let currentInput = '';
  let operatorClicked = false;

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const value = this.textContent;

      if (value === 'C') {
        clear();
      } else if (value === '←') {
        backspace();
      } else if (value === '=') {
        calculate();
      } else if (value === '.') {
        if (!currentInput.includes('.')) {
          currentInput += value;
          display.textContent += value;
        }
      } else {
        if (isOperator(value)) {
          if (operatorClicked) {
            backspace();
          }
          operatorClicked = true;
        } else {
          operatorClicked = false;
        }
        if (display.textContent === '0') {
          display.textContent = '';
        }
        currentInput += value;
        display.textContent += value;
      }
    });
  });

  function clear() {
    currentInput = '';
    display.textContent = '0';
  }

  function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
  }

  function calculate() {
    try {
      const result = eval(currentInput.replace('×', '*').replace('÷', '/').replace('−', '-'));
      display.textContent = result;
      currentInput = result.toString();
    } catch (error) {
      display.textContent = 'Error';
      currentInput = '';
    }
  }

  function isOperator(value) {
    return value === '+' || value === '-' || value === '×' || value === '÷';
  }
});





