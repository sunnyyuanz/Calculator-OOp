//a button is to have a value, when click it, it brings out the value.

export default class Button {
  constructor(row, rowValue) {
    this.row = row;
    this.rowValue = rowValue;
    this.render();
  }
  render() {
    this.rowValue.map((value) => {
      const button = document.createElement('button');
      button.innerHTML = value;
      button.classList.add('calc-button');
      this.row.appendChild(button);
    });
  }
}
