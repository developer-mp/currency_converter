import "./quotes.css";
import ReactCountryFlag from "react-country-flag";
import { useState, useEffect } from "react";
import axios from "axios";
import { quotesData } from "./quotesData";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const quotes_arr = [];
    let currencies = ["USD", "CAD", "GBP", "EUR", "JPY", "AUD"];
    for (var i = 0; i < currencies.length; i++) {
      const API_URL_QUOTES = `https://free.currconv.com/api/v7/convert?q=USD_${currencies[i]}&compact=ultra&apiKey=${API_KEY}`;
      quotes_arr.push(
        axios
          .get(API_URL_QUOTES)
          .then((res) => new Promise((resolve) => resolve(res.data)))
      );
    }
    Promise.all(quotes_arr).then((res) => {
      const quotes_arr_final = [];
      for (var k = 0; k < currencies.length; k++) {
        quotes_arr_final.push(Object.values(res[k]));
      }
      setQuotes(quotes_arr_final);
    });
  }, [API_KEY, quotes]);

  return (
    <div className="quotes">
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {quotesData.map((item) => (
            <tr key={item.id}>
              <td>
                <span>
                  <ReactCountryFlag
                    countryCode={item.country}
                    svg
                    style={{
                      width: "3em",
                      height: "2em",
                    }}
                  />
                </span>{" "}
                {item.name}
              </td>
              <td>{Number(quotes[item.id]).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Quotes;
