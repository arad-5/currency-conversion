import { AvailableCurrencies } from '../types/availableCurrencies'

const getAvailableCurrencies = async (): Promise<AvailableCurrencies> => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd5cbf0ca58mshf20cb6727c5ad8cp15c308jsn4396ee0afee2',
            'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com',
        },
    }
    const availableCurrencies: Promise<AvailableCurrencies> = fetch(
        'https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies',
        options
    ).then((response) => response.json())
    return await availableCurrencies
    // return await [{symbol: '' , name: ''}]
}

export default getAvailableCurrencies
