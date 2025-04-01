import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/LittleCard.css";

function LittleCard({ title, number, percentage, icon }) {
  return (
    <>
      <div className="dashboard-item little-card">
        <div className="left-side-item">
          <h4 className="little-card-title">{title}</h4>
          <h3 className="little-card-number">{number}</h3>
          <h4 className="little-card-percentage">{percentage}</h4>
        </div>
        <div className="right-side-item">
          <FontAwesomeIcon
            className="little-card-icon"
            icon={icon}
          />
        </div>
      </div>
    </>
  );
}

export default LittleCard;
