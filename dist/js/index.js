//form elemnts
const convertForm = document.querySelector('#convert-form');
const fromSelect = document.querySelector('#from-select');
const toSelect = document.querySelector('#to-select');
const amountInput = document.querySelector('#amount-input');
const formErrorContainer = document.querySelector('#form-error-container');
const formErrorList = document.querySelector('#form-error-list');
//result elements
const resultContainerEl = document.querySelector('#result-container');
const fromResultEl = document.querySelector('#from-result');
const toResultEl = document.querySelector('#to-result');
const resultLoading = document.querySelector('#result-loading');
//api
import getAvailableCurrencies from './api/getAvailableCurrencies.js';
import convertCurrencies from './api/convertCurrencies.js';
convertForm.addEventListener('submit', async (e) => {
    resultContainerEl.classList.add('hidden');
    resultLoading.classList.replace('hidden', 'flex');
    formErrorContainer.classList.add('hidden');
    e.preventDefault();
    const result = await convertCurrencies(fromSelect.value, toSelect.value, amountInput.value);
    if (result.success) {
        resultContainerEl.classList.remove('hidden');
        formErrorContainer.classList.add('hidden');
        // resultLoading.classList.replace('flex', 'hidden')
        fromResultEl.textContent = `${result.result.amountToConvert} ${result.result.from}`;
        toResultEl.textContent = `${result.result.convertedAmount} ${result.result.to}`;
        resultLoading.classList.replace('flex', 'hidden');
    }
    else {
        formErrorContainer.classList.remove('hidden');
        result.validationMessage.forEach((message) => {
            const messageLi = document.createElement('li');
            messageLi.textContent = message;
            formErrorList.appendChild(messageLi);
        });
        resultLoading.classList.replace('flex', 'hidden');
    }
});
//fetching available currencies and append them to selects as options elements
const createAvalableCurrenciesOption = async () => {
    const availableCurrencies = await getAvailableCurrencies();
    const appendOption = (optionElement) => {
        toSelect.append(optionElement);
        fromSelect.append(optionElement.cloneNode(true));
    };
    availableCurrencies.forEach((currency) => {
        const optionElement = document.createElement('option');
        optionElement.value = currency.symbol;
        optionElement.textContent = `${currency.symbol} - ${currency.name}`;
        appendOption(optionElement);
    });
};
createAvalableCurrenciesOption();
