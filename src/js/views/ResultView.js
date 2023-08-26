import view from './View';
import PrivewView from './PreviewView';
import icons from 'url:../../img/icons.svg';

class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your search! Please try again :)';
  _Message = '';

  _generateMarkup() {
    return this._data.map(result => PrivewView.render(result, false)).join('');
  }
}

export default new ResultView();
