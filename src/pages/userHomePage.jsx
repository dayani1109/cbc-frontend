import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

// Mock data for the hero carousel (replace with actual data later)
const heroSlides = [
  {
    id: 1,
    title: "Crystal Clear Skin",
    subtitle: "Achieve a flawless glow with our nourishing serum.",
    image: "/image1.jpg", // Replace with your actual image
    cta: "Shop Serums",
  },
  {
    id: 2,
    title: "Radiant Beauty",
    subtitle: "Elevate your look with our premium makeup collection.",
    image: "/image2.jpg", // Replace with your actual image
    cta: "Discover Makeup",
  },
  {
    id: 3,
    title: "Pure Hydration",
    subtitle: "Moisturizers and creams for soft, glowing skin.",
    image: "/image3.jpg", // Replace with your actual image
    cta: "Explore Skincare",
  },
  {
    id: 4,
    title: "Luxury Lip Care",
    subtitle: "Hydrating lipsticks and glosses for a perfect pout.",
    image: "/image4.jpg", // Replace with your actual image
    cta: "Shop Lips",
  },
  {
    id: 5,
    title: "All-in-One Beauty",
    subtitle: "Our curated essentials for effortless daily care.",
    image: "/image5.jpg", // Replace with your actual image
    cta: "Explore Essentials",
  },
];

const FeaturedCard = ({ title, description, image, price }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleAddClick = () => {
    navigate("/products"); // Go to /products page
  };

  return (
    <div className="group bg-primary shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden rounded-lg border border-boardercolor/30">
      <div className="h-64 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-secondary/50 text-sm">Image: {title}</span>
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-secondary mb-1 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-secondary/70 mb-3">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-accent">Rs.{price}</span>
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-1 px-4 py-2 bg-secondary text-primary text-sm rounded-full hover:bg-accent transition-colors duration-300"
          >
            <FaEye size={16} />
            <span> View Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const UserHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Auto-slide functionality
  useEffect(() => {
    const slideTimer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideTimer); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-primary font-sans">
      <main className="max-w-7xl mx-auto">
        {/* 2. Hero Carousel with Slide Transition */}
        <section className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden mt-2 rounded-lg">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              // The transition is handled by translate-x. This creates the 'slide' effect.
              // We use transform and transition utilities.
              className={`absolute top-0 left-0 w-full h-full flex items-center bg-cover bg-center transition-all duration-700 ease-in-out`}
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translateX(${(index - currentSlide) * 100}%)`,
                opacity: index === currentSlide ? 1 : 0,
                zIndex: index === currentSlide ? 10 : 5,
              }}
            >
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-secondary/20 flex flex-col justify-center items-start text-primary p-8 md:p-16">
                <p className="text-lg uppercase tracking-widest font-light mb-2 opacity-90">
                  {slide.subtitle}
                </p>
                <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <button className="mt-4 px-8 py-3 text-lg font-semibold bg-accent text-primary rounded-full shadow-lg hover:bg-secondary hover:shadow-xl transition duration-300">
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-secondary/50 text-primary hover:bg-secondary transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-secondary/50 text-primary hover:bg-secondary transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-accent w-6" : "bg-primary/70"
                }`}
              />
            ))}
          </div>
        </section>

        {/* 3. Featured Products Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-light text-center text-secondary mb-10 tracking-wide">
            Our <span className="font-bold text-accent">Featured</span> Gems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mock Featured Products */}
            <FeaturedCard
              title="Velvet Lipstick"
              description="A luxurious matte finish for all-day wear."
              price="28.99"
              image="/VelvetLipstick.jpg"
            />
            <FeaturedCard
              title="Hydra Serum"
              description="Deeply penetrating hydration for a youthful glow."
              price="45.50"
              image="/HydraSerum.jpg"
            />
            <FeaturedCard
              title="Crystal Eye Palette"
              description="12 highly pigmented shades for any look."
              price="35.00"
              image="/CrystalEyePalette.jpg"
            />
            <FeaturedCard
              title="Daily Cleanser"
              description="Gentle, effective cleansing for sensitive skin."
              price="22.75"
              image="/DailyCleanser.jpg"
            />
          </div>
        </section>

        {/* 4. Call to Action/Testimonial Banner */}
        <section className="my-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-boardercolor/10 p-12 rounded-lg text-center">
            <p className="text-xl italic text-secondary/80 mb-4">
              "My skin has never looked clearer. Crystal Beauty Clear is my new
              secret weapon."
            </p>
            <p className="font-semibold text-accent">
              - Happy Customer, Los Angeles
            </p>
            <button className="mt-6 px-6 py-2 border-2 border-accent text-accent rounded-full font-semibold hover:bg-accent hover:text-primary transition duration-300">
              Read Our Reviews
            </button>
          </div>
        </section>
      </main>

      {/* 5. Elegant Footer */}
      <footer className="bg-secondary text-primary mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold text-accent mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/products" className="hover:text-boardercolor transition">
                    Skincare
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-boardercolor transition">
                    Makeup
                  </a>
                </li>
                
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-accent mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="hover:text-boardercolor transition">
                    Our Story
                  </a>
                </li>
                
              </ul>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h4 className="text-lg font-bold text-accent mb-4">Newsletter</h4>
              <p className="text-sm mb-4">
                Get 10% off your first order and exclusive updates.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 w-full rounded-l-md text-secondary focus:outline-none bg-white"
                />
                <button
                  type="submit"
                  className="bg-accent p-3 rounded-r-md text-primary hover:bg-boardercolor transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-boardercolor/50 text-center text-sm text-primary/70">
            &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserHomePage;
