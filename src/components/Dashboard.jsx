import "../css/Dashboard.css";
import SalesMonthly from "./SalesMonthly";
import SalesProduct from "./ProductTypeSales.jsx";
import LittleCard from "./LittleCard";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faChartSimple,
  faMoneyBillTrendUp,
  faUserPlus,
  faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const admins = useSelector((state) => state.admins);
  const admin = admins.find((admin) => admin.logged == true);
  return (
    <>
      <h1 class="dashboard-title">Dashboard</h1>
      <main className="main-dashboard">
        <LittleCard
          title="Today's Moneys"
          number={"$53,000"}
          percentage="55%"
          icon={faMoneyBillTrendUp}
        />
        <LittleCard
          title="Today's Users"
          number={"2,300"}
          percentage="5%"
          icon={faUsersBetweenLines}
        />
        <LittleCard
          title="New Clients"
          number={"+3,020"}
          percentage="14%"
          icon={faUserPlus}
        />
        <LittleCard
          title="Total Sales"
          number={"$173,000"}
          percentage="8%"
          icon={faChartSimple}
        />
        <div className="dashboard-item welcome-item">
          {/* {admin.name} */}
          <h4>Built by, Petar Kolev</h4>
          <h2>Welcome back, Petar Kolev</h2>
          <h5>
            From colors, cards, typography to complex elements, you will find
            the full documentation. Here you can manage everything about your
            business and have to oppurtunity for something great!
          </h5>
          <a href="">Read more!</a>
        </div>
        <div className="dashboard-item style-item">
          <h3>UserManagmentApp</h3>
        </div>
        <div className="dashboard-item">
            <SalesMonthly />
        </div>
        <div className="dashboard-item">
            <SalesProduct />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
