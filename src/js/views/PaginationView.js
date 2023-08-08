import view from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const GoToPage = +btn.dataset.goto;
      handler(GoToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const NoOfPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // Page 1, and there are other pages also
    if (curPage === 1 && NoOfPage > 1) {
      return ` <button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // Last Page
    if (curPage === NoOfPage && NoOfPage > 1) {
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }

    // Pages other than first and last
    if (curPage !== 1 && curPage < NoOfPage) {
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>

      <button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span> Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // // Page 1 and  no other pages
    return '';
  }
}

export default new PaginationView();
