import "./quotes.css";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";
import axios from "axios";

const Quotes = () => {
  const [rateCAD, setRateCAD] = useState([]);
  const [rateGBP, setRateGBP] = useState([]);
  const [rateEUR, setRateEUR] = useState([]);
  const [rateJPY, setRateJPY] = useState([]);
  const [rateAUD, setRateAUD] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;

  async function GetQuote() {
    const quotes = [];
    let currencies = ["CAD", "GBP", "EUR", "JPY", "AUD"];

    for (var i = 0; i < currencies.length; i++) {
      const API_URL_RATES = `https://free.currconv.com/api/v7/convert?q=USD_${currencies[i]}&compact=ultra&apiKey=${API_KEY}`;
      quotes.push(
        axios
          .get(API_URL_RATES)
          .then((result) => new Promise((resolve) => resolve(result.data)))
      );
    }

    Promise.all(quotes).then((res) => {
      var quoteCAD = Object.values(res[0]);
      var quoteGBP = Object.values(res[1]);
      var quoteEUR = Object.values(res[2]);
      var quoteJPY = Object.values(res[3]);
      var quoteAUD = Object.values(res[4]);
      setRateCAD(Number(quoteCAD).toFixed(4));
      setRateGBP(Number(quoteGBP).toFixed(4));
      setRateEUR(Number(quoteEUR).toFixed(4));
      setRateJPY(Number(quoteJPY).toFixed(4));
      setRateAUD(Number(quoteAUD).toFixed(4));
    });
  }

  return (
    <div className="quotes">
      <div className="quotes-wrapper">
        <table>
          <tbody>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
            <tr>
              <td>
                <span>
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{
                      width: "3em",
                      height: "2em",
                    }}
                  />
                </span>{" "}
                USD
              </td>
              <td>1.0000</td>
            </tr>
            <tr>
              <td>
                <span>
                  <ReactCountryFlag
                    countryCode="CA"
                    svg
                    style={{
                      width: "3em",
                      height: "2em",
                    }}
                  />
                </span>{" "}
                CAD
              </td>
              <td>{rateCAD}</td>
            </tr>
            <tr>
              <td>
                <span>
                  <ReactCountryFlag
                    countryCode="GB"
                    svg
                    style={{
                      width: "3em",
                      height: "2em",
                    }}
                  />
                </span>
                GBP
              </td>
              <td>{rateGBP}</td>
            </tr>
            <tr>
              <td>
                <span>
                  <ReactCountryFlag
                    countryCode="EU"
                    svg
                    style={{
                      width: "3em",
                      height: "2em",
                    }}
                  />
                </span>
                EUR
              </td>
              <td>{rateEUR}</td>
            </tr>
            <tr id="quotes-jpy">
              <td>
                <span>
                  <ReactCountryFlag
                    countryCode="JP"
                    svg
                    style={{
                      width: "3em",
                      height: "2em",
                    }}
                  />
                </span>
                JPY
              </td>
              <td>{rateJPY}</td>
            </tr>
            <tr id="quotes-aud">
              <td>
                <span>
                  <ReactCountryFlag
                    countryCode="AU"
                    svg
                    style={{
                      width: "3em",
                      height: "2em",
                    }}
                  />
                </span>
                AUD
              </td>
              <td>{rateAUD}</td>
            </tr>
          </tbody>
        </table>
        <div className="quotes-button">
          <button
            type="button"
            onClick={() => {
              GetQuote();
            }}
          >
            Get quotes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
