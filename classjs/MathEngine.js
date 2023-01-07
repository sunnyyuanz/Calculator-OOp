export default class MathEngine {
  constructor(result, previousOperation, currentValue) {
    this.previousOperation = previousOperation;
    this.currentValue = currentValue;
    this.result = result;
    this.startEngine();
  }
  startEngine() {
    if (this.currentValue === 0) {
      return;
    }
    let currentNum = parseInt(this.currentValue);
    if (this.result === 0) {
      this.result = currentNum;
    } else {
      switch (this.previousOperation) {
        case '+':
          this.result += currentNum;
          break;
        case '×':
          this.result *= currentNum;
          break;
        case '−':
          this.result -= currentNum;
          break;
        case '÷':
          this.result /= currentNum;
          break;
      }
    }
    return this.result;
  }
}
