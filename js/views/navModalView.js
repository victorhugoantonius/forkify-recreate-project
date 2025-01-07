class NavModalView {
  _parentElement = document.querySelector(".navbar-modal");
  _hamburgerIcon = document.querySelector(".hamburger-menu");
  constructor() {
    this._showNavModal();
    this._hideNavModal();
  }
  _showNavModal() {
    this._hamburgerIcon.addEventListener("click", () => {
      this._parentElement.classList.remove("hidden");
    });
  }
  _hideNavModal() {
    const closeBtn = this._parentElement.querySelector(".close-modal-btn");
    closeBtn.addEventListener("click", () => {
      this._parentElement.classList.add("hidden");
    });
  }
}

export default new NavModalView();
