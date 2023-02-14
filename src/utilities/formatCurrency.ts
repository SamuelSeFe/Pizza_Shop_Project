// Formatt currency used to follow standard currency form (i.e. commas and currency sign)
// Reusable code when using currency instead of hard-coding every time

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-GB", {
    currency: "GBP",
    style: "currency",
  })
  
  export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
  }