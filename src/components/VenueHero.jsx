/**
 * A hero component for displaying venue information with a background image
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the venue
 * @param {string} props.location - The location of the venue
 * @param {string} props.image - URL of the background image for the hero section
 * @returns {JSX.Element} A hero section with venue name, location and background image
 */
function VenueHero({ name, location, image }) {
    return (
        <section
        className="w-screen bg-cover bg-center h-[60vh]"
        style={{
            backgroundImage: `url(${image})`
        }}
        >
            <div className="bg-black/50 w-full h-full py-24 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl sm:text-5xl font-[dm_sans] uppercase font-bold text-sand-light">{name}</h1>
                <p className="text-xl sm:text-3xl mt-4 font-[nunito] font-light text-sand-light">{location}</p>
            </div>
        </section>
    );
  }

export default VenueHero;