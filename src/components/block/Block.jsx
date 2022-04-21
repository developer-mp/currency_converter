import "./block.css";
import Quotes from "./../../components/quotes/Quotes";
import Converter from "../../components/converter/Converter";

const Block = () => {
  return (
    <div className="block">
      <div className="block-wrapper">
        <Quotes />
        <Converter />
      </div>
    </div>
  );
};

export default Block;
