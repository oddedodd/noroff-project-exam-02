import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome Home</h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover amazing features and capabilities of our platform. We're
            here to help you succeed.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Get Started
            </button>
            <Link
              to="/about"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
