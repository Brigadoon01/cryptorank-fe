export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  rank: number;
  values: {
    USD: {
      price: number;
      percentChange24h?: number;
      percentChange7d?: number;
      percentChange30d?: number;
      percentChange3m?: number;
      percentChange6m?: number;
      marketCap?: number;
      volume24h?: number;
    };
  };
  circulatingSupply: number;
  marketCap: number;
  category: string;
  percentChange24h?: number;
  percentChange7d?: number;
  percentChange30d?: number;
  percentChange3m?: number;
  percentChange6m?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface ConversionRate {
  from: string;
  to: string;
  rate: number;
}

/*  "id": 0,
      "key": "string",
      "symbol": "string",
      "name": "string",
      "type": "coin",
      "rank": 0,
      "categoryId": 0,
      "lastUpdated": 0,
      "totalSupply": "string",
      "maxSupply": "string",
      "circulatingSupply": "string",
      "volume24hBase": "string",
      "images": "string",
      "price": "string",
      "high24h": "string",
      "low24h": "string",
      "volume24h": "string",
      "marketCap": "string",
      "fullyDilutedValuation": "string",
      "ath": "string",
      "atl": "string",
      "percentChange": "string",
      "sparkline7d": "string"*/
