import { useState, useEffect } from 'react';

function Hero({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Hero - Setting debounced term:', searchTerm);
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Trigger search when debounced term changes
  useEffect(() => {
    console.log('Hero - Calling onSearch with:', debouncedSearchTerm);
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    console.log('Hero - Input changed:', value);
    setSearchTerm(value);
  };

  return (
    <section
      className="w-screen bg-cover bg-center text-white h-[60vh]"
      style={{
        backgroundImage: "url('/splash02.jpg')", // Replace with your actual image path
      }}
    >
      <div className="bg-black/50 w-full h-full py-24 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-5xl font-semibold font-['dm_sans'] text-sand uppercase mb-4">
          Where will you stay tonight?
        </h1>
        <p className="text-lg sm:text-3xl font-['nunito'] font-extralight mb-8 max-w-xl">
          From city views to beachside retreats — discover your next getaway.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl px-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Find a place to stay…"
            className="w-full bg-sand-light/80 sm:flex-1 px-6 py-3 rounded-2xl border-1 border-amber font-['nunito'] font-light text-palm placeholder-palm-light uppercase text-center focus:outline-none"
          />
          <button 
            onClick={() => {
              console.log('Hero - Button clicked with term:', searchTerm);
              onSearch(searchTerm);
            }}
            className="bg-coral hover:bg-coral-dark text-sand-light uppercase px-6 py-3 rounded-2xl font-medium hover:cursor-pointer"
          >
            Find my stay
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;