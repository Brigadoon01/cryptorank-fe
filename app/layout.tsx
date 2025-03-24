import type React from "react"
import StyledComponentsRegistry from "../lib/registry"
import { CryptoProvider } from "@/context/CryptoContext"
import { getMockCryptocurrencies } from "@/lib/mockData"

export const metadata = {
  title: "Crypto Rate Calculator",
  description: "Track cryptocurrency rates and convert between currencies",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialData = await getMockCryptocurrencies(200, 0);

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <CryptoProvider initialData={initialData}>
            {children}
          </CryptoProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
