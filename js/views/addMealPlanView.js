import View from "./View.js";

class AddMealPlanView extends View {
  _parentElement = document.querySelector(".meal-plan-modal");
  _submitForm = document.querySelector("#mealForm");
  constructor() {
    super();
    // Tambahkan event listener hanya sekali
    this._parentElement.addEventListener("click", (e) => {
      const isCloseBtn = e.target.closest(".close-meal-btn");
      if (!isCloseBtn) return;
      this._parentElement.classList.add("hidden");
      console.log(isCloseBtn);
    });
  }
  openAddMealPlan() {
    this._parentElement.classList.remove("hidden");
  }
  renderDataMealPlan(data) {
    if (!data) return;

    this._data = data;

    // Ambil elemen input
    const dataEl = Array.from(
      this._submitForm.querySelectorAll('input[type="text"]')
    );

    // Pastikan elemen input sesuai dengan data
    if (dataEl[0]) dataEl[0].defaultValue = this._data.title || "";
    if (dataEl[1]) dataEl[1].defaultValue = this._data.servings || "";

    console.log("Data yang dirender:", this._data);
  }

  submitMealPlan(handler) {
    this._submitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const elDate = e.target.querySelector("#meal-date");
      if (!elDate) return;
      handler(elDate.value);
      elDate.value = "";
      this._parentElement.classList.add("hidden");
      //   handler();
    });
  }
}

export default new AddMealPlanView();
