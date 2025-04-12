// yahoo.js
import fetch from 'node-fetch';

export async function handler(event) {
  const { symbol, interval = '30s', range = '5m' } = event.queryStringParameters;
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
    const res = await fetch(url);
    const json = await res.json();
    const prices = json.chart.result[0].indicators.quote[0].close;
    return {
      statusCode: 200,
      body: JSON.stringify({ prices: prices.map((p) => ({ close: p })) }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Yahoo data' }),
    };
  }
}