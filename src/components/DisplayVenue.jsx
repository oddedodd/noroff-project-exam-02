import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VenueHero from './VenueHero';
import VenueDescription from './VenueDescription';
import VenueGallery from './VenueGallery';
import VenueSidebar from './VenueSidebar';
import ViewVenueBookings from './ViewVenueBookings';
import { Wifi, ParkingCircle, Utensils, Dog } from 'lucide-react';

/**
 * Component for displaying detailed information about a venue
 * @component
 * @returns {JSX.Element|null} The rendered venue display component or null if no venue data
 * 
 * @example
 * // Usage within a route:
 * <Route path="/venue/:id" element={<DisplayVenue />} />
 */
function DisplayVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Missing venue ID');
      setLoading(false);
      return;
    }

    /**
     * Fetches venue data from the API
     * @async
     * @function fetchVenue
     */
    async function fetchVenue() {
      try {
        setLoading(true);
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch venue');
        }

        const json = await response.json();
        setVenue(json.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching venue:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-light flex items-center justify-center">
        <div className="text-xl">Loading venue...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-coral-dark mb-4">{error}</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-coral hover:bg-coral-dark text-sand-light px-4 py-2 rounded hover:cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!venue) {
    return null;
  }

  // Map amenities to icons
  const amenities = [
    { name: 'Wifi', icon: <Wifi />, enabled: venue.meta?.wifi },
    { name: 'Parking', icon: <ParkingCircle />, enabled: venue.meta?.parking },
    { name: 'Breakfast', icon: <Utensils />, enabled: venue.meta?.breakfast },
    { name: 'Pets', icon: <Dog />, enabled: venue.meta?.pets }
  ].filter(amenity => amenity.enabled);

  return (
    <div className="bg-sand-light text-cocoa-dark">
      <title>{venue.name}</title>
      <meta name="description" content={venue.description.substring(0, 50) + "..."} />
      <VenueHero 
        name={venue.name} 
        location={`${venue.location.city}, ${venue.location.country}`} 
        image={venue.media?.[0]?.url || 'https://placehold.co/600x400'} 
      />

      <div className="min-h-screen max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <VenueDescription text={venue.description} />
          <VenueGallery 
            images={venue.media?.map(image => ({
              url: image.url,
              alt: image.alt || `Image of ${venue.name}` // Fallback alt text if none provided
            })) || []} 
          />
        </div>
        <div className="space-y-6">
          <VenueSidebar 
            amenities={amenities}
            price={venue.price}
            maxGuests={venue.maxGuests}
            rating={venue.rating}
            venueId={venue.id}
            bookings={venue.bookings || []}
          />
        </div>
      </div>
    </div>
  );
}

export default DisplayVenue;