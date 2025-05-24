import { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Modal component for editing user profile information
 * @component
 * @param {Object} props
 * @param {Object} props.user - The current user object
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onUpdate - Function to handle profile updates
 * @returns {JSX.Element} EditProfile modal component
 */
function EditProfile({ user, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        bio: user.bio || '',
        avatar: user.avatar?.url || '',
        banner: user.banner?.url || ''
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
                },
                body: JSON.stringify({
                    bio: formData.bio,
                    avatar: { url: formData.avatar },
                    banner: { url: formData.banner }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors?.[0]?.message || 'Failed to update profile');
            }

            const data = await response.json();
            onUpdate(data.data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-sand-light p-6 rounded-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-cocoa-dark hover:text-coral"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-[dm_sans] font-bold mb-6 text-cocoa-dark">Edit Profile</h2>

                {error && (
                    <div className="mb-4 p-3 bg-coral text-sand-light rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="bio" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                            maxLength="160"
                            rows="3"
                        />
                        <p className="text-xs text-cocoa-light font-[nunito] italic mt-1">
                            Maximum 160 characters
                        </p>
                    </div>

                    <div>
                        <label htmlFor="avatar" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Avatar URL</label>
                        <input
                            type="url"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>

                    <div>
                        <label htmlFor="banner" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Banner URL</label>
                        <input
                            type="url"
                            id="banner"
                            name="banner"
                            value={formData.banner}
                            onChange={handleChange}
                            className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
                            placeholder="https://example.com/banner.jpg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-dark hover:bg-amber text-sand font-[nunito] uppercase font-light py-2 rounded mt-4 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile; 