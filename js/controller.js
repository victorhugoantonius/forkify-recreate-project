import "@fortawesome/fontawesome-free/css/all.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView.js";
import mealPlanView from "./views/mealPlanView.js";
import addMealPlanView from "./views/addMealPlanView.js";
import showMealPlanView from "./views/showMealPlanView.js";
import addRecipeView from "./views/addRecipeView.js";
import navModalView from "./views/navModalView.js";

if (module.hot) {
  module.hot.accept();
}

const showRecipe = async () => {
  try {
    //get the hash location
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    //render spinner
    recipeView.renderSpinner();

    //load the recipe / data
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //Render it to HTML
    recipeView.render(recipe);
    console.log("already rendered");
  } catch (err) {
    recipeView.renderError(err);
  }
};
const showPagination = (currPage = 1) => {
  //load the data after data avaiable within search
  const dataPag = model.paginationResult();
  //plot the view pagination button in pagination div html, perbarui DOM
  paginationView.generatePagination(currPage, dataPag.maxLength);
  console.log(currPage);
  console.log(Array.isArray(dataPag.newArrPagination[currPage - 1]));
  console.log(dataPag.newArrPagination[currPage - 1]);
  searchView.render(dataPag.newArrPagination[currPage - 1]);
};

const showSearchResult = async () => {
  try {
    //get search input value
    const value = searchView.getSearchValue();
    //get the state.search data
    await model.loadSearchResult(value);

    //pagination
    showPagination();
    console.log(model.state.search.results);
  } catch (err) {
    alert(err);
  }
};

const controlServing = (newServing) => {
  // update serving
  model.updateRecipe(newServing);

  //update render the dom
  recipeView.render(model.state.recipe);
};

const goToRecipeFunc = async (id) => {
  console.log(id);
  window.location.hash = id;

  //render new recipe with specific id
  await model.loadRecipe(id);
  const { recipe } = model.state;
  //Render it to HTML
  recipeView.render(recipe);
};

const controlBookmark = (isBookmarked) => {
  const { recipe } = model.state;
  if (!isBookmarked) model.addBookmark(recipe);
  if (isBookmarked) model.deleteBookmark(recipe);

  //update the DOM
  console.log(model.state.bookmarks);
  bookmarkView.render(model.state.bookmarks);
  recipeView.render(recipe);
};

const controlOpenMealPlan = () => {
  addMealPlanView.renderDataMealPlan(model.state.recipe);
  addMealPlanView.openAddMealPlan();
};

const controlAddMealPlan = (dateValue) => {
  //add to mealPlans arr in model
  model.addMealPlan(model.state.recipe, dateValue);
};

const controlShowMealPlan = () => {
  mealPlanView.openMealPlan();
  const mealPlanData = model.loadMealPlans();
  mealPlanView.renderAssignedMealPlan(mealPlanData);
};

const controlAddRecipe = async (newRecipeData) => {
  try {
    await model.uploadRecipe(newRecipeData);
  } catch (err) {
    alert(`${err} 💣💣💣`);
  }
};

//publisher subscriber
const init = () => {
  recipeView.addHandlerRender(showRecipe);
  recipeView.updateServing(controlServing);
  recipeView.changeBookmarkHandler(controlBookmark);
  // open meal plan
  recipeView.addMealPlanHandler(controlOpenMealPlan);
  searchView.addSearchHandler(showSearchResult);
  searchView.goToRecipe(goToRecipeFunc);
  paginationView.addPaginationHandler(showPagination);
  mealPlanView.renderCalenderMarkup();
  mealPlanView.changeMonth();
  mealPlanView.closeMealPlan();
  // submit a meal plan
  addMealPlanView.submitMealPlan(controlAddMealPlan);
  //show meal plan modal
  showMealPlanView.addShowMealPlanHandler(controlShowMealPlan);

  //add recipe
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
