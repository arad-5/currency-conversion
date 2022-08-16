import { currencyConvertionResult } from '../types/currencyConvertionResult'

const convertCurrencies = async (from: string, to: string, amount: string): Promise<currencyConvertionResult> => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd5cbf0ca58mshf20cb6727c5ad8cp15c308jsn4396ee0afee2',
            'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com',
        },
    }
    const result: Promise<currencyConvertionResult> = fetch(
        `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${from}&to=${to}&amount=${amount}`,
        options
    ).then((response) => response.json())
    return await result
    // return {
    //     success: false,
    //     validationMessage: ['asfasdfasfasdfasdf' ,'asdfasdfasdfasdfasdf'],
    //     result: {
    //         from: 'usd',
    //         to: 'irr',
    //         amountToConvert: 10,
    //         convertedAmount: 423000,
    //     },
    // }
}

export default convertCurrencies
