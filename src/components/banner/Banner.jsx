import "./banner.css";
import dateTime from "../../js/dateTime";
import timeZone from "./../../js/timeZone";
import { useEffect, useState } from "react";

const Banner = () => {
  const [time, setTime] = useState(dateTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(dateTime()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="banner">
      <div className="banner-wrapper">
        <h4>
          <span>Your local time:</span>
          <span> {time} </span>
          <span id="timezone"> / {timeZone()}</span>
        </h4>
        <h2>Currency Converter</h2>
      </div>
    </div>
  );
};

export default Banner;
