import { useState, useEffect } from "react";

/**
 * Booking form component for venue reservations
 * @component
 * @param {Object} props Component props
 * @param {Object} props.venue Venue data object
 * @param {Function} props.onSubmit Callback function when form is submitted
 * @param {Function} props.onChange Callback function when form values change
 * @returns {JSX.Element} Booking form component
 */
function BookingForm({ venue, onSubmit, onChange }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState(null);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * venue.price;

  // Emit changes to parent component
  useEffect(() => {
    if (checkIn || checkOut || guests !== 1) {
      onChange({
        checkIn,
        checkOut,
        guests: parseInt(guests),
        nights,
        totalPrice
      });
    }
  }, [checkIn, checkOut, guests]); // Only depend on user input values

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates');
      return;
    }

    if (guests > venue.maxGuests) {
      setError(`Maximum ${venue.maxGuests} guests allowed`);
      return;
    }

    onSubmit({
      dateFrom: checkIn,
      dateTo: checkOut,
      guests: parseInt(guests),
      venueId: venue.id
    });
  };

  return (
    <div className="md:col-span-2 bg-white rounded p-6 shadow">
      <h2 className="text-xl font-semibold mb-4 font-[dm_sans]">Book your stay</h2>
      <p className="text-md font-medium mb-6 font-[nunito]">
        <span className="font-bold">{venue.name}</span>, {venue.location.city}, {venue.location.country}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-coral text-sand-light rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm mb-1 font-[nunito]">CHECK-IN</label>
          <input
            type="date"
            className="w-full border border-gray-400 rounded px-3 py-2 font-[nunito]"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-1 font-[nunito]">CHECK-OUT</label>
          <input
            type="date"
            className="w-full border border-gray-400 rounded px-3 py-2 font-[nunito]"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-1 font-[nunito]">GUESTS</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 font-[nunito]"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            {Array.from({ length: venue.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#ef665b] hover:bg-[#e4534a] text-white font-semibold py-2 rounded mt-4 font-[nunito]"
        >
          BOOK NOW
        </button>
      </form>
    </div>
  );
}

export default BookingForm; 