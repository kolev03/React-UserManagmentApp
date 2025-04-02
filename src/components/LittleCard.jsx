import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/LittleCard.css";

function LittleCard({ title, number, percentage, icon }) {
  return (
    <>
      <div className="dashboard-item little-card">
        <div className="left-side-item">
          <h1 className="little-card-title">{title}</h1>
          <h2 className="little-card-number">{number}</h2>
          <h3 className="little-card-percentage">{percentage}</h3>
        </div>
        <div className="right-side-item">
          <FontAwesomeIcon className="little-card-icon" icon={icon} />
        </div>
      </div>
    </>
  );
}

export default LittleCard;
