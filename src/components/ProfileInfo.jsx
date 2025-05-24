import { useState, useEffect } from 'react';
import { UserCog } from 'lucide-react';
import EditProfile from './EditProfile';
import { useAuthState } from '../hooks/useAuthState';

/**
 * Displays a user's profile information including banner, avatar, name, bio and checks if the user is a venue manager
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - User object containing profile information
 * @param {Object} [props.user.banner] - User's banner image information
 * @param {string} [props.user.banner.url] - URL of the banner image
 * @param {Object} [props.user.avatar] - User's avatar image information  
 * @param {string} [props.user.avatar.url] - URL of the avatar image
 * @param {string} props.user.name - User's display name
 * @param {string} [props.user.bio] - User's biography text
 * @param {boolean} [props.user.venueManager] - Whether the user is a venue manager
 * @returns {JSX.Element|null} The rendered profile info component or null if no user provided
 */
function ProfileInfo({ user }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { updateAuthState } = useAuthState();

    useEffect(() => {
        async function fetchProfile() {
            if (!user?.name) return;

            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setProfileData(data.data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [user?.name]);

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="w-full max-w-5xl mt-10 bg-sand-light p-4 rounded-lg mx-auto text-center">
                <p className="text-cocoa font-[nunito]">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-5xl mt-10 bg-sand-light p-4 rounded-lg mx-auto text-center">
                <p className="text-coral font-[nunito]">Error loading profile: {error}</p>
            </div>
        );
    }

    const handleProfileUpdate = (updatedUser) => {
        setProfileData(updatedUser);
        updateAuthState(updatedUser);
    };

    return (
        <div className="w-full max-w-5xl mt-10 bg-sand-light p-4 rounded-lg mx-auto">
            {/* Cover Banner */}
            <div className="relative rounded-lg overflow-hidden">
                <img
                    src={profileData?.banner?.url}
                    alt={profileData?.banner?.alt || "Profile banner"}
                    className="w-full h-60 object-cover"
                />
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="absolute top-4 right-4 bg-sand-light hover:bg-amber text-sm px-3 py-1.5 rounded-lg flex items-center gap-1 font-[nunito] text-cocoa-dark hover:text-sand-light hover:cursor-pointer"
                >
                    Edit profile <UserCog size={16} />
                </button>
            </div>

            {/* Profile Info */}
            <div className="relative mt-[-50px] px-4 flex items-center gap-4">
                <img
                    src={profileData?.avatar?.url || "/images/avatar.jpg"}
                    alt={profileData?.avatar?.alt || `${profileData?.name}'s avatar`}
                    className="w-36 h-36 rounded-full border-4 border-sand-light object-cover"
                />
                <div className="flex flex-col gap-1 mt-8">
                    <h2 className="text-lg font-[dm_sans] capitalize font-semibold text-cocoa-dark mt-6">{profileData?.name}</h2>
                    <p className="text-sm text-cocoa-dark">{profileData?.bio || "No bio provided"}</p>
                    {profileData?.venueManager && (
                        <div className="flex gap-2 mt-2">
                            <span className="inline-block px-2.5 py-1.5 bg-amber-100 text-amber-dark text-sm font-[nunito] font-medium rounded-lg">
                                Venue Manager
                            </span>
                            <a 
                                href="/venue/add"
                                className="inline-block px-2.5 py-1.5 bg-coral hover:bg-coral-dark text-sand text-sm font-[nunito] font-medium rounded-lg"
                            >
                                Add Venue
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && profileData && (
                <EditProfile
                    user={profileData}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleProfileUpdate}
                />
            )}
        </div>
    );
}

export default ProfileInfo;