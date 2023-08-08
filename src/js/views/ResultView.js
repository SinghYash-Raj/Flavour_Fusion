import view from './View';
import icons from 'url:../../img/icons.svg';

class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your search! Please try again :)';
  _Message = '';

  addHandlerClick(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupPrivew).slice(1).join('');
  }

  _generateMarkupPrivew(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
    <a class="preview__link ${
      result.id === id ? 'preview__link--active' : ''
    }" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
       
      </div>
    </a>
  </li>
    `;
  }
}

export default new ResultView();
