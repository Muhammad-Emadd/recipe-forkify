import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js'; // Child Class

class ResultView extends View {
  parentElement = document.querySelector('.results');
  errorMessage = `No recipes found for your query. Please try again!`;
  message = ``;
  generateMarkup() {
    return this.data.map(result => previewView.render(result, true)).join(``);
  }
}
export default new ResultView();
