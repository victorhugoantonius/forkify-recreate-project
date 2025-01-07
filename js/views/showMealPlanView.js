import View from "./View.js";

class ShowMealPlanView extends View {
  _parentElement = document.querySelector(".meal-plan-feature");
  addShowMealPlanHandler(handler) {
    // console.log(this._parentElement);
    this._parentElement.addEventListener("click", () => {
      handler();
    });
  }
}

export default new ShowMealPlanView();
