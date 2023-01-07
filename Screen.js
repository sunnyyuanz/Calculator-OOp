//display the output
export default class Screen {
  constructor(screenValue) {
    this.screenValue = screenValue;
    this.render();
  }
  render() {
    let screen = document.querySelector('.screen');
    if (this.result) {
      screen.innerHTML = this.result.result;
    } else if (this.screenValue) {
      screen.innerHTML = this.screenValue;
    }
  }
}
