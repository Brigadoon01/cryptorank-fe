import type { Cryptocurrency, PaginatedResponse} from "@/types/crypto"

// For demo purposes, we'll add a mock function that would be replaced with real API calls
export async function getMockCryptocurrencies(limit = 10, offset = 0): Promise<PaginatedResponse<Cryptocurrency>> {
  // This is just for demonstration - in a real app, you'd use the actual API
  const mockData: Cryptocurrency[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 45000,
      rank: 1,
      values: {
        USD: {
          price: 45000,
          marketCap: 850000000000,
          volume24h: 28000000000,
          percentChange24h: 2.5,
          percentChange7d: 5.2,
          percentChange30d: 10.5,
          percentChange3m: 15.3,
          percentChange6m: 25.8
        }
      },
      circulatingSupply: 19000000,
      marketCap: 850000000000,
      category: "Currency",
      percentChange24h: 2.5,
      percentChange7d: 5.2,
      percentChange30d: 10.5,
      percentChange3m: 15.3,
      percentChange6m: 25.8
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3000,
      rank: 2,
      values: {
        USD: {
          price: 3000,
          marketCap: 350000000000,
          volume24h: 15000000000,
          percentChange24h: 3.2,
          percentChange7d: 6.5,
          percentChange30d: 12.8,
          percentChange3m: 18.5,
          percentChange6m: 30.2
        }
      },
      circulatingSupply: 120000000,
      marketCap: 350000000000,
      category: "Smart Contract Platform",
      percentChange24h: 3.2,
      percentChange7d: 6.5,
      percentChange30d: 12.8,
      percentChange3m: 18.5,
      percentChange6m: 30.2
    }
  ]

  // Generate more mock data
  for (let i = 2; i < 200; i++) {  // Changed from 100 to 200 items
    const basePrice = Math.random() * 1000 + (Math.random() < 0.1 ? 10000 : 0); // Some higher priced coins
    const marketCap = basePrice * (Math.random() * 100000000 + 1000000); // More realistic market cap
    const volume = marketCap * (Math.random() * 0.2); // Volume as a portion of market cap
    const percentChange24h = Math.random() * 20 - 10;
    const percentChange7d = Math.random() * 30 - 15;
    const percentChange30d = Math.random() * 60 - 30;
    const percentChange3m = Math.random() * 100 - 50;
    const percentChange6m = Math.random() * 200 - 100;
    
    mockData.push({
      id: `crypto-${i}`,
      name: `Cryptocurrency ${i}`,
      symbol: `CRY${i}`,
      price: basePrice,
      rank: i + 1,
      values: {
        USD: {
          price: basePrice,
          marketCap: marketCap,
          volume24h: volume,
          percentChange24h,
          percentChange7d,
          percentChange30d,
          percentChange3m,
          percentChange6m
        }
      },
      circulatingSupply: Math.floor(Math.random() * 1000000000),
      marketCap: marketCap,
      category: i % 4 === 0 ? "Currency" : 
               i % 4 === 1 ? "Smart Contract Platform" : 
               i % 4 === 2 ? "DeFi" : "NFT",
      percentChange24h,
      percentChange7d,
      percentChange30d,
      percentChange3m,
      percentChange6m
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

