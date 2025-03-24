"use client";

import styled from "styled-components"

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  height: 100%;
`

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`

export const StyledTableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
`

export const PercentChange = styled.span<{ $positive: boolean }>`
  color: ${({ theme, $positive }) => ($positive ? theme.colors.success : theme.colors.danger)};
  font-weight: bold;
`

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

export const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const PageButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const PageButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.background)};
  color: ${({ theme, $active }) => ($active ? theme.colors.background : theme.colors.text)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.backgroundSecondary)};
  }
`

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const LoadingContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.background};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
