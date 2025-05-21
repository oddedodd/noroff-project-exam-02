function VenueHero({ name, location, image }) {
    return (
      <div
        className="h-96 w-full bg-cover bg-center flex items-end p-8"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="bg-black bg-opacity-50 text-white p-4 rounded">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-md">{location}</p>
        </div>
      </div>
    );
  }

export default VenueHero;