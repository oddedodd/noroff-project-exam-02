import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { updateVenue } from '../api';

/**
 * Collapsible section component for form fields
 * @component
 */
function CollapsibleSection({ title, children, isOpen, onToggle }) {
    return (
        <div className="border border-cocoa-dark rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 bg-sand-light hover:bg-amber/10 transition-colors"
            >
                <h3 className="text-lg font-[nunito] font-medium text-cocoa-dark">{title}</h3>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
                <div className="p-4 bg-sand-light border-t border-cocoa-dark">
                    {children}
                </div>
            )}
        </div>
    );
}

/**
 * Modal component for editing venue information
 * @component
 * @param {Object} props
 * @param {Object} props.venue - The venue object to edit
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onUpdate - Function to handle venue updates
 * @returns {JSX.Element} EditVenue modal component
 */
function EditVenue({ venue, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: venue.name || '',
        description: venue.description || '',
        price: venue.price || '',
        maxGuests: venue.maxGuests || '',
        rating: venue.rating || 0,
        media: venue.media || [{ url: '', alt: '' }],
        meta: {
            wifi: venue.meta?.wifi || false,
            parking: venue.meta?.parking || false,
            breakfast: venue.meta?.breakfast || false,
            pets: venue.meta?.pets || false
        },
        location: {
            address: venue.location?.address || '',
            city: venue.location?.city || '',
            zip: venue.location?.zip || '',
            country: venue.location?.country || '',
            continent: venue.location?.continent || '',
            lat: venue.location?.lat || 0,
            lng: venue.location?.lng || 0
        }
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openSections, setOpenSections] = useState({
        basic: true, // Open by default
        location: false,
        media: false,
        amenities: false
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('meta.')) {
            const metaField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    [metaField]: type === 'checkbox' ? checked : value
                }
            }));
        } else if (name.startsWith('location.')) {
            const locationField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [locationField]: type === 'number' ? Number(value) : value
                }
            }));
        } else if (name.startsWith('media.')) {
            const [_, index] = name.split('.');
            const mediaIndex = parseInt(index);
            setFormData(prev => ({
                ...prev,
                media: prev.media.map((item, i) => 
                    i === mediaIndex ? { ...item, url: value, alt: prev.name } : item
                )
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }));
        }
    };

    const addMediaField = () => {
        setFormData(prev => ({
            ...prev,
            media: [...prev.media, { url: '', alt: prev.name }]
        }));
    };

    const removeMediaField = (index) => {
        setFormData(prev => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const venueData = {
                name: formData.name,
                description: formData.description,
                media: formData.media.filter(m => m.url.trim() !== ''),
                price: Number(formData.price),
                maxGuests: Number(formData.maxGuests),
                rating: Number(formData.rating),
                meta: formData.meta,
                location: formData.location
            };

            const data = await updateVenue(venue.id, venueData);
            onUpdate(data.data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4"
            onClick={handleOverlayClick}
        >
            <div 
                className="bg-sand-light p-4 rounded-lg w-full max-w-2xl relative my-4"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-cocoa-dark hover:text-coral"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-[dm_sans] font-bold mb-6 text-cocoa-dark">Edit Venue</h2>

                {error && (
                    <div className="mb-4 p-3 bg-coral text-sand-light rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <CollapsibleSection
                        title="Basic Information"
                        isOpen={openSections.basic}
                        onToggle={() => toggleSection('basic')}
                    >
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block font-[nunito] font-medium text-cocoa-dark">Venue Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block font-[nunito] font-medium text-cocoa-dark">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block font-[nunito] font-medium text-cocoa-dark">Price per night</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="maxGuests" className="block font-[nunito] font-medium text-cocoa-dark">Max Guests</label>
                                    <input
                                        type="number"
                                        id="maxGuests"
                                        name="maxGuests"
                                        value={formData.maxGuests}
                                        onChange={handleChange}
                                        className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="rating" className="block font-[nunito] font-medium text-cocoa-dark">Rating (0-5)</label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                />
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Location"
                        isOpen={openSections.location}
                        onToggle={() => toggleSection('location')}
                    >
                        <div className="space-y-4">
                            {['address', 'city', 'zip', 'country', 'continent'].map((field) => (
                                <div key={field}>
                                    <label htmlFor={`location.${field}`} className="block font-[nunito] font-medium text-cocoa-dark capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type="text"
                                        id={`location.${field}`}
                                        name={`location.${field}`}
                                        value={formData.location[field]}
                                        onChange={handleChange}
                                        className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                                        required={field !== 'continent'}
                                    />
                                </div>
                            ))}
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Media"
                        isOpen={openSections.media}
                        onToggle={() => toggleSection('media')}
                    >
                        <div className="space-y-4">
                            {formData.media.map((media, index) => (
                                <div key={index} className="p-4 border border-cocoa-dark rounded">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-[nunito] font-medium text-cocoa-dark">Image {index + 1}</h4>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeMediaField(index)}
                                                className="text-coral hover:text-coral-dark"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="url"
                                        name={`media.${index}`}
                                        value={media.url}
                                        onChange={handleChange}
                                        placeholder="Image URL"
                                        className="w-full border border-cocoa-dark rounded px-3 py-2"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addMediaField}
                                className="text-amber-dark hover:text-amber font-[nunito]"
                            >
                                + Add Image
                            </button>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Amenities"
                        isOpen={openSections.amenities}
                        onToggle={() => toggleSection('amenities')}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {['wifi', 'parking', 'breakfast', 'pets'].map((amenity) => (
                                <label key={amenity} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name={`meta.${amenity}`}
                                        checked={formData.meta[amenity]}
                                        onChange={handleChange}
                                        className="rounded border-cocoa-dark"
                                    />
                                    <span className="font-[nunito] text-cocoa-dark capitalize">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </CollapsibleSection>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-dark hover:bg-amber text-sand font-[nunito] uppercase font-light py-2 rounded mt-4 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Venue'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditVenue; 