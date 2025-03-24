import { Suspense } from "react";
import Layout from "../../components/Layout";
import CurrencyConverterClient from "./converter-client";
import { LoadingContainer, LoadingSpinner } from "@/components/CryptoTable.styles";

export default function ConverterPage() {
  return (
    <Layout>
      <Suspense
        fallback={
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        }
      >
        <CurrencyConverterClient />
      </Suspense>
    </Layout>
  );
}
