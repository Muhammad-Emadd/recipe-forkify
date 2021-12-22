import icons from 'url:../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
  parentElement = document.querySelector('.upload');
  overlay = document.querySelector('.overlay');
  windowAddRecipe = document.querySelector('.add-recipe-window');
  btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  btnCloseWindow = document.querySelector('.btn--close-modal');
  btnUploadRecipe = document.querySelector('.btn upload__btn');
  message = `Recipe was successfully uploaded 🎉🎊`;

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  toggleWindow() {
    this.windowAddRecipe.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this.btnAddRecipe.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerHideWindow() {
    this.btnCloseWindow.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  generateMarkup() {}
}

export default new AddRecipeView();
