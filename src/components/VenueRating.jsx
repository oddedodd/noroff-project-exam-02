import { Star } from 'lucide-react';

/**
 * Component for displaying venue rating
 * @component
 * @param {Object} props
 * @param {number|null} props.rating - The rating value to display (0-5)
 * @returns {JSX.Element} VenueRating component
 */
function VenueRating({ rating }) {
    // Validate and normalize the rating value
    const normalizedRating = typeof rating === 'number' && rating > 0 && rating <= 5 
        ? Math.floor(rating) // Convert to integer for star count
        : 0;

    return (
        <div className="flex items-center gap-1">
            <p className="text-sm font-medium">Rating: </p>
            {normalizedRating > 0 ? (
                <div className="flex">
                    {[...Array(normalizedRating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500" />
                    ))}
                    <span className="ml-1 text-sm text-cocoa-dark">
                        {rating.toFixed(1)}/5
                    </span>
                </div>
            ) : (
                <p className="text-sm font-medium">N/A</p>
            )}
        </div>
    );
}

export default VenueRating; 