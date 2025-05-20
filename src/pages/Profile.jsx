import { useAuth } from '../hooks/useAuth';
import Logout from '../components/Logout';

function Profile() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        // Show nothing while checking authentication
        return null;
    }

    return (
        <div className="min-h-screen bg-sand flex flex-col items-center justify-center px-4">
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
                        <Logout />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;