import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBreweryById } from "./services/brewery.service";
import {
  getBreweryRatingsById,
  getBreweryRatingsByUser,
  saveRatings,
} from "./services/backend.service";
import { Button, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";

function BreweryDetails() {
  const userState = useLocation().state;
  const token = userState ? userState.token : null;
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const [ratings, setRatings] = useState(0);
  const [votes, setVotes] = useState(0);
  const [hasUserVoted, setHasUserVoted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [description, setDescription] = useState("");
  const fetchBreweryRatings = async () => {
    try {
      const ratingsResponse = await getBreweryRatingsById(id);
      const ratingsData = ratingsResponse.data;
      setRatings(ratingsData.ratings);
      setVotes(ratingsData.votes);
      console.log(ratingsData);
    } catch (error) {}
  };

  const fetchBreweryDetails = async () => {
    try {
      const response = await getBreweryById(id);
      const data = response.data;
      setBrewery(data);
    } catch (error) {}
  };

  const fetchUserRatings = async () => {
    try {
      const response = await getBreweryRatingsByUser(id, token);
      const data = response.data;
      setUserRating(data.ratings);
      setDescription(data.description);
      setHasUserVoted(true);
    } catch (error) {}
  };
  useEffect(() => {
    fetchBreweryDetails();
    fetchBreweryRatings();
    fetchUserRatings();
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
    setUserRating(value);
  };

  const onUserVote = async () => {
    try {
      const response = await saveRatings(id, token, userRating, description);
      setHasUserVoted(true);
    } catch (error) {
      console.log(error);
    }
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
          <Rate
            onChange={onRateChange}
            disabled={hasUserVoted}
            value={userRating}
          />
          <TextArea
            placeholder="Description"
            className="rate-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={hasUserVoted}
          />
          <div>
            <Button
              type="primary"
              disabled={hasUserVoted}
              onClick={onUserVote}
              className="rate-button"
            >
              Rate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreweryDetails;
