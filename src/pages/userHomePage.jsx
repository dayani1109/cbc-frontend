import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/footer";

/* ---------------- HERO SLIDES ---------------- */
const heroSlides = [
  {
    id: 1,
    title: "Crystal Clear Skin",
    subtitle: "THE FUTURE OF GLOW",
    image: "/image22.jpg",
    cta: "Shop Serums",
  },
  {
    id: 2,
    title: "Radiant Beauty",
    subtitle: "ELEVATE YOUR LOOK",
    image: "/image5.jpg",
    cta: "Discover Makeup",
  },
  {
    id: 3,
    title: "Pure Hydration",
    subtitle: "DRENCH IN MOISTURE",
    image: "/image4.png",
    cta: "Explore Skincare",
  },
];

/* ---------------- 3D FEATURED CARD ---------------- */
const FeaturedCard = ({ title, description, image, price }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="h-72 overflow-hidden relative">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={image}
          alt={title}
          className="w-full h-full object-cover transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6 relative -mt-10 bg-white/90 mx-4 mb-4 rounded-xl shadow-lg transform translate-z-10">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-4 uppercase tracking-tighter">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xl font-black text-accent">Rs. {price}</span>
          <button
            onClick={() => navigate("/products")}
            className="p-3 bg-secondary text-white rounded-full hover:bg-accent transition-colors shadow-lg"
          >
            <FaEye size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- MODERN PROMISE CARD ---------------- */
const PromiseCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="relative group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-xl hover:shadow-2xl transition-all"
  >
    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-accent" size={32} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

/* ---------------- MAIN PAGE ---------------- */
const UserHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-x-hidden">
      <main className="max-w-[1440px] mx-auto px-4">
        {/* ---------------- 3D HERO SECTION ---------------- */}
        <section className="relative h-[85vh] mt-6 rounded-[40px] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
                style={{
                  backgroundImage: `url(${heroSlides[currentSlide].image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-12 md:px-24">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-accent font-bold tracking-[0.3em] mb-4 text-sm"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.span>
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight max-w-2xl"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-fit px-10 py-4 bg-accent text-white rounded-full text-lg font-bold shadow-[0_10px_30px_rgba(255,107,107,0.4)] hover:bg-white hover:text-accent transition-all"
                >
                  {heroSlides[currentSlide].cta}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-10 right-12 flex gap-4">
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? heroSlides.length - 1 : prev - 1
                )
              }
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-accent transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === heroSlides.length - 1 ? 0 : prev + 1
                )
              }
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-accent transition"
            >
              <ChevronRight />
            </button>
          </div>
        </section>

        {/* ---------------- FLOATING FEATURED PRODUCTS ---------------- */}
        <section className="py-28 px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-3">
                Curated Collection
              </h2>
              <h3 className="text-5xl font-black text-secondary">
                Best Sellers
              </h3>
            </div>
            <Link
              to="/products"
              className="text-secondary font-bold border-b-2 border-accent pb-1 hover:text-accent transition"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeaturedCard
              title="Velvet Lipstick"
              description="Matte Finish"
              price="2899"
              image="/VelvetLipstick.jpg"
            />
            <FeaturedCard
              title="Hydra Serum"
              description="Moisture Lock"
              price="4550"
              image="/HydraSerum.jpg"
            />
            <FeaturedCard
              title="Eye Palette"
              description="Pigmented"
              price="3500"
              image="/CrystalEyePalette.jpg"
            />
            <FeaturedCard
              title="Daily Cleanser"
              description="Gentle Care"
              price="2275"
              image="/DailyCleanser.jpg"
            />
          </div>
        </section>

        {/* ---------------- 3D GLASS PROMISE SECTION ---------------- */}
        <section className="relative py-20 px-6 overflow-hidden rounded-[50px] bg-accent/30">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-40 -mb-40" />

          <h2 className="text-center mb-20">
            <span className="block text-accent font-bold tracking-widest text-sm uppercase mb-4">
              Why we are different
            </span>
            <span className="text-5xl font-black text-white">
              The Beauty Promise
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
            <PromiseCard
              icon={Sparkles}
              title="Clean Beauty"
              desc="Zero harsh chemicals. Only ingredients your skin loves."
              delay={0.1}
            />
            <PromiseCard
              icon={ShieldCheck}
              title="Derm Tested"
              desc="Rigorous safety testing for even the most sensitive skin."
              delay={0.2}
            />
            <PromiseCard
              icon={Truck}
              title="Global Shipping"
              desc="Fast, secure delivery to your doorstep, anywhere."
              delay={0.3}
            />
          </div>
        </section>

        {/* ---------------- NEWSLETTER / MODERN CTA ---------------- */}
        <section className="py-32 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="max-w-4xl mx-auto bg-white border border-gray-100 p-16 rounded-[40px] shadow-2xl shadow-gray-200/50"
          >
            <h2 className="text-4xl font-black text-secondary mb-6">
              Join the Glow Club
            </h2>
            <p className="text-gray-500 mb-10 text-lg">
              Subscribe for early access to new launches and 10% off your first
              order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 px-6 py-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 ring-accent/50"
              />
              <button className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-accent transition shadow-lg">
                Join Now
              </button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserHomePage;
