function VenueDescription({ text }) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">About this venue</h2>
        {text.split('\n').map((p, i) => (
          <p key={i} className="mb-3">{p}</p>
        ))}
      </div>
    );
  }

export default VenueDescription;