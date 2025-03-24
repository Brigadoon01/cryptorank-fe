"use client"

import React from "react"
import CryptoTable from "../../components/CryptoTable"
import Layout from "../../components/Layout"
import { useCryptoData } from "../../hooks/useCryptoData"
import type { PaginatedResponse, Cryptocurrency } from "../../types/crypto"
import styled from 'styled-components'

interface CryptoRatesClientProps {
  initialData: PaginatedResponse<Cryptocurrency>
  itemsPerPage: number
}

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const RefreshingText = styled.span`
  color: #3b82f6;
`

export default function CryptoRatesClient({ initialData, itemsPerPage }: CryptoRatesClientProps) {
  const [offset, setOffset] = React.useState<number>(0)

  const { cryptoData, isLoading, isRefreshing, error, refresh } = useCryptoData(
    initialData,
    itemsPerPage,
    offset, 
  )

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset)
  }

  const currentData = cryptoData || initialData

  return (
    <Layout>
      <PageHeader>
        <HeaderTitle>Cryptocurrency Rates</HeaderTitle>
        <HeaderActions>
          <RefreshButton onClick={() => refresh()} disabled={isRefreshing}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </RefreshButton>
        </HeaderActions>
      </PageHeader>

      {error ? (
        <div className="error-message">Error loading cryptocurrency data. Please try again.</div>
      ) : isLoading && !currentData ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <CryptoTable
          cryptocurrencies={currentData.data}
          total={currentData.total}
          limit={currentData.limit}
          offset={currentData.offset}
          onPageChangeAction={handlePageChange}
        />
      )}
    </Layout>
  )
}

