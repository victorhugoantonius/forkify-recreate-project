import View from "./View.js";

class MealPlanView extends View {
  _parentElement = document.querySelector(".meal-plan-calender-container");
  _changeMonthEl = document.querySelector(".change-month-btn");
  #date = new Date();
  #months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  #currMonth = this.#date.getMonth();
  #currYear = this.#date.getFullYear();

  openMealPlan() {
    this._parentElement.parentElement.classList.remove("hidden");
  }

  closeMealPlan() {
    this._parentElement.parentElement.addEventListener("click", (e) => {
      this._parentElement.parentElement.classList.add("hidden");
    });
    this._parentElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  renderCalenderMarkup() {
    let firstDayofMonth = new Date(this.#currYear, this.#currMonth, 1).getDay();
    let lastDateofMonth = new Date(
      this.#currYear,
      this.#currMonth + 1,
      0
    ).getDate();
    let lastDateofPreviousMonth = new Date(
      this.#currYear,
      this.#currMonth,
      0
    ).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class='inactive'>${lastDateofPreviousMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      liTag += `<li>${i}</li>`;
    }

    this._parentElement.querySelector(".month-text").textContent =
      `${this.#months[this.#currMonth]} ${this.#currYear}`;
    this._parentElement.querySelector(".days").innerHTML = liTag;
  }

  changeMonth() {
    this._changeMonthEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("prev")) {
        this.#currMonth -= 1;
        if (this.#currMonth < 0) {
          this.#currYear -= 1;
          this.#currMonth = 11;
        }
      }
      if (e.target.classList.contains("next")) {
        this.#currMonth += 1;
        if (this.#currMonth > 11) {
          this.#currYear += 1;
          this.#currMonth = 0;
        }
      }
      this.renderCalenderMarkup();
      this.renderAssignedMealPlan(this._data, this.#months[this.#currMonth]);
    });
  }

  renderAssignedMealPlan(
    dateValue,
    currentMonth = this.#months[this.#currMonth]
  ) {
    this._data = dateValue;

    // Filter the data to only include meal plans for the current month
    const filteredData = this._data.filter((date) => {
      const dateObj = new Date(date.mealPlanAssignDate);
      const month = dateObj.toLocaleDateString("en-GB", { month: "long" });
      return month === currentMonth;
    });

    // Format the filtered dates for display
    const formattedDates = filteredData.map((date) => {
      const dateObj = new Date(date.mealPlanAssignDate); // Convert string to Date
      return dateObj.toLocaleDateString("en-GB", {
        day: "numeric", // Day without leading zero
        month: "long", // Full month name
        year: "numeric", // Full year
      });
    });

    // Create an array of days for the current month from the formatted dates
    const splitDate = formattedDates
      .map((date) => date.split(" "))
      .map((dateParts) => dateParts[0]); // Get just the day (numeric part)

    // Get all the list items in the calendar
    const liData = Array.from(this._parentElement.querySelectorAll(".days li"));

    // Add 'active' class to the days in the current month
    liData.forEach((item) => {
      if (splitDate.includes(item.innerText)) {
        item.classList.add("active");
      }
    });

    // Render the meal plan details for the current month
    const renderParentList =
      this._parentElement.querySelector(".meal-plan-details");
    renderParentList.innerHTML = `<article class="each-meal-plan-detail">
            ${filteredData
              .map((item) => {
                return `<h2>${item.mealPlanName}<span>${item.mealPlanServings} Servings</span></h2>`;
              })
              .join("")}
          </article>`;
  }
}

export default new MealPlanView();
