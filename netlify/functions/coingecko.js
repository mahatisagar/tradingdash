// coingecko.js
import fetch from 'node-fetch';

export async function handler(event) {
  const { symbol = 'dogecoin', interval = '30' } = event.queryStringParameters;
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/market_chart?vs_currency=usd&interval=minute&days=1`
    );
    const json = await res.json();
    const prices = json.prices.map((p) => p[1]);
    return {
      statusCode: 200,
      body: JSON.stringify(prices),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch CoinGecko data' }),
    };
  }
}