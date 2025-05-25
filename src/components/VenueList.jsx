// src/components/VenueList.jsx
import { useEffect, useState } from 'react';
import DisplayVenueCard from './DisplayVenueCard';

function VenueList({ searchTerm }) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setLoading(true);
        const url = searchTerm
          ? `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(searchTerm)}`
          : 'https://v2.api.noroff.dev/holidaze/venues/?sort=created';
        
        const response = await fetch(url);
        const json = await response.json();
        setVenues(json.data);
        setDisplayCount(9); // Reset display count when search changes
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [searchTerm]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayCount(prevCount => prevCount + 9);
    setLoadingMore(false);
  };

  const displayedVenues = venues.slice(0, displayCount);
  const hasMoreVenues = displayCount < venues.length;

  return (
    <div className="bg-sand min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center mt-10">Loading venues...</div>
        ) : venues.length === 0 ? (
          <div className="text-center mt-10">No venues found. Try a different search term.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedVenues.map((venue) => (
                <DisplayVenueCard key={venue.id} venue={venue} />
              ))}
            </div>
            {hasMoreVenues && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={`bg-coral hover:bg-coral-light hover:cursor-pointer text-sand-light uppercase font-semibold py-2 px-6 rounded-lg transition-colors duration-200 ${
                    loadingMore ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loadingMore ? 'Loading more venues...' : 'Load more venues'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VenueList;