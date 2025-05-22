/**
 * Sidebar component for booking summary
 * @component
 * @param {Object} props Component props
 * @param {Object} props.venue Venue data object
 * @param {Object} props.bookingData Current booking form data
 * @returns {JSX.Element} Booking sidebar component
 */
function BookingSidebar({ venue, bookingData }) {
  const { checkIn, checkOut, guests, nights, totalPrice } = bookingData;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded p-6 shadow space-y-4">
      <h3 className="text-lg font-semibold font-[dm_sans]">Booking Summary</h3>
      
      <div className="space-y-2">
        <p className="text-md font-medium font-[nunito]">Price per night: {venue.price} kr</p>
        <p className="text-sm text-gray-600 font-[nunito]">Maximum guests: {venue.maxGuests}</p>
        {venue.rating && (
          <p className="text-sm text-gray-600 font-[nunito]">Rating: {venue.rating}/5</p>
        )}
      </div>

      {checkIn && checkOut && (
        <div className="space-y-2 pt-2">
          <hr />
          <p className="text-sm font-medium font-[nunito]">Selected dates:</p>
          <p className="text-sm text-gray-600 font-[nunito]">
            From: {formatDate(checkIn)}
          </p>
          <p className="text-sm text-gray-600 font-[nunito]">
            To: {formatDate(checkOut)}
          </p>
          <p className="text-sm text-gray-600 font-[nunito]">
            {nights} {nights === 1 ? 'night' : 'nights'}
          </p>
          <p className="text-sm text-gray-600 font-[nunito]">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </p>
          {totalPrice > 0 && (
            <>
              <hr />
              <p className="text-md font-semibold font-[nunito]">Total price:</p>
              <p className="text-xl font-bold font-[nunito]">{totalPrice} kr</p>
            </>
          )}
        </div>
      )}

      {(!checkIn || !checkOut) && (
        <p className="text-sm text-gray-600 font-[nunito] pt-2">
          Please select dates in the booking form to see the total price
        </p>
      )}
    </div>
  );
}

export default BookingSidebar; 