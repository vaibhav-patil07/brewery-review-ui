import { useEffect, useState } from "react";
import "./App.css";
import {
  getBreweries,
  getMetadata,
  searchBreweries,
} from "./services/brewery.service";
import BreweryCard from "./breweryCard";
import { useLocation } from "react-router-dom";
import Search from "antd/es/input/Search";
import { Pagination } from "antd";

function Dashboard() {
  const userState = useLocation().state;
  const token = userState ? userState.user.token : null;
  const [breweries, setBreweries] = useState([]);
  const [metaData, setMetadata] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  useEffect(() => {
    fetchBreweries();
    fetchMetatdata();
  }, []);

  const fetchBreweries = async () => {
    try {
      const response = await getBreweries(pageSize, currentPage);
      const data = response.data;
      setBreweries(data);
    } catch (error) {}
  };
  const renderBreweries = () => {
    return breweries.map((brewery) => {
      return <BreweryCard brewery={brewery} token={token} key={brewery.id} />;
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
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
  };

  const onPaginationChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const fetchMetatdata = async () => {
    try {
      const response = await getMetadata();
      const data = response.data;
      setMetadata(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBreweries();
  }, [pageSize]);

  useEffect(() => {
    fetchBreweries();
  }, [currentPage]);

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
        />
      </div>
      <div className="list-container">{renderBreweries()}</div>
      <div className="pages-container">
        <Pagination
          defaultCurrent={1}
          pageSize={pageSize}
          total={metaData.total}
          onShowSizeChange={onShowSizeChange}
          onChange={onPaginationChange}
        />
      </div>
    </div>
  );
}

export default Dashboard;
