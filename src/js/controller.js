import { async } from 'regenerator-runtime';
import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import icons from 'url:../img/icons.svg';
import SearchView from './views/SearchView.js';
import ResultView from './views/ResultView.js';
import PaginationView from './views/PaginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
//const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

    // update results view to mark selected search result

    ResultView.update(model.getSearchReasultPage());
    //1. Loading Recipe

    await model.loadRecipe(id);

    //2. Rendering Recipe

    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError(`${err}`);
  }
};

const ControlSearchResult = async function () {
  try {
    ResultView.renderSpinner();

    // 1) Get Search Query
    const query = SearchView.getQuery();
    if (!query) return;
    // 2) Load Search  Results
    await model.LoadSearchRecipe(query);
    // 3) Render results
    //ResultView.render(model.state.search.results);

    ResultView.render(model.getSearchReasultPage());

    // 4) Render initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (GoToPage) {
  // 3) Render new results from next page

  ResultView.render(model.getSearchReasultPage(GoToPage));

  // 4) Render new pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // 1) Update the recipe serving(in state)
  model.UpdateServings(newServing);

  // 2) Update the recipe view
  //RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};
const init = function () {
  RecipeView.addHandlerRender(showRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  SearchView.addHandlerSearch(ControlSearchResult);
  PaginationView.addHandlerClick(controlPagination);
};
init();
//window.addEventListener('hashchange', showRecipe);
