import { mark } from "regenerator-runtime";
import View from "./View.js";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks-list");
  _errorMessage = "There is no bookmark recipe yet...";
  _generateMarkup() {
    console.log(this._data);
    const markup = `${this._data
      .map((item) => {
        return `<div class="bookmark-list" data-id='${item.id}'>
                <img src="${item.imageURL}" class="bookmark-img" />
                <div class="bookmark-recipe-info">
                    <p class="bookmark-recipe-name">${item.title}</p>
                    <h6 class="bookmark-recipe-publisher">${item.publisher}</h6>
                </div>
            `;
      })
      .join("")}`;
    console.log(markup);
    return markup;
  }
}

export default new BookmarkView();
