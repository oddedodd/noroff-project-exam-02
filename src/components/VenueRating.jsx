import { Star } from 'lucide-react';

/**
 * Component for displaying venue rating
 * @component
 * @param {Object} props
 * @param {number|null} props.rating - The rating value to display (0-5)
 * @returns {JSX.Element} VenueRating component
 */
function VenueRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            <p className="text-sm font-medium">Rating: </p>
            {rating && rating > 0 ? (
                <div className="flex">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500" />
                    ))}
                </div>
            ) : (
                <p className="text-sm font-medium">N/A</p>
            )}
        </div>
    );
}

export default VenueRating; 