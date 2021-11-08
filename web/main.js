(() => {
  let data = null;
  const listContainer = document.querySelector("#list");
  const sortButtons = document.querySelectorAll("button");

  loadData = async () => {
    const data = await fetch("data.json");
    return data.json();
  };

  sortArray = (sortBy) => {
    data = _.sortBy(data, sortBy);
    data = _.reverse(data);
  };

  sortData = (sortBy) => {
    sortArray(sortBy);
    removeList();
    renderData();
  };

  removeList = () => {
    const list = document.querySelector("#list ul");
    listContainer.removeChild(list);
  };

  renderData = () => {
    const ul = document.createElement("ul");
    data.forEach((element, index) => {
      const template = `
        <a href="${element.reviewUrl}" title="view review scores on instagram" >
          <div class="score">
          <div class="number">
            ${index + 1}
          </div>
          <div class="desc">
            Rank
          </div>
          </div>
          <img 
            loading="lazy" 
            src="assets/img/${element.vendor}-${element.name}.webp" 
            alt="${element.title}" 
            height="760" 
            width="512" 
          />
        </a>
      `;
      const child = document.createElement("li");
      child.innerHTML = template;
      ul.appendChild(child);
    });
    listContainer.appendChild(ul);
  };

  setClass = (button) => {
    document.querySelector(".active").classList.remove("active");
    document.querySelector(`#${button}`).classList.add("active");
  };

  setupEvents = () => {
    sortButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        setClass(button.id);
        sortData(event.target.dataset.sortby);
      });
    });
  };

  loadData().then((response) => {
    data = response.reviews;
    setupEvents();
    sortArray("totalscore");
    renderData();
  });
})();
