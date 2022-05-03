import "./converter.css";
import { useEffect, useState } from "react";
import axios from "axios";
import arrows from "../../img/arrows.png";

const Converter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD United States Dollar");
  const [quoteCurrency, setQuoteCurrency] = useState("CAD Canadian Dollar");
  const [total, setTotal] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const API_URL_CURRENCIES = `https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`;
    axios.get(API_URL_CURRENCIES).then((res) => {
      const obj = [...Object.values(res.data.results)].reduce(
        (acc, val) => ({ ...acc, [val.id]: val.id + " " + val.currencyName }),
        {}
      );
      setCurrency([...Object.values(obj)]);
    });
  }, [API_KEY]);

  async function getQuote(baseCurrency, quoteCurrency) {
    const API_URL_QUOTES = `https://free.currconv.com/api/v7/convert?q=${baseCurrency.substring(
      0,
      3
    )}_${quoteCurrency.substring(0, 3)}&compact=ultra&apiKey=${API_KEY}`;
    if (baseCurrency !== quoteCurrency && input !== "") {
      await axios
        .get(API_URL_QUOTES)
        .then((res) => {
          var quote = Object.values(res.data);
          var result = input * quote;
          setTotal(result.toFixed(2));
          setShowResults(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (baseCurrency !== quoteCurrency && input === "") {
      setMessage("Please add amount");
    } else {
      setMessage(
        "You selected the same currency! Please select a different one"
      );
    }
  }

  const handleSwap = () => {
    var temp = baseCurrency;
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(temp);
  };

  const handleReset = () => {
    setBaseCurrency("USD United States Dollar");
    setQuoteCurrency("CAD Canadian Dollar");
    setInput("");
    setShowResults(false);
    setMessage("");
  };

  const addComma = (n) => {
    var num = n.split(".");
    var dec = num[1];
    return dec === undefined
      ? parseInt(num[0].replace(/,/g, "")).toLocaleString()
      : parseInt(num[0].replace(/,/g, "")).toLocaleString() + "." + dec;
  };

  return (
    <div className="converter">
      <form>
        {showResults ? (
          <h1>
            {addComma(input) === "NaN" ? 0 : addComma(input)}{" "}
            {baseCurrency.substring(0, 3)} = {addComma(total)}{" "}
            {quoteCurrency.substring(0, 3)}
          </h1>
        ) : (
          <div>
            {message === "" ? (
              <h1>Please make selection</h1>
            ) : (
              <h3>{message}</h3>
            )}
          </div>
        )}
        <div className="converter-form">
          <label>Base currency:</label>
          <select
            type="text"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            {currency.sort().map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="converter-arrows">
          <img
            src={arrows}
            alt=""
            onClick={() => {
              handleSwap();
            }}
          />
        </div>
        <div className="converter-form">
          <label>Quote currency:</label>
          <select
            type="text"
            value={quoteCurrency}
            onChange={(e) => setQuoteCurrency(e.target.value)}
          >
            {currency.sort().map((option) => (
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
            placeholder="0"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <div className="converter-button">
          <div className="converter-button-item">
            <button
              type="button"
              id="button"
              onClick={() => {
                getQuote(baseCurrency, quoteCurrency);
              }}
            >
              Convert
            </button>
          </div>
          <div className="converter-button-item">
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Converter;
