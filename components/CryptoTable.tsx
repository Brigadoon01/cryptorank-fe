"use client"
import React, { useCallback, useMemo } from "react"
import type { Cryptocurrency } from "@/types/crypto"
import { formatCryptoValue } from "../utils/price-calculator"
import {
  Table,
  TableHead,
  StyledTableRow,
  TableHeader,
  TableCell,
  PercentChange,
  Pagination,
  PageInfo,
  PageButtons,
  PageButton,
  TableContainer,
  LoadingContainer,
  LoadingSpinner
} from "./CryptoTable.styles"

// Move formatPercentage outside of component
const formatPercentage = (num: number | undefined) => {
  if (num === undefined) return "N/A"
  return (
    <PercentChange $positive={num >= 0}>
      {num >= 0 ? "+" : ""}
      {num.toFixed(2)}%
    </PercentChange>
  )
}

interface CryptoTableProps {
  cryptocurrencies: Cryptocurrency[]
  total: number
  limit: number
  offset: number
  onPageChangeAction: (offset: number) => void
}

const TableRow = React.memo(({ crypto }: { crypto: Cryptocurrency }) => {
  const usdValues = crypto.values?.USD || {}
  
  return (
    <StyledTableRow>
      <TableCell>{crypto.rank}</TableCell>
      <TableCell>
        <strong>{crypto.name}</strong> ({crypto.symbol})
      </TableCell>
      <TableCell>{formatCryptoValue(usdValues.price || 0, { currency: "USD" })}</TableCell>
      <TableCell>{formatPercentage(usdValues.percentChange24h)}</TableCell>
      <TableCell>{formatPercentage(usdValues.percentChange7d)}</TableCell>
      <TableCell>{formatPercentage(usdValues.percentChange30d)}</TableCell>
      <TableCell>{formatPercentage(usdValues.percentChange3m)}</TableCell>
      <TableCell>{formatPercentage(usdValues.percentChange6m)}</TableCell>
      <TableCell>{formatCryptoValue(usdValues.marketCap || 0, { currency: "USD" })}</TableCell>
      <TableCell>{formatCryptoValue(usdValues.volume24h || 0, { currency: "USD" })}</TableCell>
      <TableCell>{crypto.category}</TableCell>
    </StyledTableRow>
  )
})
TableRow.displayName = 'TableRow'

export default React.memo(function CryptoTable({ cryptocurrencies, total, limit, offset, onPageChangeAction }: CryptoTableProps) {
  // Handle undefined or null cryptocurrencies
  if (!cryptocurrencies) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  const handlePrevPage = useCallback(() => {
    if (offset - limit >= 0) {
      onPageChangeAction(offset - limit)
    }
  }, [offset, limit, onPageChangeAction])

  const handleNextPage = useCallback(() => {
    if (offset + limit < total) {
      onPageChangeAction(offset + limit)
    }
  }, [offset, limit, total, onPageChangeAction])

  const paginationContent = useMemo(() => {
    const totalPages = Math.ceil(total / limit)
    const currentPage = Math.floor(offset / limit) + 1

    return (
      <Pagination>
        <PageInfo>
          Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} cryptocurrencies
        </PageInfo>
        <PageButtons>
          <PageButton onClick={handlePrevPage} $disabled={offset === 0} disabled={offset === 0}>
            Previous
          </PageButton>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <PageButton key={i} $active={pageNum === currentPage} onClick={() => onPageChangeAction((pageNum - 1) * limit)}>
                {pageNum}
              </PageButton>
            )
          })}
          {totalPages > 5 && <span>...</span>}
          <PageButton onClick={handleNextPage} $disabled={offset + limit >= total} disabled={offset + limit >= total}>
            Next
          </PageButton>
        </PageButtons>
      </Pagination>
    )
  }, [total, limit, offset, handlePrevPage, handleNextPage])

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <TableHeader>Rank</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Price USD</TableHeader>
              <TableHeader>24h %</TableHeader>
              <TableHeader>7d %</TableHeader>
              <TableHeader>30d %</TableHeader>
              <TableHeader>3m %</TableHeader>
              <TableHeader>6m %</TableHeader>
              <TableHeader>Market Cap</TableHeader>
              <TableHeader>Volume 24h</TableHeader>
              <TableHeader>Category</TableHeader>
            </StyledTableRow>
          </TableHead>
          <tbody>
            {cryptocurrencies.map((crypto) => (
              <TableRow key={crypto.id} crypto={crypto} />
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {paginationContent}
    </>
  )
})

