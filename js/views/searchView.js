import View from "./View.js";

class searchView extends View {
  _formParentElement = document.querySelector(".input-search-form");
  _parentElement = document.querySelector(".recipe-list");
  getSearchValue() {
    const form = this._formParentElement.querySelector("input").value;
    return form;
  }

  resetInputValue() {
    this._formParentElement.querySelector("input").value = "";
  }

  goToRecipe(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const el = e.target.closest(".each-recipe");
      handler(el.dataset.id);
    });
  }

  addSearchHandler(handler) {
    this._formParentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
      this.resetInputValue();
    });
  }

  _generateMarkup() {
    const markup = `${this._data
      .map((item) => {
        return `<article class="each-recipe" data-id='${item.id}'>
          <img src="${item.image_url}" class="recipe-img" />
          <div class="each-recipe-info">
            <p class="each-recipe-name">${item.title}</p>
            <h6 class="each-recipe-publisher">${item.publisher}</h6>
          </div>
        </article>`;
      })
      .join("")}`;
    return markup;
  }
}

export default new searchView();
