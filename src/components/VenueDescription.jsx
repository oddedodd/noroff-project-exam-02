/**
 * A component that displays the description text for a venue
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The description text to display for the venue
 * @returns {JSX.Element} A section containing the venue description with styled heading and text
 */
function VenueDescription({ text }) {
    return (
      <div>
        <h2 className="text-2xl font-[dm_sans] font-semibold mb-4 mt-6">About this venue</h2>
        <p className="text-lg font-[nunito] font-light text-cocoa-dark">{text}</p>
      </div>
    );
  }

export default VenueDescription;