import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="bg-coral text-sand">
        <h1 className="text-4xl font-[dm_sans] text-transform-uppercase font-bold">
          WELCOME TO HOLIDAZE 🌴 PRIMARY FONT (HEADLINES, BRANDING)
        </h1>
      </div>

      <button className="bg-amber-dark hover:bg-amber text-white px-4 py-2 rounded">
        Book Now
      </button>
    </>
  );
}

export default Home;
