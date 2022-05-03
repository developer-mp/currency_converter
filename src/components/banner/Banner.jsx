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
        <div className="banner-time">
          <span id="banner-item">Your local time:</span>
          <span> {time} </span>
        </div>
        <div className="banner-location">
          <span id="banner-item">Your location:</span>
          <span> {timeZone()}</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
