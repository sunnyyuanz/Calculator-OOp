//build up a calculator frame from other objects.

//Start point
import Screen from './Screen.js';
import Button from './Button.js';
import MathEngine from './MathEngine.js';

export default class Calculator {
  constructor() {
    this.rows = document.querySelector('.calc-rows');
    this.screenValue = '0';
    this.result = 0;
    this.previousOperation = null;
    this.buttonValues = [
      ['C', '←', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '−'],
      ['1', '2', '3', '+'],
      ['0', '='],
    ];
    this.init();
  }

  handleSymbols(symbol) {
    switch (symbol) {
      case '=':
        if (this.previousOperation === null) {
          this.result;
        }
        this.result = new MathEngine(
          this.result,
          this.previousOperation,
          this.screenValue
        ).result;
        this.previousOperation = null;
        this.screenValue = this.result;
        this.result = 0;
        break;
      case 'C':
        this.screenValue = '0';
        this.result = 0;
        break;
      case '←':
        if (this.screenValue.length === 1) {
          this.screenValue = '0';
        } else {
          this.screenValue = this.screenValue.substring(
            0,
            this.screenValue.length - 1
          );
        }
        break;
      default:
        this.result = new MathEngine(
          this.result,
          this.previousOperation,
          this.screenValue
        ).result;
        this.previousOperation = symbol;
        this.screenValue = '0';
    }
  }

  printNumToScreen(numString) {
    if (this.screenValue === '0') {
      this.screenValue = numString;
    } else {
      this.screenValue += numString;
    }
  }

  buttonClick(value) {
    //save previous operation before re-assign current operation.
    if (isNaN(value)) {
      this.handleSymbols(value);
    } else {
      this.printNumToScreen(value);
    }
    new Screen(this.screenValue);
  }

  init() {
    const rows = Array.from(this.rows.children);
    this.buttonValues.forEach((rowValue, index) => {
      let rowIndex = index;
      new Button(rows[rowIndex], rowValue);
    });
    this.rows.addEventListener('click', (event) =>
      this.buttonClick(event.target.innerText)
    );
  }
}
