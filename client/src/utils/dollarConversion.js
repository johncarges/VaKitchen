export default function dollarConversion(dbAmount) {
    const stringAmount = dbAmount.toString()

    return `$${stringAmount.slice(0,-2)}.${stringAmount.slice(-2)}`
}