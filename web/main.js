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
    const list = document.querySelector("ul");
    listContainer.removeChild(list);
  };

  renderData = () => {
    const ul = document.createElement("ul");
    data.forEach((element) => {
      const template = `
        <li>
          <strong>${element.title}</strong> <br>
          score: ${element.totalscore} <br>
          readability: ${element.scores.readability} <br>
          playability: ${element.scores.playability} <br>
          quality: ${element.scores.quality} <br>
          value: ${element.scores.value} <br>
          styling: ${element.scores.styling} <br>
          appeal: ${element.scores.appeal}
        </li>
      `;
      const child = document.createElement("li");
      child.innerHTML = template;
      ul.appendChild(child);
    });
    listContainer.appendChild(ul);
  };

  setupEvents = () => {
    sortButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
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
