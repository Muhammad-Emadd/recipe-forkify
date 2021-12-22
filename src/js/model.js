import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, API_Key } from './config.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
    resultPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarksArr: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_Key}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarksArr.some(bookM => bookM.id === state.recipe.id))
      state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_Key}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const getSearchPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const newServingsData = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // new S / old S  =  new Ing / old Ing
    ing.quantity = (newServings * ing.quantity) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const presistBookmars = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarksArr));
};

export const addBookmark = function (recipe) {
  // Adding recipe to the BookMark Array
  state.bookmarksArr.push(recipe);

  // Mark Curr Recipe as Bookmarker
  if (recipe.id !== state.recipe.id) return;
  state.recipe.bookmark = true;

  presistBookmars();
};

export const deleteBookmark = function (id) {
  //  Deleting from the Bookmark Array in state
  const index = state.bookmarksArr.findIndex(el => el.id === id);
  state.bookmarksArr.splice(index, 1);

  // Mark Curr recipe as NOT bookmarked in state
  if (state.recipe.id === id) state.recipe.bookmark = false;

  presistBookmars();
};

const clearStorage = function () {
  localStorage.clear('bookmarks');
};

const init = function () {
  const storageBookmarks = localStorage.getItem('bookmarks');
  if (storageBookmarks) state.bookmarksArr = JSON.parse(storageBookmarks);
};
init();

export const uploadRecipe = async function (newRecie) {
  try {
    const ingredients = Object.entries(newRecie).filter(
      entries => entries[0].startsWith('ingredient') && entries[1] !== ''
    );

    const ingredientObj = ingredients.map(ing => {
      const ingredientArr = ing[1].split(',').map(el => el.trim());
      if (ingredientArr.length !== 3)
        throw new Error(
          "Wrong ingredients Format !  Please use the Correct Format seperating the ingredients with ',' a comma"
        );
      const [quantity, unit, description] = ingredientArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
    const recipe = {
      cooking_time: +newRecie.cookingTime,
      image_url: newRecie.image,
      ingredients: ingredientObj,
      publisher: newRecie.publisher,
      servings: +newRecie.servings,
      title: newRecie.title,
      source_url: newRecie.sourceUrl,
    };

    const data = await AJAX(`${API_URL}?key=${API_Key}`, recipe);

    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    // console.Error(err.message);
    throw err;
  }
};
