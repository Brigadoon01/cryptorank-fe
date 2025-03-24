import { calculateHistoricalPrice, calculateAllHistoricalPrices, formatCryptoValue } from "./price-calculator"
import Decimal from "decimal.js"

describe("calculateHistoricalPrice", () => {
  // Common test values
  const basePrice = 100
  
  test.each([
    [100, 25, 80],
    [75, -25, 100],
    [100, 0, 100],
    [100, 0.0000001, 99.9999999],
    [100, 1000000, 0.00999999]
  ])("calculates price correctly for %p with %p% change", (current, change, expected) => {
    expect(calculateHistoricalPrice(current, change)).toBeCloseTo(expected, 8)
  })

  describe("precision handling", () => {
    test.each([
      [0.00000123, 5, 0.00000117142857, 14],
      [0.000000000123, 5, 0.000000000117142857, 18],
      [1000000000, 5, 952380952.38095, 5]
    ])("handles precision for %p with %p% change", (current, change, expected, precision) => {
      expect(calculateHistoricalPrice(current, change)).toBeCloseTo(expected, precision)
    })
  })
})

describe("calculateAllHistoricalPrices", () => {
  test("calculates all historical prices correctly", () => {
    const currentPrice = 1000
    const changes = {
      percentChange24h: 5,
      percentChange7d: 10,
      percentChange30d: -15,
      percentChange3m: 25,
      percentChange6m: -30,
    }

    const result = calculateAllHistoricalPrices(currentPrice, changes)

    expect(result.price24hAgo).toBeCloseTo(952.38095238, 8)
    expect(result.price7dAgo).toBeCloseTo(909.09090909, 8)
    expect(result.price30dAgo).toBeCloseTo(1176.47058824, 8)
    expect(result.price3mAgo).toBeCloseTo(800, 8)
    expect(result.price6mAgo).toBeCloseTo(1428.57142857, 8)
  })

  test("handles undefined percentage changes", () => {
    const currentPrice = 1000
    const changes = {
      percentChange24h: 5,
      percentChange7d: undefined,
      percentChange30d: -15,
    }

    const result = calculateAllHistoricalPrices(currentPrice, changes)

    expect(result.price24hAgo).toBeCloseTo(952.38095238, 8)
    expect(result.price7dAgo).toBeUndefined()
    expect(result.price30dAgo).toBeCloseTo(1176.47058824, 8)
    expect(result.price3mAgo).toBeUndefined()
    expect(result.price6mAgo).toBeUndefined()
  })
})

describe("formatCryptoValue", () => {
  test("formats regular numbers correctly", () => {
    expect(formatCryptoValue(1234.5678)).toBe("1234.57")
    expect(formatCryptoValue(1234.5678, { currency: "USD" })).toBe("$1234.57")
    expect(formatCryptoValue(1234.5678, { currency: "BTC" })).toBe("1234.57 BTC")
  })

  test("formats small numbers with appropriate precision", () => {
    expect(formatCryptoValue(0.00123456)).toBe("0.00123456")
    expect(formatCryptoValue(0.000000123)).toBe("0.000000123")
    expect(formatCryptoValue(0.0000000123)).toBe("0.0000000123")
  })

  test("formats very small numbers using scientific notation", () => {
    expect(formatCryptoValue(0.0000000001)).toBe("1e-10")
  })

  test("formats large numbers using compact notation", () => {
    expect(formatCryptoValue(1234567)).toBe("1.23M")
    expect(formatCryptoValue(1234567890)).toBe("1.23B")
  })

  test("respects custom formatting options", () => {
    expect(formatCryptoValue(1.23456, { minDecimals: 4, maxDecimals: 5 })).toBe("1.2346")
    expect(formatCryptoValue(0.00123, { significantDigits: 3 })).toBe("0.00123")
  })

  test("handles Decimal.js input", () => {
    expect(formatCryptoValue(new Decimal("1234.5678"))).toBe("1234.57")
  })

  test("handles string input", () => {
    expect(formatCryptoValue("1234.5678")).toBe("1234.57")
  })

  test("handles zero correctly", () => {
    expect(formatCryptoValue(0)).toBe("0")
    expect(formatCryptoValue("0")).toBe("0")
    expect(formatCryptoValue(new Decimal(0))).toBe("0")
  })
})

