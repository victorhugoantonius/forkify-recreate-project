class PaginationView {
  _parentElement = document.querySelector(".pagination");
  generatePagination(currPage = 1, maxPage) {
    this._parentElement.innerHTML = "";
    let markup;
    if (currPage === 1 && currPage < maxPage) {
      markup = `<button class="pag-btn next-page" data-goTo='${currPage + 1}'>→ Page 2</button>`;
    }
    if (currPage > 1 && currPage < maxPage) {
      markup = `<button class="pag-btn prev-page" data-goTo='${currPage - 1}'>← Page ${currPage - 1}</button>
            <button class="pag-btn next-page" data-goTo='${currPage + 1}'>→ Page ${currPage + 1}</button>`;
    }
    if (currPage === maxPage) {
      markup = `<button class="pag-btn prev-page" data-goTo='${currPage - 1}'>← Page ${currPage - 1}</button>`;
    }
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addPaginationHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".pag-btn");
      if (!btn) return;
      const currPage = +e.target.dataset.goto;
      handler(currPage);
    });
  }
}

export default new PaginationView();
