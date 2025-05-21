function VenueGallery({ images }) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Image gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Gallery ${i + 1}`}
              className="rounded shadow-sm object-cover"
            />
          ))}
        </div>
      </div>
    );
  }

export default VenueGallery;