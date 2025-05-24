import { useEffect } from "react";
import AddVenueForm from "../components/AddVenueForm";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useNavigate } from "react-router-dom";

function AddVenue() {
    const user = useRequireAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (!user.venueManager) {
            navigate('/profile');
        }
    }, [user, navigate]);


    if (!user.venueManager) {
        return null;
    }

    return (
        <div className="min-h-screen bg-sand px-4 py-10">
            <AddVenueForm user={user} />
        </div>
    );
}

export default AddVenue;