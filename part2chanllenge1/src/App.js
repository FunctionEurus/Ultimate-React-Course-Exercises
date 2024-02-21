import { useEffect, useState } from "react";
import "./index.css";
// https://www.frankfurter.app/latest?amount=1&from=USD&to=EUR
export default function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getResult() {
        if (!amount || !from || !to) return;

        const controller = new AbortController();
        try {
          setIsLoading(true);

          const response = await fetch(
            `https://www.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );
          const data = await response.json();

          setResult(data.rates[to]);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        } finally {
          setIsLoading(false);
        }
        // console.log(data.rates[to]);
        return function () {
          controller.abort();
        };
      }
      if (amount && from === to) {
        setResult(amount);
        return;
      }
      getResult();
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        placeholder="Enter Amount"
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {!isLoading ? (
          amount && (
            <p>
              {amount} {from} equals {result} {to}
            </p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </p>
    </div>
  );
}
