import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  parentElement = document.querySelector('.pagination');

  generateMarkup() {
    const curr = this.data.page;
    const pageNum = Math.ceil(
      this.data.results.length / this.data.resultPerPage
    );

    //  1)  First  page , with other pages
    if (curr === 1 && pageNum > 1) {
      return this.nextBtn(curr);
    }

    //  2)  Middle Page
    if (curr < pageNum) {
      return [this.nextBtn(curr), this.prevBtn(curr)].join(``);
    }

    //  3)  Last   Page
    if (curr > 1 && pageNum === curr) {
      return this.prevBtn(curr);
    }

    //  4)  First  page , WITH NO other pages
    return ``;
  }

  prevBtn(curr) {
    return `
    <button data-goto="${curr - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curr - 1}</span>
    </button>
    `;
  }

  nextBtn(curr) {
    return `
    <button data-goto="${curr + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${curr + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  addHandlerBtn(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
