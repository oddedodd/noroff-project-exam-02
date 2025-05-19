
function DisplayVenue({ venue }) {
    return (
      <div className="bg-sand-light rounded-lg overflow-hidden">
        <img
          src={venue.media && venue.media.length > 0 ? venue.media[0].url : 'https://via.placeholder.com/400x300'}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-md font-semibold">{venue.name}</h3>
          <p className="text-sm text-gray-600">{venue.location.city}, {venue.location.country}</p>
          <p className="text-sm font-medium mt-2">{venue.price} kr natt</p>
        </div>
      </div>
    );
  }

export default DisplayVenue;