import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VenueHero from "../components/VenueHero";
import BookingForm from "../components/BookingForm";
import BookingSidebar from "../components/BookingSidebar";

/**
 * Booking page component for venue reservations
 * @component
 * @returns {JSX.Element} Booking page component
 */
function BookVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    nights: 0,
    totalPrice: 0
  });

  useEffect(() => {
    async function fetchVenue() {
      try {
        setLoading(true);
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        
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

    if (id) {
      fetchVenue();
    }
  }, [id]);

  const handleBookingSubmit = async (bookingData) => {
    try {
      // TODO: Implement booking submission
      console.log('Booking data:', bookingData);
      // After successful booking, navigate to confirmation or profile page
      // navigate('/profile');
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  const handleFormChange = (newBookingData) => {
    setBookingData(newBookingData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fef4e8] flex items-center justify-center">
        <div className="text-xl">Loading venue details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fef4e8] flex items-center justify-center">
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

  return (
    <div className="bg-[#fef4e8]">
      <VenueHero 
        name={venue.name}
        location={`${venue.location.city}, ${venue.location.country}`}
        image={venue.media?.[0]?.url || 'https://placehold.co/600x400'}
      />

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BookingForm 
              venue={venue}
              onSubmit={handleBookingSubmit}
              onChange={handleFormChange}
            />

            <BookingSidebar 
              venue={venue}
              bookingData={bookingData}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookVenue;