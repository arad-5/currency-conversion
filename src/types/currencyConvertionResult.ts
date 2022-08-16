export type currencyConvertionResult = {
    success: boolean
    validationMessage: string[]
    result: {
        from: string
        to: string
        amountToConvert: number
        convertedAmount: number
    }
}
