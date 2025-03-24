import type { Cryptocurrency, PaginatedResponse, ConversionRate } from "@/types/crypto"

// For demo purposes, we'll add a mock function that would be replaced with real API calls
export async function getMockCryptocurrencies(limit = 10, offset = 0): Promise<PaginatedResponse<Cryptocurrency>> {
  // This is just for demonstration - in a real app, you'd use the actual API
  const mockData: Cryptocurrency[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 50000,
      circulatingSupply: 19000000,
      marketCap: 950000000000,
      category: "Currency",
      percentChange24h: 2.5,
      percentChange7d: -3.2,
      percentChange30d: 15.7,
      percentChange3m: 25.4,
      percentChange6m: 50.1,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3000,
      circulatingSupply: 120000000,
      marketCap: 360000000000,
      category: "Smart Contract Platform",
      percentChange24h: 1.8,
      percentChange7d: -2.1,
      percentChange30d: 10.5,
      percentChange3m: 18.7,
      percentChange6m: 35.2,
    },
    // Add more mock data as needed
  ]

  // Generate more mock data
  for (let i = 2; i < 200; i++) {  // Changed from 100 to 200 items
    const basePrice = Math.random() * 1000 + (Math.random() < 0.1 ? 10000 : 0); // Some higher priced coins
    const marketCap = basePrice * (Math.random() * 100000000 + 1000000); // More realistic market cap
    const volume = marketCap * (Math.random() * 0.2); // Volume as a portion of market cap
    
    mockData.push({
      id: `crypto-${i}`,
      name: `Cryptocurrency ${i}`,
      symbol: `CRY${i}`,
      rank: i + 1,
      values: {
        USD: {
          price: basePrice,
          marketCap: marketCap,
          volume24h: volume,
          percentChange24h: Math.random() * 20 - 10,
          percentChange7d: Math.random() * 30 - 15,
          percentChange30d: Math.random() * 60 - 30,
          percentChange3m: Math.random() * 100 - 50,
          percentChange6m: Math.random() * 200 - 100,
        }
      },
      category: i % 4 === 0 ? "Currency" : 
               i % 4 === 1 ? "Smart Contract Platform" : 
               i % 4 === 2 ? "DeFi" : "NFT",
    })
  }

  // Implement pagination
  const paginatedData = mockData.slice(offset, offset + limit)
  
  return {
    data: paginatedData,
    total: mockData.length,
    limit,
    offset
  }
}

