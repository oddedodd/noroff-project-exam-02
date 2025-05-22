  import { Link } from 'react-router-dom';

/**
 * DisplayVenueCard component for rendering a venue card with image, name, location, price, and a link to the venue details page
 * @param {Object} venue - The venue object containing venue details
 * @param {string} venue.id - The unique identifier for the venue
 * @param {string} venue.name - The name of the venue
 * @param {string} venue.location.city - The city where the venue is located
 */
function DisplayVenueCard({ venue }) {
    return (
      <div className="bg-sand-light rounded-lg overflow-hidden">
        <img
          src={venue.media && venue.media.length > 0 ? venue.media[0].url : 'https://placehold.co/400x300'}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-md font-semibold">{venue.name}</h3>
          <p className="text-sm text-gray-600">{venue.location.city}, {venue.location.country}</p>
          <p className="text-sm font-medium mt-2">{venue.price} kr natt</p>
          <Link to={`/venue/${venue.id}`} className="text-sm text-blue-500 hover:text-blue-700">View Venue</Link>
        </div>
      </div>
    );
  }

export default DisplayVenueCard;