import React, { useState } from "react";
import { countryList } from "./countryList";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const App = () => {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("PKR");
  const [amount, setAmount] = useState(1);
  const [msg, setMsg] = useState("");

  const fetchExchangeRate = async () => {
    const url = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
      setMsg(`${amount} ${fromCurr} = ${amount * rate} ${toCurr}`);
    } catch (error) {
      setMsg("Error fetching exchange rate");
    }
  };

  const updateFlagUrl = (code) => {
    const countryCode = countryList[code];
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value < 1 ? 1 : value);
  };

  return (
    <div className="min-h-screen bg-[#f5e3b3] flex items-center justify-center p-4">
      <div className="lg:min-w-[600px] lg:min-w-[550px]-lg bg-gradient-to-b from-green-600 to-green-200 p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
        <h1 className="text-2xl font-semibold italic mb-4">Currency Convertor</h1>
        <label className="block text-left font-medium mb-1">Enter Amount</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={handleAmountChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
        />

        <div className="flex items-center justify-between gap-2 mb-4">
          {/* From Currency */}
          <div className="w-1/2 text-left">
            <span className="block text-sm mb-1">From</span>
            <div className="flex items-center gap-2 bg-white rounded-md p-2 shadow-sm">
              <img
                src={updateFlagUrl(fromCurr)}
                alt="From Flag"
                className="w-6 h-6"
              />
              <select
                name="from"
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              >
                {Object.keys(countryList).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Switch icon */}
          <div className="pt-6">
            <span className="text-3xl font-semibold">⇆</span>
          </div>

          {/* To Currency */}
          <div className="w-1/2 text-left">
            <span className="block text-sm mb-1">To</span>
            <div className="flex items-center gap-2 bg-white rounded-md p-2 shadow-sm">
              <img
                src={updateFlagUrl(toCurr)}
                alt="To Flag"
                className="w-6 h-6"
              />
              <select
                name="to"
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              >
                {Object.keys(countryList).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="text-lg font-semibold border border-black py-2 my-4 rounded-md">
          {msg || `${amount} ${fromCurr} =${fetchExchangeRate()} ${toCurr}` }
        </p>

        <button
          onClick={fetchExchangeRate}
          className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition"
        >
          Get Exchange
        </button>
      </div>
    </div>
  );
};

export default App;
