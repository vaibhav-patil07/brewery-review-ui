import { useNavigate } from "react-router-dom";

function BreweryCard(props) {
  const { brewery, token } = props;
  const navigate = useNavigate();
  const onClickCard = () => {
    navigate(`/dashboard/${brewery.id}`, { state: { token } });
  };
  return (
    <div className="card-container" onClick={onClickCard}>
      <h3>{brewery.name}</h3>
      <h4>Phone: {brewery.phone || "No Contact"}</h4>
      <a href={brewery.website_url} target="_blank" rel="noreferrer">
        {brewery.website_url ? "Visit Website" : "No Website"}
      </a>
    </div>
  );
}

export default BreweryCard;
