import { useRequireAuth } from '../hooks/useRequireAuth';
import { useLogout } from '../hooks/useLogout';
import ProfileInfo from '../components/ProfileInfo';
import ViewMyVenues from '../components/ViewMyVenues';
import ViewMyBookings from '../components/ViewMyBookings';

function Profile() {
    const user = useRequireAuth();
    const logout = useLogout();

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-sand p-4 rounded-lg mx-auto">
            <ProfileInfo user={user} />
            {user.venueManager && <ViewMyVenues user={user} />}
            <ViewMyBookings user={user} />
            <div className="mb-8 text-center">
                <img src="/logo02.svg" alt="Holidaze logo" className="h-36 mx-auto mb-2" />
            </div>

            <div className="bg-sand-light p-8 rounded-lg w-full max-w-md text-center">
                <h2 className="text-4xl font-[dm_sans] font-bold mb-6 text-cocoa-dark">Profile</h2>
                
                <div className="space-y-4">
                    <p className="text-xl font-[nunito] text-cocoa-dark">
                        Hello, <span className="font-bold">{user.name}</span>!
                    </p>
                    
                    {user.bio && (
                        <div className="mt-4">
                            <h3 className="text-lg font-[nunito] font-medium text-cocoa-dark mb-2">Bio</h3>
                            <p className="text-cocoa-dark font-[nunito]">{user.bio}</p>
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            onClick={logout}
                            className="bg-coral hover:bg-coral-dark text-sand font-[nunito] uppercase font-light py-2 px-4 rounded hover:cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;