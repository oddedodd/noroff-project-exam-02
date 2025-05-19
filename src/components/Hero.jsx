function Hero() {
  return (
    <section
      className="w-screen bg-cover bg-center text-white h-[50vh]"
      style={{
        backgroundImage: "url('/splash01.jpg')", // Replace with your actual image path
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
            placeholder="Find a place to stay…"
            className="w-full bg-sand-light/80 sm:flex-1 px-6 py-3 rounded-2xl border-1 border-amber font-['nunito'] font-light text-palm placeholder-palm-light uppercase text-center focus:outline-none"
          />
          <button className="bg-coral hover:bg-coral-dark text-sand-light uppercase px-6 py-3 rounded-2xl font-medium hover:cursor-pointer">
            Find my stay
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;