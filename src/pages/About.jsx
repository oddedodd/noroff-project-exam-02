function About() {
  return (
    <div className="bg-gray-900 min-h-screen text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                We are dedicated to providing cutting-edge solutions that
                empower developers and businesses to create exceptional web
                experiences. Our platform combines innovative technology with
                user-friendly tools to make web development more accessible and
                efficient.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
              <p className="text-gray-300 leading-relaxed">
                Our team consists of passionate developers, designers, and
                innovators who are committed to pushing the boundaries of what's
                possible on the web. With years of combined experience, we
                understand the challenges developers face and strive to provide
                solutions that make their work easier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-300">
                    Constantly pushing boundaries and exploring new
                    technologies.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-gray-300">
                    Delivering robust and reliable solutions that exceed
                    expectations.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-gray-300">
                    Building and supporting a strong developer community.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
