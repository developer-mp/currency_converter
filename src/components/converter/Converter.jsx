import "./converter.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Converter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("CAD");
  const [rate, setRate] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const API_URL_CURRENCY = `https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`;
    fetch(API_URL_CURRENCY)
      .then((res) => res.json())
      .then((data) => {
        setCurrency([...Object.keys(data.results)]);
      });
  }, [API_KEY]);

  async function getRate(baseCurrency, quoteCurrency) {
    const API_URL_RATES = `https://free.currconv.com/api/v7/convert?q=${baseCurrency}_${quoteCurrency}&compact=ultra&apiKey=${API_KEY}`;
    await axios
      .get(API_URL_RATES)
      .then((res) => {
        var quote = Object.values(res.data);
        var total = input * quote;
        setRate(total.toFixed(2));
        setShowResults(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleReset = () => {
    setBaseCurrency("USD");
    setQuoteCurrency("CAD");
    setInput(0);
    setShowResults(false);
  };

  return (
    <div className="converter">
      <div className="converter-wrapper">
        <form>
          <h2>Converter</h2>
          {showResults ? (
            <h2>
              {input} {baseCurrency} = {rate} {quoteCurrency}
            </h2>
          ) : (
            <h2>Please make selection</h2>
          )}
          <div className="converter-form">
            <label>Base currency:</label>
            <select
              type="text"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              {currency
                .sort()
                .filter(function (e) {
                  return e !== "ALL";
                })
                .map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <div className="converter-form">
            <label>Amount:</label>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="converter-form">
            <label>Quote currency:</label>
            <select
              type="text"
              value={quoteCurrency}
              onChange={(e) => setQuoteCurrency(e.target.value)}
            >
              {currency
                .sort()
                .filter(function (e) {
                  return e !== "ALL";
                })
                .map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <div className="converter-button">
            <div className="converter-button-item">
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
            <div className="converter-button-item">
              <button
                type="button"
                id="button"
                onClick={() => {
                  getRate(baseCurrency, quoteCurrency);
                }}
              >
                Convert
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Converter;
