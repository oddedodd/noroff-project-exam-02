// src/components/VenueList.jsx
import { useEffect, useState } from 'react';
import DisplayVenue from './DisplayVenue';

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch('https://v2.api.noroff.dev/holidaze/venues/');
        const json = await response.json();
        setVenues(json.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayCount(prevCount => prevCount + 9);
    setLoadingMore(false);
  };

  if (loading) return <div className="text-center mt-10">Loading venues...</div>;

  const displayedVenues = venues.slice(0, displayCount);
  const hasMoreVenues = displayCount < venues.length;

  return (
    <div className="bg-sand min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedVenues.map((venue) => (
            <DisplayVenue key={venue.id} venue={venue} />
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
      </div>
    </div>
  );
}

export default VenueList;