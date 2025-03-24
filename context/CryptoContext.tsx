"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useCryptoData } from "@/hooks/useCryptoData";
import type { PaginatedResponse, Cryptocurrency } from "@/types/crypto";

interface CryptoContextType {
  cryptoData: PaginatedResponse<Cryptocurrency> | undefined;
  isLoading: boolean;
  error: Error | undefined;
  refresh: () => void;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export function CryptoProvider({ children, initialData }: { 
  children: React.ReactNode;
  initialData: PaginatedResponse<Cryptocurrency>;
}) {
  const { cryptoData, isLoading, error, refresh } = useCryptoData(initialData, 200);

  return (
    <CryptoContext.Provider value={{ cryptoData, isLoading, error, refresh }}>
      {children}
    </CryptoContext.Provider>
  );
}

export function useCryptoContext() {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCryptoContext must be used within a CryptoProvider');
  }
  return context;
}
