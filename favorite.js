const favorite_listEl = document.getElementById("favorites");
const add_btn = document.getElementById("add-btn");
const remove_btn = document.getElementById("remove-btn");

add_btn.addEventListener("click", addToFavorite);
remove_btn.addEventListener("click", () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const exchange_item = `${currency_one}-${currency_two}`;
  removeFromFavorite(exchange_item);
});


function checkFavorites() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;


  let favorite_exchanges = getStorageItem(STORAGE_KEYS.FAVORITE_EXCHANGES);
  if (!favorite_exchanges) return;

  const found_exchange = favorite_exchanges.find(
    (item) => item === `${currency_one}-${currency_two}`
  );
  if (found_exchange) {
    showRemoveBtn();
  } else {
    showAddBtn();
  }
}


function renderFavorites(items) {
  favorite_listEl.innerHTML = "";

  items.forEach((item) => {
    const [from, to] = item.split("-");

    const itemEl = document.createElement("div");
    itemEl.classList.add("item");
    itemEl.innerHTML = `
      <span>${item}</span>
      <span class="remove-btn" onClick="removeFromFavorite('${item}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
      </span>
    `;
    itemEl.onclick = (e) => {
      if (e.target.closest(".remove-btn")) {

        return;
      } else {
        changeCurrency(from, to)
      }
    }
    favorite_listEl.appendChild(itemEl);
  });
}

function addToFavorite() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const exchange_item = `${currency_one}-${currency_two}`;


  let favorite_exchanges = getStorageItem(STORAGE_KEYS.FAVORITE_EXCHANGES);
  if (!favorite_exchanges) {

    favorite_exchanges = [];
  }

  favorite_exchanges.push(exchange_item);

  setStorageItem(STORAGE_KEYS.FAVORITE_EXCHANGES, favorite_exchanges);
  renderFavorites(favorite_exchanges);
  showRemoveBtn();
}

function removeFromFavorite(targetItem) {
  let favorite_exchanges = getStorageItem(STORAGE_KEYS.FAVORITE_EXCHANGES);
  if (!favorite_exchanges) return;


  const new_favorite_exchanges = favorite_exchanges.filter(
    (item) => item !== targetItem
  );


  setStorageItem(STORAGE_KEYS.FAVORITE_EXCHANGES, new_favorite_exchanges);
  showAddBtn();
  renderFavorites(new_favorite_exchanges);
}


function showAddBtn() {
  add_btn.style.display = "block";
  remove_btn.style.display = "none";
}


function showRemoveBtn() {
  add_btn.style.display = "none";
  remove_btn.style.display = "block";
}