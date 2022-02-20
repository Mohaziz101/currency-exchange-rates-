// This file has been divided into two parts the first part is the JavaScript functionality, 
// and the second part is the Dom styling manipulation.



const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the dome
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/61e868220f03064d99badfd7/latest/${currency_one}`)
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then((data) => {
                        const rate = data.conversion_rates[currency_two];
                        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
                        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
                    })
            }
            throw new Error('Request failed!')
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            return jsonResponse;
        })
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();

//this is the second part is the Dom styling manipulation.
document.body.setAttribute(
    'style',
    'font - family: Arial, Helvetica, sans - serif ; background:#675AFF; display: flex; flex-direction: column; align-items: center ; justify-content: center; height: 100 vh; margin: 0; padding: 20 px; '
);


document.getElementById("amount-one").style.cssText = `
   border: 0;
    background: transparent;
    font-size: 30px;
    text-align: right;
    background-color: #fff;
    border: 3px solid #675AFF;
    margin-left: 20px;
    border-radius: 5px;
    box-shadow: #685aff4d 0px 5px 15px;
`;
document.getElementById("currency-one").style.cssText = `
  padding: 10px 20px 10px 20px;
    appearance: none;
    border: 3px solid #675AFF;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    transition: 0.5s ease;
    box-shadow: #685aff4d 0px 5px 15px;
`;
document.getElementById("currency-two").style.cssText = `
 padding: 10px 20px 10px 20px;
    appearance: none;
    border: 3px solid #675AFF;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    transition: 0.5s ease;
    box-shadow: #685aff4d 0px 5px 15px;
`;


document.getElementById("currency").style.cssText = `
 padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`;
document.getElementById("currency-2").style.cssText = `
 padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    `;


document.getElementById("amount-two").style.cssText = `
   border: 0;
    background: transparent;
    font-size: 30px;
    text-align: right;
    background-color: #fff;
    border: 3px solid #675AFF;
    margin-left: 20px;
    border-radius: 5px;
    box-shadow: #685aff4d 0px 5px 15px;
`;



document.getElementById("container").style.cssText = `
  background-color: #fcfcfd; 
  padding: 1rem 2rem; 
  margin-top: 1rem; 
  border-radius: 5%; 
  text-align: center;
`;


document.getElementById("swap").style.cssText = `
   border-radius: 5px;
    border-color: inherit;
    background-color: #675AFF;
    margin-top: 20px;
    margin-bottom: 20 px;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-align: center;
    color: #fbfcfa;
    margin-right: -3px;
    padding: 10px 20px;
    cursor: pointer;  
`;
document.getElementById("swap-rate-container").style.cssText = `
 display: flex;
    align-items: center;
    justify-content: space-between;
`;