import icons from 'url:../../img/icons.svg';
import { async } from 'regenerator-runtime';

export default class View {
  data;

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this.message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data, childClass = false) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;
    const markup = this.generateMarkup();

    if (childClass) return markup;

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updatee(data) {
    this.data = data;

    const newMarkup = this.generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDom.querySelectorAll('*'));
    const oldElements = Array.from(this.parentElement.querySelectorAll(`*`));

    // updatee The DOM =>   TextContent  and   Attributes
    newElements.forEach((newEl, i) => {
      const oldEl = oldElements[i];

      //    1)  TextContent
      if (
        !newEl.isEqualNode(oldEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        oldEl.textContent = newEl.textContent;
      }

      //    2)  Attributes
      if (!newEl.isEqualNode(oldEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          oldEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this.parentElement.innerHTML = '';
  }
}
