import view from './View';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _SuccessMessage = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overLay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overLay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overLay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. For example, this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form. Clicking on a link, prevent the link from following the URL.
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); // takes arrays of entries and convert it into object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
