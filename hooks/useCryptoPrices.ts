// lib/crypto.ts

const SYMBOLS = {
  bitcoin: "BTCUSDT",
  ethereum: "ETHUSDT",
  solana: "SOLUSDT",
  cardano: "ADAUSDT",
};

export async function fetchCryptoPrices() {
  const entries = await Promise.all(
    Object.entries(SYMBOLS).map(async ([name, symbol]) => {
      const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);

      if (!res.ok) throw new Error(`Failed to fetch ${name} price`);

      const data = await res.json();
      return [name, parseFloat(data.price)];
    })
  );

  const current = Object.fromEntries(entries);

  // Simulated previous prices (or you can cache/store them elsewhere)
  const previous = {
    ethereum: 2350,
    bitcoin: 63000,
    solana: 175,
    cardano: 0.45,
  };

  return { current, previous };
}
