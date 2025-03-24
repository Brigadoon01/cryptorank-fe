import Decimal from "decimal.js"

// Configure Decimal.js for high precision
Decimal.set({ precision: 50 })

/**
 * Calculates the historical price based on the current price and percentage change
 * using high-precision decimal arithmetic to avoid floating point errors
 *
 * @param currentPrice The current price of the cryptocurrency
 * @param percentChange The percentage change (e.g., -5.2 for a 5.2% decrease)
 * @returns The historical price
 */
export function calculateHistoricalPrice(currentPrice: number, percentChange: number): number {
  // Convert inputs to Decimal objects for precise calculation
  const price = new Decimal(currentPrice)
  const percent = new Decimal(percentChange)

  // Formula: historicalPrice = currentPrice / (1 + (percentChange / 100))
  const divisor = new Decimal(1).plus(percent.dividedBy(100))
  const historicalPrice = price.dividedBy(divisor)

  // Convert back to number for compatibility with the rest of the application
  return historicalPrice.toNumber()
}

/**
 * Calculates all historical prices for a cryptocurrency with high precision
 *
 * @param price Current price
 * @param changes Object containing percentage changes for different time periods
 * @returns Object with historical prices for each time period
 */
export function calculateAllHistoricalPrices(
  price: number,
  changes: {
    percentChange24h?: number
    percentChange7d?: number
    percentChange30d?: number
    percentChange3m?: number
    percentChange6m?: number
  },
): {
  price24hAgo?: number
  price7dAgo?: number
  price30dAgo?: number
  price3mAgo?: number
  price6mAgo?: number
} {
  return {
    price24hAgo:
      changes.percentChange24h !== undefined ? calculateHistoricalPrice(price, changes.percentChange24h) : undefined,
    price7dAgo:
      changes.percentChange7d !== undefined ? calculateHistoricalPrice(price, changes.percentChange7d) : undefined,
    price30dAgo:
      changes.percentChange30d !== undefined ? calculateHistoricalPrice(price, changes.percentChange30d) : undefined,
    price3mAgo:
      changes.percentChange3m !== undefined ? calculateHistoricalPrice(price, changes.percentChange3m) : undefined,
    price6mAgo:
      changes.percentChange6m !== undefined ? calculateHistoricalPrice(price, changes.percentChange6m) : undefined,
  }
}

/**
 * Safely converts a value to a Decimal object
 * Handles various input types and edge cases
 *
 * @param value The value to convert
 * @returns A Decimal object
 */
export function toDecimal(value: number | string | Decimal): Decimal {
  if (value instanceof Decimal) {
    return value
  }

  // Handle special cases
  if (value === null || value === undefined) {
    return new Decimal(0)
  }

  // Convert to string and clean it up
  const cleanValue = String(value)
    .trim()
    .replace(/[^\d.-]/g, '') // Remove any non-numeric characters except decimal point and minus

  if (!cleanValue || cleanValue === '-' || cleanValue === '.') {
    return new Decimal(0)
  }

  try {
    return new Decimal(cleanValue)
  } catch (error) {
    console.error(`Error converting value "${value}" to Decimal:`, error)
    return new Decimal(0)
  }
}

/**
 * Formats a number with appropriate precision for display
 * Handles different scales of numbers appropriately
 *
 * @param value The number to format
 * @param options Formatting options
 * @returns Formatted string
 */
export function formatCryptoValue(
  value: number | string | Decimal,
  options: {
    currency?: string
    significantDigits?: number
    maxDecimals?: number
    minDecimals?: number
  } = {},
): string {
  const { currency, significantDigits = 8, maxDecimals = 8, minDecimals = 2 } = options

  const decimalValue = toDecimal(value)

  // Determine appropriate precision based on the value's magnitude
  let formattedValue: string

  if (decimalValue.isZero()) {
    formattedValue = "0"
  } else if (decimalValue.abs().lessThan(0.000001)) {
    // For extremely small values, use scientific notation
    formattedValue = decimalValue.toExponential(significantDigits - 1)
  } else if (decimalValue.abs().lessThan(0.01)) {
    // For very small values, show more decimal places
    formattedValue = decimalValue.toFixed(Math.min(10, maxDecimals))
  } else if (decimalValue.abs().lessThan(1)) {
    // For small values, show appropriate decimal places
    formattedValue = decimalValue.toFixed(Math.min(8, maxDecimals))
  } else if (decimalValue.abs().greaterThan(1000000)) {
    // For large values, use compact notation
    formattedValue = new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: maxDecimals,
      minimumFractionDigits: minDecimals,
    }).format(decimalValue.toNumber());    
  } else {
    // For normal values, use standard formatting
    formattedValue = decimalValue.toFixed(
      Math.min(Math.max(minDecimals, significantDigits - Math.floor(decimalValue.abs().log(10).toNumber()) - 1), maxDecimals),
    )
  }

  // Add currency symbol if provided
  if (currency) {
    if (currency === "USD") {
      return `$${formattedValue}`
    } else {
      return `${formattedValue} ${currency}`
    }
  }

  return formattedValue
}

