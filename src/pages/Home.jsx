import { Link } from "react-router-dom";
import VenueList from "../components/VenueList";

function Home({ searchTerm }) {
  return (
    <div>
      <VenueList searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
