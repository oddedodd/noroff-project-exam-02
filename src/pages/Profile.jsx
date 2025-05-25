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
        <>
            <title>{user.name + ' - Holidaze user profile'}</title>
            <meta name="description" content={user.bio + ' update your profile, reservations and venues' || 'Holidaze user profile'} />
            <div className="min-h-screen bg-sand p-4 rounded-lg mx-auto">
                <ProfileInfo user={user} />
                {user.venueManager && <ViewMyVenues user={user} />}
                <ViewMyBookings user={user} />
                <div className="max-w-5xl mx-auto bg-sand-light p-4 rounded-lg">
                    <button
                        onClick={logout}
                        className="bg-palm hover:bg-palm-dark text-sand font-[nunito] uppercase font-light py-2 px-24 rounded hover:cursor-pointer text-lg mx-auto block"
                    >
                        Logout
                    </button>
                </div>
                <div className="mb-8 py-24 text-center">
                    <img src="/logo02.svg" alt="Holidaze logo" className="h-36 mx-auto mb-2" />
                </div>
            </div>
        </>
    );
}

export default Profile;