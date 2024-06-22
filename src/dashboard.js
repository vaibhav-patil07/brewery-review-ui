import { useEffect, useState } from "react";
import "./App.css";
import { getBreweries } from "./services/brewery.service";
import BreweryCard from "./breweryCard";

function Dashboard() {
  const [breweries, setBreweries] = useState([]);
  useEffect(() => {
    fetchBreweries();
  }, []);
  const fetchBreweries = async () => {
    try {
      const response = await getBreweries();
      const data = response.data;
      setBreweries(data);
    } catch (error) {}
  };
  const renderBreweries = () => {
    return breweries.map((brewery) => {
      return <BreweryCard brewery={brewery} />;
    });
  };
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="title-container">
          <h1 className="title">Brewery Reviews</h1>
        </div>
      </div>
      <div className="list-container">{renderBreweries()}</div>
    </div>
  );
}

export default Dashboard;
