import { useState } from "react";
import VenueList from "../components/VenueList";
import Hero from "../components/Hero";

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <VenueList searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
