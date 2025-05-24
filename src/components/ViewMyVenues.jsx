import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import GetVenueBookings from './GetVenueBookings';

/**
 * Component for displaying venues created by the user
 * @component
 * @param {Object} user - The current user object
 * @returns {JSX.Element} ViewMyVenues component
 */
function ViewMyVenues({ user }) {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        /**
         * Fetches user's venues from the API
         * @async
         */
        async function fetchVenues() {
            if (!user) return;

            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}/venues`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch venues');
                }

                const data = await response.json();
                setVenues(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchVenues();
    }, [user]);

    if (loading) {
        return (
            <section className="bg-sand px-4 py-10">
                <div className="max-w-5xl mx-auto bg-sand-light p-4 rounded-lg">
                    <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My Venues</h2>
                    <div className="text-center text-cocoa font-[nunito]">Loading venues...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-sand px-4 py-10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My Venues</h2>
                    <div className="text-center text-red-600 font-[nunito] font-bold">Error: {error}</div>
                </div>
            </section>
        );
    }

    if (venues.length === 0) {
        return (
            <section className="bg-sand px-4 py-10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My Venues</h2>
                    <div className="text-center text-cocoa font-[nunito]">No venues found. Start by creating your first venue!</div>
                </div>
            </section>
        );
    }

    const handleDeleteVenue = async (venueId) => {  
        if (window.confirm('Are you sure you want to delete this venue?')) { /* should be a modal – will fix if I get the time */
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete venue');
                }

                // Remove venue from state to update UI
                setVenues(venues.filter(v => v.id !== venueId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <section className="bg-sand px-4 pt-10">
            <div className="max-w-5xl mx-auto bg-sand-light p-4 pb-10 rounded-lg">
                <h2 className="text-xl text-cocoa-dark font-[dm_sans] font-bold uppercase mb-6">My Venues</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                        <div
                            key={venue.id}
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
                                        ${venue.price} per night
                                    </p>
                                    <p>
                                        Max {venue.maxGuests} guest{venue.maxGuests > 1 ? 's' : ''}
                                    </p>
                                    <div className="text-center mt-2">
                                        <hr className="w-1/2 mx-auto border-t-1 border-cocoa-light my-4" />
                                        <p className="font-semibold font-[nunito] text-sm text-center text-cocoa-dark">This venue has:</p>
                                        <GetVenueBookings venueId={venue.id} />
                                    </div>
                                    <button
                                        onClick={() => handleDeleteVenue(venue.id)}
                                        className="w-full mt-4 bg-coral hover:bg-coral-dark text-sand font-[nunito] text-sm py-2 px-4 rounded transition-colors flex items-center justify-center hover:cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        <span>Delete Venue</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ViewMyVenues;