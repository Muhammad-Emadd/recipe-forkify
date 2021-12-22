import icons from 'url:../../img/icons.svg';
import View from './view.js';
import previewView from './previewView.js'; // Child Class

class BookmarkView extends View {
  parentElement = document.querySelector('.bookmarks__list');
  errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it ;)`;
  message = ``;

  generateMarkup() {
    return this.data
      .map(bookmark => previewView.render(bookmark, true))
      .join(``);
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarkView();
