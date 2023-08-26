import PrivewView from './PreviewView';
import view from './View';
import icons from 'url:../../img/icons.svg';

class BookMarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks yet. Find a nice recipe and bookmark it:)';
  _Message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => PrivewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarksView();
