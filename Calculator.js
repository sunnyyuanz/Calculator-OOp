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
    //buttonvalues here is matching with the values in each row.
    this.buttonValues = [
      ['C', '←', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '−'],
      ['1', '2', '3', '+'],
      ['0', '='],
    ];
    //entry function
    this.init();
  }

  handleSymbols(symbol) {
    switch (symbol) {
      case '=':
        if (this.previousOperation === null) {
          this.result;
        }
        //passing math engine a equation here previous number/result, previous operation symbol, current input number = new result.
        this.result = new MathEngine(
          this.result,
          this.previousOperation,
          this.screenValue
        ).result;
        //clear the previousOperation and be prepared for the next equation.
        this.previousOperation = null;
        //show the final result on screen
        this.screenValue = this.result;
        //clear the result for the next equation
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
        //save the previousOperation to wait for user click "=".
        this.previousOperation = symbol;
        //clear the screenValue to prepare for the new input number.
        this.screenValue = '0';
    }
  }

  printNumToScreen(numString) {
    if (this.screenValue === '0') {
      //without this condition check screenvalue will be shown 012343 when it's still defaultly '0'
      this.screenValue = numString;
    } else {
      this.screenValue += numString;
    }
  }

  //Determine the button value is a number or a symbol
  buttonClick(value) {
    if (isNaN(value)) {
      this.handleSymbols(value);
    } else {
      this.printNumToScreen(value);
    }
    //print the new number on the screen
    new Screen(this.screenValue);
  }

  //starting function
  init() {
    //this.row right now is a nodelist instead of an actual array, below code is a conversion to convert this.row to an array.
    const rows = Array.from(this.rows.children);
    //matching the buttonvalues here with specific rows.
    this.buttonValues.forEach((rowValue, index) => {
      let rowIndex = index;
      //passing the correct row and rowvalue here to Button component, then compose rows of button there.
      new Button(rows[rowIndex], rowValue);
    });
    //At this point the calculator buttons are all formed. Add event listener to the whole buttons section for event bubbling.
    this.rows.addEventListener('click', (event) =>
      this.buttonClick(event.target.innerText)
    );
  }
}
