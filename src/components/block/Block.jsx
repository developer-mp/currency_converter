import "./block.css";
import Quotes from "./../../components/quotes/Quotes";
import Converter from "../../components/converter/Converter";

const Block = () => {
  return (
    <div className="block">
      <div className="block-wrapper">
        <h1>Currency converter</h1>
        <div className="block-tables">
          <Converter />
          <Quotes />
        </div>
      </div>
    </div>
  );
};

export default Block;
