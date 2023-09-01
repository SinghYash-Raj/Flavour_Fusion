import { async } from 'regenerator-runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import RecipeView from './views/RecipeView.js';
import icons from 'url:../img/icons.svg';
import SearchView from './views/SearchView.js';
import ResultView from './views/ResultView.js';
import PaginationView from './views/PaginationView.js';
import BookMarksView from './views/BookMarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addRecipeView from './views/addRecipeView.js';
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

    BookMarksView.update(model.state.bookmarks);
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

const controlAddBookmark = function () {
  //Add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // Update recipe
  RecipeView.update(model.state.recipe);

  // Render bookmarks
  BookMarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookMarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();
    ///Upload the new recipe data
    await model.UploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    RecipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderSuccessMessage();

    //Render bookmark view
    BookMarksView.render(model.state.bookmarks);

    //Change ID in url(hash change)
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form window
    setTimeout(function () {
      //addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  BookMarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(showRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(ControlSearchResult);
  PaginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
//window.addEventListener('hashchange', showRecipe);
