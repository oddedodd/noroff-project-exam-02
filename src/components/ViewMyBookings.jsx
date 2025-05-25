import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

/**
 * Component for displaying a user's bookings/reservations
 * @component
 * @returns {JSX.Element} ViewMyBookings component
 */
function ViewMyBookings({ user }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingBookingId, setDeletingBookingId] = useState(null);

    useEffect(() => {
        /**
         * Fetches user's bookings from the API
         * @async
         */
        async function fetchBookings() {
            if (!user) return;

            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}/bookings?_venue=true`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                setBookings(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, [user]);

    /**
     * Deletes a booking from the API
     * @param {string} bookingId - The ID of the booking to delete
     * @async
     */
    const handleDeleteBooking = async (bookingId) => {
        if (!confirm('Are you sure you want to cancel this booking? This can not be undone.')) {
            return;
        }

        try {
            setDeletingBookingId(bookingId);
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }

            // Remove the booking from the local state
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
        } catch (err) {
            alert(`Error canceling booking: ${err.message}`);
        } finally {
            setDeletingBookingId(null);
        }
    };

    if (loading) {
        return (
            <section className="bg-sand px-4 pt-10">
                <div className="max-w-5xl mx-auto bg-sand-light p-4 rounded-lg">
                    <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My reservations</h2>
                    <div className="text-center text-cocoa font-[nunito]">Loading bookings...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-sand px-4 py-10">
                <div className="max-w-5xl mx-auto">
                <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My reservations</h2>
                    <div className="text-center text-red-600 font-[nunito] font-bold">Error: {error}</div>
                </div>
            </section>
        );
    }

    if (bookings.length === 0) {
        return (
            <section className="bg-[#fefaf1] px-4 py-10">
                <div className="max-w-5xl mx-auto">
                <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My reservations</h2>
                    <div className="text-center text-cocoa font-[nunito]">No bookings found. Start exploring venues to make your first reservation!</div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-sand px-4 py-10">
            <div className="max-w-5xl mx-auto bg-sand-light p-4 pb-10 rounded-lg">
            <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My reservations</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {bookings.map((booking) => {
                        const venue = booking.venue;
                        const startDate = new Date(booking.dateFrom);
                        const endDate = new Date(booking.dateTo);
                        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

                        return (
                            <div
                                key={booking.id}
                                className="bg-sand rounded-lg overflow-hidden hover:shadow-md transition"
                            >
                                <img
                                    src={venue.media?.[0]?.url || 'https://placehold.co/600x400'}
                                    alt={venue.name}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold font-[nunito] text-lg text-center text-cocoa-dark">{venue.name}</h3>
                                    <p className="text-md text-cocoa-light font-[nunito] text-center mb-2">
                                        {venue.location.city}, {venue.location.country}
                                    </p>
                                    <div className="space-y-1 text-sm text-cocoa-dark text-center font-[nunito]">
                                        <p className="font-medium">
                                            {nights} night{nights > 1 ? 's' : ''}
                                        </p>
                                        <p>
                                            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                                        </p>
                                        <p>
                                            {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteBooking(booking.id)}
                                        disabled={deletingBookingId === booking.id}
                                        className="mt-2 w-full bg-coral hover:bg-coral-dark text-sand font-[nunito] text-sm py-2 px-4 rounded transition-colors flex items-center justify-center hover:cursor-pointer"
                                        title="Cancel booking"
                                    >
                                        {deletingBookingId === booking.id ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Canceling...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                <span>Cancel Booking</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ViewMyBookings;