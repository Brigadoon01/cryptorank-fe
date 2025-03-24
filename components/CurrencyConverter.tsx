"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useCryptoContext } from "@/context/CryptoContext"
import { formatCryptoValue } from "../utils/price-calculator"
import type { Cryptocurrency } from "@/types/crypto"
import debounce from 'lodash/debounce'
import {
  ConverterContainer,
  Title,
  ConverterForm,
  FormGroup,
  Label,
  Input,
  StyledOption,
  Select,
  SwapButton,
  Result,
  ResultAmount,
  ResultText,
  LoadingSpinner
} from './CurrencyConverter.styles'

interface CurrencyOptionProps {
  currency: {
    id: string;
    name: string;
    symbol: string;
    price: number;
  }
}

const CurrencyOption = React.memo(({ currency }: CurrencyOptionProps) => (
  <StyledOption value={currency.id}>
    {`${currency.name} (${currency.symbol}) - $${currency.price.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2
    })}`}
  </StyledOption>
))
CurrencyOption.displayName = 'CurrencyOption'

function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("")
  const [toCurrency, setToCurrency] = useState<string>("")

  // Replace useCryptoData with useCryptoContext
  const { cryptoData, isLoading, error } = useCryptoContext()

  // Set initial currencies once data is loaded
  useEffect(() => {
    if (cryptoData?.data && cryptoData.data.length >= 2) {
      setFromCurrency(cryptoData.data[0].symbol)
      setToCurrency(cryptoData.data[1].symbol)
    }
  }, [cryptoData])

  const availableCurrencies = useMemo(() => {
    if (!cryptoData?.data) return []
    
    return cryptoData.data.map((token: Cryptocurrency) => ({
      id: token.symbol,
      name: token.name,
      symbol: token.symbol,
      price: token.values?.USD?.price || 0
    }))
  }, [cryptoData])

  const calculateConversion = () => {
    if (!cryptoData?.data || !amount) return null

    const numericAmount = parseFloat(amount)
    const fromToken = cryptoData.data.find((t: Cryptocurrency) => t.symbol === fromCurrency)
    const toToken = cryptoData.data.find((t: Cryptocurrency) => t.symbol === toCurrency)

    // Match CryptoTable's data access pattern
    const fromPrice = fromToken?.values?.USD?.price
    const toPrice = toToken?.values?.USD?.price

    if (fromPrice && toPrice) {
      return (numericAmount * fromPrice) / toPrice
    }
    
    return null
  }

  const convertedAmount = calculateConversion()
  const conversionRate = amount === "1" ? convertedAmount : null

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^(\d+)?(\.\d*)?$/.test(e.target.value) || e.target.value === "") {
      setAmount(e.target.value)
    }
  }, [])

  const debouncedCalculation = useMemo(
    () => debounce(() => {
      // Trigger calculation here if needed
    }, 300),
    []
  )

  useEffect(() => {
    debouncedCalculation()
    return () => {
      debouncedCalculation.cancel()
    }
  }, [amount, debouncedCalculation])

  const handleFromCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value.toUpperCase())
  }, [])

  const handleToCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value.toUpperCase())
  }, [])

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }, [fromCurrency, toCurrency])

  const getSymbolForCurrency = useCallback((currencyId: string) => {
    return availableCurrencies.find((c) => c.id === currencyId)?.symbol || currencyId
  }, [availableCurrencies])

  const resultContent = useMemo(() => {
    if (error) {
      return <ResultText>Error: {error.toString()}</ResultText>
    }
    if (isLoading) {
      return <LoadingSpinner />
    }
    if (convertedAmount) {
      return (
        <>
          <ResultAmount>
            {formatCryptoValue(convertedAmount, {
              currency: getSymbolForCurrency(toCurrency),
              significantDigits: 10,
              maxDecimals: 10,
            })}
          </ResultAmount>
          <ResultText>
            1 {getSymbolForCurrency(fromCurrency)} ={" "}
            {formatCryptoValue(conversionRate || 0, {
              currency: getSymbolForCurrency(toCurrency),
              significantDigits: 10,
              maxDecimals: 10,
            })}
          </ResultText>
        </>
      )
    }
    return null
  }, [error, isLoading, convertedAmount, conversionRate, toCurrency, fromCurrency, getSymbolForCurrency])

  return (
    <ConverterContainer>
      <Title>Currency Converter</Title>
      <ConverterForm onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            inputMode="decimal"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="fromCurrency">From</Label>
          <Select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
            {availableCurrencies.map((currency) => (
              <CurrencyOption key={currency.id} currency={currency} />
            ))}
          </Select>
        </FormGroup>

        <SwapButton type="button" onClick={handleSwapCurrencies} aria-label="Swap currencies">
          ↑↓
        </SwapButton>

        <FormGroup>
          <Label htmlFor="toCurrency">To</Label>
          <Select id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
            {availableCurrencies.map((currency) => (
              <CurrencyOption key={currency.id} currency={currency} />
            ))}
          </Select>
        </FormGroup>

        <Result>
          {resultContent}
        </Result>
      </ConverterForm>
    </ConverterContainer>
  )
}

export default React.memo(CurrencyConverter)
