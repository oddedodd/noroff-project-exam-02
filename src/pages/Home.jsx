import { useState } from "react";
import VenueList from "../components/VenueList";
import Hero from "../components/Hero";

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    console.log('Home - handleSearch called with:', term);
    setSearchTerm(term);
  };

  console.log('Home - Current searchTerm:', searchTerm);

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <VenueList searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
