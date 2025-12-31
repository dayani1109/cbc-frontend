import Footer from "../components/footer";

export default function AboutUsPage() {
  return (
    // Base container with a soft primary background and dark text
    <div className="bg-primary text-secondary font-sans min-h-screen antialiased">

      {/* Hero Section: Sophisticated Header with Focus on Brand Name */}
      <header className="relative w-full h-[550px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Subtle Background Texture/Image Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 bg-[url('newbackground.jpg')]"></div>
        <div className="absolute inset-0 bg-primary/80"></div>

        <div className="relative z-10 max-w-4xl mx-auto p-10">
          <p className="text-xl font-light tracking-widest uppercase text-accent mb-3">
            The Essence of Luxury Beauty
          </p>
          <h1 className="text-7xl md:text-8xl font-serif font-bold text-accent leading-none">
            Crystal Beauty
          </h1>
          <hr className="w-24 border-t-2 border-pink mx-auto my-6" />
          <p className="text-lg md:text-xl font-medium text-secondary/90">
            Crafting elegance and inspiring confidence through meticulously curated
            cosmetics and skincare.
          </p>
        </div>
      </header>
      
      {/* About Section: Split Layout for Visual Interest (Image Placeholder on one side) */}
      <section className="relative -mt-20 z-20 max-w-6xl mx-auto bg-white p-12 md:p-16 rounded-3xl shadow-xl shadow-boardercolor/30 flex flex-col md:flex-row items-center gap-10">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-left">
          <span className="text-sm font-semibold uppercase text-pink tracking-wider">Our Philosophy</span>
          <h2 className="text-4xl font-bold text-accent mt-2 mb-6">
            Where Science Meets Seduction
          </h2>
          <p className="text-lg text-secondary leading-relaxed mb-4">
            At <span className="font-bold text-pink">Crystal Beauty</span>, we reject compromise. Our devotion to <span className="font-bold text-secondary">impeccable quality</span> drives us to source the finest, most potent ingredients, ensuring that every touch is a luxurious ritual.
          </p>
          <p className="text-lg text-secondary leading-relaxed">
            We are innovators in beauty, blending breakthrough science with an elegant, timeless aesthetic. Our commitment is to enhance your natural luminosity, giving you the power to express your most radiant self.
          </p>
        </div>
        
        {/* Image/Visual Placeholder */}
        <div className="md:w-1/2 h-80 rounded-2xl bg-boardercolor/50 overflow-hidden shadow-inner">
            {/* Placeholder for a visually striking product image or studio shot */}
            <div className="flex items-center justify-center h-full  text-white/70 italic">
                <img src="/quality2.jpg"></img>
            </div>
        </div>
      </section>

      {/* Value Pillars Section: Three-Column Grid with Subtle Style */}
      <section className="py-24 px-6 bg-primary">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Pillars of Our Promise
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="text-center p-8 border-t-4 border-pink hover:bg-white transition duration-300 rounded-lg">
            <div className="text-5xl text-accent mb-4">💎</div>
            <h3 className="text-xl font-semibold text-secondary mb-3">Pure Formulation</h3>
            <p className="text-secondary/80">
              Meticulous care in every batch, using clean, high-performance ingredients that respect and nourish your skin.
            </p>
          </div>
          
          {/* Pillar 2 */}
          <div className="text-center p-8 border-t-4 border-accent hover:bg-white transition duration-300 rounded-lg">
            <div className="text-5xl text-accent mb-4">🕊️</div>
            <h3 className="text-xl font-semibold text-secondary mb-3">Conscious Beauty</h3>
            <p className="text-secondary/80">
              Cruelty-free commitment, ethical sourcing, and sustainable practices woven into the fabric of our brand.
            </p>
          </div>
          
          {/* Pillar 3 */}
          <div className="text-center p-8 border-t-4 border-boardercolor hover:bg-white transition duration-300 rounded-lg">
            <div className="text-5xl text-accent mb-4">👑</div>
            <h3 className="text-xl font-semibold text-secondary mb-3">Uncompromising Luxury</h3>
            <p className="text-secondary/80">
              From the texture of the product to the packaging design, expect a truly luxurious experience every time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & CTA: Clean Block */}
      <section className=" text-secondary py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-pink mb-6">Join Our World of Elegance</h2>
        <p className="text-xl font-light max-w-3xl mx-auto mb-8">
          We invite you to experience the difference. Discover beauty that is clean, conscious, and captivating.
        </p>
        <a 
          href="/products" 
          className="inline-block px-10 py-4 text-lg font-bold text-secondary bg-pink border-2 border-pink hover:bg-primary transition duration-300 rounded-full shadow-lg hover:text-accent transform hover:scale-105"
        >
          Explore Collections
        </a>
      </section>

      {/* Footer - Minimalist */}
     <Footer/>
    </div>
  );
}