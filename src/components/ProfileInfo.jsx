import { UserCog } from 'lucide-react';

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
    if (!user) {
        return null;
    }

    return (
        <div className="w-full max-w-5xl mt-10 bg-sand-light p-4 rounded-lg mx-auto">
            {/* Cover Banner */}
            <div className="relative rounded-lg overflow-hidden">
                <img
                    src={user.banner?.url}
                    alt="Profile banner"
                    className="w-full h-60 object-cover"
                />
                <button
                    className="absolute top-4 right-4 bg-sand-light hover:bg-amber text-sm px-3 py-1.5 rounded-lg flex items-center gap-1 font-[nunito] text-cocoa-dark hover:text-sand-light  hover:cursor-pointer"
                >
                    Edit profile <UserCog size={16} />
                </button>
            </div>

            {/* Profile Info */}
            <div className="relative mt-[-50px] px-4 flex items-center gap-4">
                <img
                    src={user.avatar?.url || "/images/avatar.jpg"}
                    alt={`${user.name}'s avatar`}
                    className="w-36 h-36 rounded-full border-4 border-sand-light object-cover"
                />
                <div className="flex flex-col gap-1 mt-8">
                    <h2 className="text-lg font-[dm_sans] capitalize font-semibold text-cocoa-dark mt-6">{user.name}</h2>
                    <p className="text-sm text-cocoa-dark">{user.bio || "No bio provided"}</p>
                    {user.venueManager && (
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
        </div>
    );
}

export default ProfileInfo;