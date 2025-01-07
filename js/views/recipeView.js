import { Fraction } from "fractional";
import View from "./View.js";
class RecipeView extends View {
  _parentElement = document.querySelector(".recipe-container");
  renderError(errorMessage) {
    const markup = `<div class='error-render'>
      <p>${errorMessage} 💣💣💣💣</p>
    </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  updateServing(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const el = e.target.closest("[data-serving]");
      if (!el) return;
      const newServing = +el.dataset.serving;
      handler(newServing);
    });
  }

  changeBookmarkHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const el = e.target.closest(".bookmark-icon");
      if (!el) return;
      const isBookmarked = el.classList.contains("pressed");
      handler(isBookmarked);
    });
  }

  addMealPlanHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const el = e.target.closest(".calender-icon");
      if (!el) return;
      handler();
    });
  }

  _generateMarkup() {
    return `<div class="recipe-container-content" id="${this._data.id}">
          <section class="recipe-header-img">
            <img src="${this._data.imageURL}" alt="" />
            <div class="recipe-header">
              <p>${this._data.title}</p>
            </div>
          </section>
          <section class="recipe-nav">
           <!--  -->
           <div class="recipe-nav-left">
             <div class="recipe-nav-wait">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                 <path
                   d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                 />
               </svg>
               120 Minutes
             </div>
             <div class="recipe-nav-serving">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                 <path
                   d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                 />
               </svg>
               ${this._data.servings} Servings
             </div>
             <div class="recipe-nav-right">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512"
                 class="decrease" data-serving='${this._data.servings - 1}'
               >
                 <path
                   d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                 />
               </svg>
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512"
                 class="increase" data-serving='${this._data.servings + 1}'
               >
                 <path
                   d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                 />
               </svg>
             </div>
            </div>
           <div class="recipe-nav-icon">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 448 512"
               class="user-icon"
             >
               <path
                 d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"
               />
             </svg>
             ${
               this._data.bookmark === false
                 ? `<svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 384 512"
               class="bookmark-icon"
             >
               <path
                 d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z"
               />
             </svg>`
                 : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="bookmark-icon pressed">
                 <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
               </svg>`
             }
             <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 448 512"
               class="calender-icon"
             >
               <path
                 d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"
               />
             </svg>
            </div>
          </section>
          <!--  -->
          <section class="recipe-ingredients">
            <h2 class="recipe-ingredients-title">Recipe ingredients</h2>
            <div class="recipe-ingredients-list">
            ${this._data.ingredients
              .map((item) => {
                return `<p class="each-recipe-ingredient"><span>✔</span> ${!item.quantity ? "" : new Fraction(item.quantity)} ${item.description}</p>`;
              })
              .join("")}
            </div>
          </section>
          <!--  -->
          <section class="directions">
            <h2 class="directions-title">How to cook it</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga impedit
              nulla quibusdam commodi. Numquam eligendi repellendus eos et sint
              soluta!
            </p>
            <button class="directions-btn">Directions ↪</button>
          </section>
        </div>`;
  }
  addHandlerRender(handler) {
    //publisher need to have a param yg nerima subscriber
    //good approach multiple add event listener for same param
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }
}

export default new RecipeView();
