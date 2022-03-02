const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");


function fetchConversionRate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  checkFavorites();

  fetch(
    `https://v6.exchangerate-api.com/v6/3f0d7963a10052f92f3ae5bb/latest/${currency_one}`
  )
    .then(
      (response) => {
        if (response.ok) {
          return response.json().then((data) => {
            const rate = data.conversion_rates[currency_two];
            currencyEl_two.dataset.conversionRate = rate;
            calculate();
          });
        }
        throw new Error("Request failed!");
      },
      (networkError) => {
        console.log(networkError.message);
      }
    )
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const rate = currencyEl_two.dataset.conversionRate;
  rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
}


currencyEl_one.addEventListener("change", fetchConversionRate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", fetchConversionRate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  fetchConversionRate();
});

function init() {
  let favorite_exchanges = getStorageItem(STORAGE_KEYS.FAVORITE_EXCHANGES);
  renderFavorites(favorite_exchanges);
 
  if (favorite_exchanges?.length) {
      const [currency_one, currency_two] = favorite_exchanges[0].split("-");
      changeCurrency(currency_one, currency_two)
  } else {
      fetchConversionRate();
  }
}
init()

function changeCurrency(currency_one, currency_two) {
  currencyEl_one.value = currency_one;
  currencyEl_two.value = currency_two;
  fetchConversionRate();
}
