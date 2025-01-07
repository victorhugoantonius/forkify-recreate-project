import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".add-recipe-form");
  _overlayModal = document.querySelector(".add-recipe-modal");
  _closeBtn = document.querySelector(".close-btn");
  _openBtn = document.querySelector(".add-recipe-feature");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  _addHandlerShowWindow() {
    this._openBtn.addEventListener("click", () => {
      this._overlayModal.classList.toggle("hidden");
    });
  }
  _addHandlerCloseWindow() {
    this._closeBtn.addEventListener("click", () => {
      this._overlayModal.classList.add("hidden");
    });
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this._parentElement)]);
      //controlAddRecipe(data)
      handler(data);
    });
  }
}

export default new AddRecipeView();
