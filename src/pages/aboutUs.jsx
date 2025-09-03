export default function AboutUsPage() {
  return (
    <div className="bg-primary text-secondary font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-6 bg-cover bg-center bg-no-repeat bg-[url('newbackground.jpg')]">
        <div className="absolute inset-0 bg-black/20"></div>{" "}
        {/* Overlay for better text readability */}
        <h1 className="relative text-5xl md:text-6xl font-bold text-white">
          Crystal Beauty
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl">
          Elegance, confidence, and luxury in every cosmetic product. Discover
          beauty that inspires you.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-accent mb-6">About Us</h2>
        <p className="text-lg md:text-xl text-secondary leading-relaxed">
          At{" "}
          <span className="font-semibold text-similarcolor">
            Crystal Beauty
          </span>
          , we believe that beauty is a form of self-expression. Our products
          are crafted with care, quality, and modern elegance in mind. From
          luxurious skincare to high-end makeup, each item enhances your natural
          glow and helps you feel confident every day.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-primary py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-accent mb-12">
          Why Choose Us?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-2xl border border-boardercolor shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-similarcolor mb-3">
              High Quality
            </h3>
            <p className="text-secondary leading-relaxed">
              Every product is carefully formulated to ensure premium quality
              and safety for all skin types.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-boardercolor shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-similarcolor mb-3">
              Cruelty-Free
            </h3>
            <p className="text-secondary leading-relaxed">
              Our commitment to ethical beauty means no animal testing and fully
              sustainable practices.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-boardercolor shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-similarcolor mb-3">
              Innovative Formulas
            </h3>
            <p className="text-secondary leading-relaxed">
              We blend science with beauty to create modern products that
              deliver results and elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">Our Mission</h2>
        <p className="text-lg md:text-xl text-secondary leading-relaxed">
          Our mission is simple – to empower individuals with products that
          inspire confidence, self-love, and elegance. Crystal Beauty is more
          than cosmetics; it's a celebration of your unique beauty.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-primary py-8 text-center">
        <p>© {new Date().getFullYear()} Crystal Beauty. All rights reserved.</p>
      </footer>
    </div>
  );
}
