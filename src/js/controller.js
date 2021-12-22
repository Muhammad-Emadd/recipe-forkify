import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { CLOSE_FORM_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
///////

const controlTheRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1) Rendering The Spinner  :
    recipeView.renderSpinner();

    // 2) updatee Results and Bookmarks to make it acitive in the DIV
    resultView.updatee(model.getSearchPage());
    bookmarksView.updatee(model.state.bookmarksArr);

    //  3) Loading Recipe From API :
    await model.loadRecipe(id);

    //  4) Rendering The Recipe :
    recipeView.render(model.state.recipe);

    //
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    //  1)  Get Query =>
    const query = searchView.getQuery();
    if (!query) return;

    //  2)  Get Search Data =>
    await model.loadSearchResults(query);

    //  3)  Render Data =>
    resultView.render(model.getSearchPage());

    //  4)  Render Paginations Buttons =>
    paginationView.render(model.state.search);

    //
  } catch (err) {
    console.error(err);
  }
};

const controlThePagination = function (goToPage) {
  //  1)  Render  NEW  Data =>
  resultView.render(model.getSearchPage(goToPage));

  //  2)  Render  NEW  Paginations Buttons =>
  paginationView.render(model.state.search);

  //
};

const controlServingsNumber = function (servNum) {
  // updatee Recipe Data  ( in state )
  model.newServingsData(servNum);

  // Udate Recipe View
  recipeView.updatee(model.state.recipe);
};

const controlAddingBookmark = function () {
  //    Add or Remove Bookmark
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //     Render Bookmark Button  and  bookmarksList
  recipeView.updatee(model.state.recipe);
  bookmarksView.render(model.state.bookmarksArr);

  //
};

const controlTheBookmarking = function () {
  bookmarksView.render(model.state.bookmarksArr);
};

const controlUploadingRecipe = async function (newRecipe) {
  try {
    //    Show Spinner
    addRecipeView.renderSpinner();

    //    Uploading Recipe
    await model.uploadRecipe(newRecipe);

    //    Render Recipe
    recipeView.render(model.state.recipe);

    //    Render Success Message
    addRecipeView.renderMessage();

    //    add the Uploaded recipe to Bookmark bar
    bookmarksView.render(model.state.bookmarksArr);

    //    Change the ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //    Close Form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_FORM_SEC * 1000);

    //
  } catch (err) {
    console.error(' 💥❗❕💥 ', err);
    addRecipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log('Welcome to my first big application! 🙋🏻');
};

///////

const init = function () {
  bookmarksView.addHandlerRender(controlTheBookmarking);
  recipeView.addHandlerRender(controlTheRecipe);
  recipeView.addHandlerServings(controlServingsNumber);
  recipeView.addHandlerBookmarking(controlAddingBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtn(controlThePagination);
  addRecipeView.addHandlerUpload(controlUploadingRecipe);
  newFeature();
};
init();
