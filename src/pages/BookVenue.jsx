import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VenueHero from "../components/VenueHero";
import BookingForm from "../components/BookingForm";
import BookingSidebar from "../components/BookingSidebar";
import { useRequireAuth } from "../hooks/useRequireAuth";

/**
 * Booking page component for venue reservations
 * @component
 * @returns {JSX.Element} Booking page component
 */
function BookVenue() {
    /**
     * Checks if the user is authenticated
     * @returns {Object|null} User object if authenticated, redirect to login page otherwise
     */
    const user = useRequireAuth();

    if (!user) {
        return null;
    }
    
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

  /**
   * Fetches venue data when component mounts or venue ID changes
   */
  useEffect(() => {
    /**
     * Fetches venue data from the API
     * @async
     */
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

  /**
   * Handles submission of booking data
   * @async
   * @param {Object} bookingData - The booking data to submit
   * @param {string} bookingData.dateFrom - Check-in date
   * @param {string} bookingData.dateTo - Check-out date
   * @param {number} bookingData.guests - Number of guests
   */
  const handleBookingSubmit = async (bookingData) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          dateFrom: bookingData.dateFrom,
          dateTo: bookingData.dateTo,
          guests: bookingData.guests,
          venueId: venue.id
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to create booking');
      }

      const data = await response.json();
      // Navigate to profile page after successful booking
      navigate('/profile');
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError(error.message);
    }
  };

  /**
   * Handles changes to the booking form data
   * @param {Object} newBookingData - Updated booking data
   * @param {string} newBookingData.checkIn - Check-in date
   * @param {string} newBookingData.checkOut - Check-out date
   * @param {number} newBookingData.guests - Number of guests
   * @param {number} newBookingData.nights - Number of nights
   * @param {number} newBookingData.totalPrice - Total price of booking
   */
  const handleFormChange = (newBookingData) => {
    setBookingData(newBookingData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-light flex items-center justify-center">
        <div className="text-xl text-coral-dark">Loading venue details...</div>
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

  return (
    <div className="bg-sand-light">
      <title>{venue.name + ' - Book this venue'}</title>
      <meta name="description" content={venue.description} />
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