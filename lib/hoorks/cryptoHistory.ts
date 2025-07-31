export async function fetchCryptoHistory(days = 90) {
  const limit = Math.min(days, 1000);
  const interval = '1d';

  const [btc, eth, sol, ada] = await Promise.all([
    fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=${limit}`).then(res => res.json()),
    fetch(`https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=${interval}&limit=${limit}`).then(res => res.json()),
    fetch(`https://api.binance.com/api/v3/klines?symbol=SOLUSDT&interval=${interval}&limit=${limit}`).then(res => res.json()),
    fetch(`https://api.binance.com/api/v3/klines?symbol=ADAUSDT&interval=${interval}&limit=${limit}`).then(res => res.json()),
  ]);

  const history = btc.map((entry: any, i: number) => ({
    timestamp: new Date(entry[0]).toISOString(),  // Open time
    bitcoin: parseFloat(entry[4]),                // Close price
    ethereum: parseFloat(eth[i]?.[4] || 0),
    solana: parseFloat(sol[i]?.[4] || 0),
    cardano: parseFloat(ada[i]?.[4] || 0),
  }));

  return Array.isArray(history) ? history : [];
}
