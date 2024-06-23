import { useEffect, useState } from "react";
import "./App.css";
import { getBreweries, searchBreweries } from "./services/brewery.service";
import BreweryCard from "./breweryCard";
import { useLocation } from "react-router-dom";
import Search from "antd/es/input/Search";

function Dashboard() {
  const userState = useLocation().state;
  const token = userState ? userState.user.token : null;
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
      return <BreweryCard brewery={brewery} token={token} />;
    });
  };
  const searchBreweriesOnClick = async (query) => {
    try {
      if (query === "" || query === null) fetchBreweries();
      else {
        const response = await searchBreweries(query);
        const data = response.data;
        setBreweries(data);
      }
    } catch (error) {}
  };

  return (
    <div className="dashboard">
      <div className="title-container">
        <h1 className="title">Brewery Reviews</h1>
      </div>
      <div className="search-container">
        <Search
          placeholder="Search"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={searchBreweriesOnClick}
          // onSearch={}
        />
      </div>
      <div className="list-container">{renderBreweries()}</div>
    </div>
  );
}

export default Dashboard;
