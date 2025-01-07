import { getJSON, sendJSON } from "./helpers.js";
import { API_URL, MAX_PER_PAGE, KEY } from "./config.js";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    maxPerPage: MAX_PER_PAGE,
  },
  bookmarks: [],
  mealPlans: [],
};

export const loadRecipe = async (id) => {
  //this function will change our state obj
  //1. Load the data/recipe
  // Cek jika ada status bookmark di localStorage atau state.bookmarks
  const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const isBookmarked = savedBookmarks.some((item) => item.id === id);

  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
      bookmark: isBookmarked,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const loadSearchResult = async (searchValue) => {
  try {
    const data = await getJSON(`${API_URL}?search=${searchValue}`);
    state.search.query = searchValue;
    state.search.results = data.data.recipes;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateRecipe = (newServing) => {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * (newServing / state.recipe.servings);
  });
  state.recipe.servings = newServing;
};

export const paginationResult = () => {
  let newArrPagination = [];
  let maxLength = Math.ceil(
    state.search.results.length / state.search.maxPerPage
  );
  for (let i = 0; i < maxLength; i++) {
    newArrPagination.push(
      state.search.results.slice(
        i * state.search.maxPerPage,
        (i + 1) * state.search.maxPerPage
      )
    );
  }
  return { newArrPagination, maxLength };
};

const persistBookmark = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const persistMealPlan = () => {
  localStorage.setItem("mealPlans", JSON.stringify(state.mealPlans));
};

export const addBookmark = (recipe) => {
  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;
  state.bookmarks.push(recipe);

  persistBookmark();

  alert(`Recipe with id ${recipe.id} successfully bookmarked!`);
};

export const deleteBookmark = (recipe) => {
  //misal index 2
  const idToDelete = state.bookmarks.findIndex(
    (bookmarkRecipe) => bookmarkRecipe.id === recipe.id
  );

  if (idToDelete !== -1) {
    state.bookmarks.splice(idToDelete, 1); // Hapus elemen di indeks `idToDelete`
  }
  if (recipe.id === state.recipe.id) state.recipe.bookmark = false;

  persistBookmark();

  alert(`Recipe with id ${recipe.id} successfully unbookmarked ⚠!`);
};

export const addMealPlan = (recipe, dateValue) => {
  state.mealPlans.push({
    mealPlanID: recipe.id,
    mealPlanName: recipe.title,
    mealPlanServings: recipe.servings,
    mealPlanAssignDate: dateValue,
  });
  persistMealPlan();
  alert("Success added a new meal plan 🍔😋");
};

export const loadMealPlans = () => {
  const savedBookmarks = JSON.parse(localStorage.getItem("mealPlans")) || [];
  return savedBookmarks;
};

export const uploadRecipe = async (newRecipeData) => {
  try {
    const data = Object.entries(newRecipeData);
    console.log(newRecipeData);
    console.log(data);
    const ingredients = data
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",");
        if (ingArr.length !== 3) throw new Error("Wrong format input!!");
        const [quantity, unit, desc] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, desc };
      });
    console.log(ingredients);

    const recipe = {
      title: newRecipeData.title,
      source_url: newRecipeData["source-url"],
      image_url: newRecipeData["image-url"],
      publisher: newRecipeData.publisher,
      cooking_time: +newRecipeData["prep-time"],
      servings: +newRecipeData.servings,
      ingredients: ingredients,
    };
    console.log(recipe);
    const dataSend = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log(dataSend);
  } catch (err) {
    throw err;
  }
};
