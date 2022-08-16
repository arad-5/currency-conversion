//form elemnts
const convertForm = document.querySelector<HTMLFormElement>('#convert-form')!
const fromSelect = document.querySelector<HTMLSelectElement>('#from-select')!
const toSelect = document.querySelector<HTMLSelectElement>('#to-select')!
const amountInput = document.querySelector<HTMLInputElement>('#amount-input')!
const formErrorContainer = document.querySelector<HTMLDivElement>('#form-error-container')!
const formErrorList = document.querySelector<HTMLUListElement>('#form-error-list')!

//result elements
const resultContainerEl = document.querySelector<HTMLDivElement>('#result-container')!
const fromResultEl = document.querySelector<HTMLSpanElement>('#from-result')!
const toResultEl = document.querySelector<HTMLSpanElement>('#to-result')!
const resultLoading = document.querySelector<HTMLDivElement>('#result-loading')!

//types
import { AvailableCurrencies } from './types/availableCurrencies'
import { currencyConvertionResult } from './types/currencyConvertionResult'

//api
import getAvailableCurrencies from './api/getAvailableCurrencies.js'
import convertCurrencies from './api/convertCurrencies.js'

convertForm.addEventListener('submit', async (e: Event): Promise<void> => {
    resultContainerEl.classList.add('hidden')
    resultLoading.classList.replace('hidden', 'flex')
    formErrorContainer.classList.add('hidden')

    e.preventDefault()
    const result: currencyConvertionResult = await convertCurrencies(fromSelect.value, toSelect.value, amountInput.value)
    if (result.success) {
        resultContainerEl.classList.remove('hidden')
        formErrorContainer.classList.add('hidden')
        // resultLoading.classList.replace('flex', 'hidden')
        fromResultEl.textContent = `${result.result.amountToConvert} ${result.result.from}`
        toResultEl.textContent = `${result.result.convertedAmount} ${result.result.to}`
        resultLoading.classList.replace('flex', 'hidden')
    } else {
        formErrorContainer.classList.remove('hidden')
        result.validationMessage.forEach((message) => {
            const messageLi = document.createElement('li')
            messageLi.textContent = message
            formErrorList.appendChild(messageLi)
        })
        resultLoading.classList.replace('flex', 'hidden')
    }
})
//fetching available currencies and append them to selects as options elements
const createAvalableCurrenciesOption = async () => {
    const availableCurrencies: AvailableCurrencies = await getAvailableCurrencies()
    const appendOption = (optionElement: HTMLOptionElement) => {
        toSelect.append(optionElement)
        fromSelect.append(optionElement.cloneNode(true))
    }
    availableCurrencies.forEach((currency) => {
        const optionElement: HTMLOptionElement = document.createElement('option')
        optionElement.value = currency.symbol
        optionElement.textContent = `${currency.symbol} - ${currency.name}`
        appendOption(optionElement)
    })
}
createAvalableCurrenciesOption()
