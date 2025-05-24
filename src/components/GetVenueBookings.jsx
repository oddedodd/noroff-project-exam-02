import { useState, useEffect } from 'react';

/**
 * Component for displaying the number of bookings for a specific venue
 * @component
 * @param {Object} props
 * @param {string} props.venueId - The ID of the venue to fetch bookings for
 * @returns {JSX.Element} GetVenueBookings component
 */
function GetVenueBookings({ venueId }) {
    /** @type {[number, Function]} State for storing the number of bookings */
    const [bookingCount, setBookingCount] = useState(0);
    
    /** @type {[boolean, Function]} State for tracking loading status */
    const [loading, setLoading] = useState(true);
    
    /** @type {[string|null, Function]} State for storing error messages */
    const [error, setError] = useState(null);

    useEffect(() => {
        /**
         * Fetches venue details including bookings from the API
         * @async
         * @throws {Error} When the API request fails
         * @returns {Promise<void>}
         */
        async function fetchVenueBookings() {
            if (!venueId) {
                console.log('No venueId provided');
                return;
            }

            console.log('Fetching venue with bookings for venueId:', venueId);
            const url = `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`;
            console.log('API URL:', url);

            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('API Error Response:', errorData);
                    throw new Error('Failed to fetch venue bookings');
                }

                const data = await response.json();
                console.log('API Response for venue', venueId, ':', data);
                const bookings = data.data.bookings || [];
                console.log('Number of bookings found:', bookings.length);
                setBookingCount(bookings.length);
            } catch (err) {
                console.error('Error fetching venue bookings:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchVenueBookings();
    }, [venueId]);

    if (loading) {
        return <span className="text-cocoa font-[nunito]">Loading bookings...</span>;
    }

    if (error) {
        return <span className="text-red-600 font-[nunito]">Error loading bookings</span>;
    }

    return (
        <span className="text-cocoa-dark font-[nunito] font-medium">
            {bookingCount} booking{bookingCount !== 1 ? 's' : ''}
        </span>
    );
}

export default GetVenueBookings;