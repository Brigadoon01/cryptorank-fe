"use client";

import useSWR, { mutate } from "swr";
import { useMemo } from "react";
import type { PaginatedResponse, Cryptocurrency } from "@/types/crypto";
import { getMockCryptocurrencies } from "@/lib/mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.cryptorank.io/v2";
const API_KEY = process.env.NEXT_PUBLIC_CRYPTORANK_API_KEY;

// Cache the fetcher function
const fetcherWithCache = (() => {
  const cache = new Map();
  const lastSuccessfulDataMap = new Map();
  
  return async (url: string) => {
    if (cache.has(url)) {
      return cache.get(url);
    }

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      cache.set(url, data);
      lastSuccessfulDataMap.set(url, data);
      
      // Cache invalidation after 1 minute
      setTimeout(() => cache.delete(url), 60000);
      
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Return last successful data if available, otherwise fallback to mock data
      return lastSuccessfulDataMap.get(url) || getMockCryptocurrencies();
    }
  };
})();

// Custom hook for fetching cryptocurrency data
export function useCryptoData(
  initialData: PaginatedResponse<Cryptocurrency>,
  limit: number = 10,
  offset: number = 0
) {
  const queryParams = useMemo(() => 
    new URLSearchParams({
      api_key: API_KEY || "",
      limit: String(limit),
      offset: String(offset),
    }).toString(),
    [limit, offset]
  );

  const { data, error, isLoading, isValidating } = useSWR<PaginatedResponse<Cryptocurrency>>(
    `${API_BASE_URL}/currencies/?${queryParams}`,
    fetcherWithCache,
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
      revalidateIfStale: true,
      shouldRetryOnError: true,
      dedupingInterval: 60000,
      keepPreviousData: true,
      onError: (err, key, config) => {
        // Keep the previous data on error
        return config.fallbackData;
      }
    }
  );

  return {
    cryptoData: data,
    isLoading,
    isRefreshing: isValidating,
    error,
    refresh: () => mutate(`${API_BASE_URL}/currencies/?${queryParams}`),
  };
}
