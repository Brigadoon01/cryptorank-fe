import { Suspense } from "react";
import { getMockCryptocurrencies } from "../lib/mockData";
import CryptoRatesClient from "./crypto-rates/crypto-rates-client";
import type { PaginatedResponse, Cryptocurrency } from "../types/crypto";
import { LoadingContainer, LoadingSpinner } from "@/components/CryptoTable.styles";

// Number of items per page
const ITEMS_PER_PAGE = 10;

// This function can be reused for initial data loading
async function getCryptoData(
  limit: number,
  offset: number
): Promise<PaginatedResponse<Cryptocurrency>> {
  // In a real app, you'd use fetchCryptocurrencies
  return getMockCryptocurrencies(limit, offset);
}

export default async function HomePage() {
  // Fetch initial data on the server
  const initialData = await getCryptoData(ITEMS_PER_PAGE, 0);

  return (
    <Suspense
      fallback={
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      }
    >
      <CryptoRatesClient
        initialData={initialData}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Suspense>
  );
}
