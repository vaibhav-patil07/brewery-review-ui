import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBreweryById } from "./services/brewery.service";
import { getBreweryRatingsById } from "./services/backend.service";
import { Rate } from "antd";

function BreweryDetails() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const [ratings, setRatings] = useState(0);
  const [votes, setVotes] = useState(0);
  const [hasUserVoted, setHasUserVoted] = useState(false);

  const fetchBreweryRatings = async () => {
    try {
      const ratingsResponse = await getBreweryRatingsById(id);
      const ratingsData = ratingsResponse.data;
      setRatings(ratingsData.ratings);
      setVotes(ratingsData.votes);
    } catch (error) {}
  };

  const fetchBreweryDetails = async () => {
    try {
      const response = await getBreweryById(id);
      const data = response.data;
      setBrewery(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBreweryDetails();
    fetchBreweryRatings();
  }, []);

  const getAddress = () => {
    let address = brewery.address_1;
    if (brewery.address_2) {
      address += ", " + brewery.address_2;
    }
    if (brewery.address_3) {
      address += ", " + brewery.address_3;
    }
    return address;
  };

  const onRateChange = (value) => {
    console.log(value);
  };
  return (
    <div className="brewery-details-container">
      <h1 className="title"> Brewery Details</h1>
      <div className="details">
        <div className="brewery-details">
          <h2>Name: {brewery.name}</h2>
          <h3>Phone: {brewery.phone || "No contact info."}</h3>
          <h3>
            Website:{" "}
            {brewery.website_url ? (
              <a href={brewery.website_url}>{brewery.website_url}</a>
            ) : (
              "No Website"
            )}
          </h3>
          <h3>Address: {getAddress()} </h3>
          <h3>City: {brewery.city} </h3>
          <h3>State: {brewery.state}</h3>
          <h3>Postal Code: {brewery.postal_code} </h3>
        </div>
        <div className="ratings">
          <h2>Ratings</h2>
          <h3>Average Rating: {votes > 0 ? ratings / votes : 0}</h3>
          <h3>Total Votes: {votes}</h3>
          <h3>Your Ratings:</h3>
          <Rate onChange={onRateChange} disabled={hasUserVoted} />
        </div>
      </div>
    </div>
  );
}

export default BreweryDetails;
