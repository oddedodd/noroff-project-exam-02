import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddVenueForm( { user } ) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    media: [], 
    price: '',
    maxGuests: '',
    rating: 0, 
    meta: { 
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: { 
      address: '',
      city: '',
      zip: '',
      country: '', 
      lat: 0,
      lng: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.location) {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      meta: { ...prev.meta, [name]: checked },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      // Format the data according to API requirements
      const venueData = {
        name: form.name,
        description: form.description,
        media: form.media
          .filter(media => media.url && media.url.trim() !== '')
          .map(media => ({ url: media.url, alt: form.name })),
        price: Number(form.price),
        maxGuests: Number(form.maxGuests),
        rating: Number(form.rating) || 0,
        meta: form.meta,
        location: {
          ...form.location,
          lat: Number(form.location.lat) || 0,
          lng: Number(form.location.lng) || 0,
        }
      };

      const response = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify(venueData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || 'Failed to create venue');
      }

      const data = await response.json();
      console.log('Venue created successfully:', data);
      navigate('/profile'); // Redirect to profile page after successful creation
    } catch (err) {
      setError(err.message);
      console.error('Error creating venue:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-sand-light p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold font-[dm_sans] text-center mb-6 text-cocoa-dark">Add Venue</h1>
      {error && (
        <div className="mb-4 p-3 bg-amber-light text-amber-dark rounded">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium font-[nunito] text-md text-cocoa-dark">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <h2 className="font-bold text-lg mt-6 mb-4 font-[dm_sans] text-cocoa-dark uppercase">Location</h2>
          {['address', 'city', 'zip', 'country',].map((field) => (
            <div key={field}>
              <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">{field}</label>
              <input
                name={field}
                value={form.location[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
                required={field !== 'continent'}
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
            <div>
              <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">Latitude</label>
              <input
                name="lat"
                type="number"
                step="any"
                value={form.location.lat}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">Longitude</label>
              <input
                name="lng"
                type="number"
                step="any"
                value={form.location.lng}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
          </div>
          <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">Images</label> 
          <div className="border rounded p-6 bg-green-100 flex flex-col items-center text-gray-500">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={form.media[0]?.url || ''}
                  onChange={(e) => {
                    const newMedia = [...form.media];
                    newMedia[0] = { url: e.target.value, alt: form.name };
                    setForm(prev => ({...prev, media: newMedia}));
                  }}
                  placeholder="Enter image URL"
                  className="flex-1 border px-3 py-2 rounded"
                  required
                />
              </div>
              {form.media.slice(1).map((media, index) => (
                <div key={index + 1} className="flex gap-2">
                  <input
                    type="url"
                    value={media.url}
                    onChange={(e) => {
                      const newMedia = [...form.media];
                      newMedia[index + 1] = { url: e.target.value, alt: form.name };
                      setForm(prev => ({...prev, media: newMedia}));
                    }}
                    placeholder="Enter image URL"
                    className="flex-1 border px-3 py-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        media: prev.media.filter((_, i) => i !== index + 1)
                      }));
                    }}
                    className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setForm(prev => ({
                    ...prev,
                    media: [...prev.media, { url: '', alt: form.name }]
                  }));
                }}
                className="self-start px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 hover:cursor-pointer"
              >
                + Add Image URL
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg mt-4 mb-4 font-[dm_sans] text-cocoa-dark uppercase">Additional Information</h2>
          <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">Price per night</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
          <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">Max guests</label>
          <input
            name="maxGuests"
            type="number"
            min="1"
            value={form.maxGuests}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
          <label className="font-medium font-[nunito] text-md text-cocoa-dark capitalize">Rating (0-5)</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg mt-4 mb-4 font-[dm_sans] text-cocoa-dark uppercase">Amenities</h2>
          {['wifi', 'parking', 'breakfast', 'pets'].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name={amenity}
                checked={form.meta[amenity]}
                onChange={handleCheckbox}
              />
              <span className="capitalize font-[nunito] text-md text-cocoa-dark">{amenity}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-coral hover:bg-coral-dark hover:cursor-pointer text-sand-light font-semibold py-2 rounded mt-6 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Creating Venue...' : 'ADD VENUE'}
        </button>
      </form>
    </div>
  );
}