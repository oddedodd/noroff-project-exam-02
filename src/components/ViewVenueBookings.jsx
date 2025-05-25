import { useState } from 'react';
import { Calendar, X } from 'lucide-react';

/**
 * Component for displaying a list of bookings for a venue in a modal
 * @component
 * @param {Object} props
 * @param {Array} props.bookings - Array of booking objects containing booking details
 * @returns {JSX.Element|null} ViewVenueBookings component or null if no bookings
 */
function ViewVenueBookings({ bookings }) {
    /** @type {[boolean, Function]} State for controlling modal visibility */
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!bookings || bookings.length === 0) {
        return null;
    }

    /**
     * Closes the bookings modal
     * @returns {void}
     */
    const handleClose = () => {
        setIsModalOpen(false);
    };

    /**
     * Handles clicks on the modal overlay to close the modal
     * @param {React.MouseEvent} e - Click event object
     * @returns {void}
     */
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    /**
     * Formats a date string into a localized date format
     * @param {string} dateString - ISO date string to format
     * @returns {string} Formatted date string
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-coral hover:text-coral-dark font-[nunito] hover:cursor-pointer"
            >
                ( Show bookings )
            </button>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-sand rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-sand p-4 border-b border-cocoa-light flex justify-between items-center">
                            <h2 className="text-2xl font-[dm_sans] font-bold text-cocoa-dark">
                                Venue Bookings
                            </h2>
                            <button
                                onClick={handleClose}
                                className="text-cocoa-dark hover:text-cocoa p-2"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            {bookings.map((booking) => (
                                <div 
                                    key={booking.id} 
                                    className="bg-sand-light p-4 rounded-lg"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                            <h3 className="text-lg font-[nunito] font-medium text-cocoa-dark">
                                                {booking.customer.name}
                                            </h3>
                                            <p className="text-cocoa font-[nunito]">
                                                {booking.customer.email}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-cocoa-dark font-[nunito]">
                                                From: {formatDate(booking.dateFrom)}
                                            </p>
                                            <p className="text-cocoa-dark font-[nunito]">
                                                To: {formatDate(booking.dateTo)}
                                            </p>
                                            <p className="text-cocoa-dark font-[nunito] font-medium">
                                                Guests: {booking.guests}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewVenueBookings;