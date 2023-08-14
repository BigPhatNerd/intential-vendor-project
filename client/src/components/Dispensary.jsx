import "./Dispensary.css";
const Dispensary = ({ isProductDispensed }) => {
  return (
    <div className="dispensary">
      <div className="dispensary-slot">
        {isProductDispensed && <div className="can"></div>}
      </div>
      <p>Collect your product here!</p>
    </div>
  );
};

export default Dispensary;
