import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import Footer from "../components/footer";

export default function ContactUsPage() {
  // Brand Contact and Social Details
  const contactDetails = {
    address: "Crystal Beauty Clear pvt LTD, No 123, Main Road, Colombo.",
    phone: "011 452 3698",
    email: "info@crystalbeautyclear.com",
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "#facebook", label: "Facebook" },
    { icon: FaInstagram, href: "#instagram", label: "Instagram" },
    { icon: FaTwitter, href: "#twitter", label: "Twitter" },
    { icon: FaTiktok, href: "#tiktok", label: "TikTok" },
  ];

  return (
    <div className="bg-primary text-secondary font-sans min-h-screen">
      {/* Hero Section: Clear and Minimal */}
      <section className="text-center py-20 px-6 bg-white/50 border-b border-boardercolor/30">
        <h1 className="text-5xl md:text-6xl font-extrabold text-accent mb-4">
          Connect With Us
        </h1>
        <p className="text-xl text-secondary/80 max-w-2xl mx-auto">
          We are dedicated to providing an unparalleled luxury experience. Reach
          out with any inquiries, large or small.
        </p>
      </section>

      {/* Main Content: Two-Column Form and Info */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Column 1: Contact Information */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold text-secondary border-b-2 border-pink pb-2 inline-block">
            Our Details
          </h2>

          {/* Address Block */}
          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-pink w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-accent mb-1">
                Headquarters
              </h3>
              <p className="text-lg text-secondary/90 leading-relaxed">
                {contactDetails.address}
              </p>
            </div>
          </div>

          {/* Phone Block */}
          <div className="flex items-start space-x-4">
            <FaPhone className="text-pink w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-accent mb-1">
                Call Us
              </h3>
              <a
                href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                className="text-lg text-secondary/90 hover:text-pink transition duration-300"
              >
                {contactDetails.phone}
              </a>
            </div>
          </div>

          {/* Email Block */}
          <div className="flex items-start space-x-4">
            <FaEnvelope className="text-pink w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-accent mb-1">
                Email Support
              </h3>
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-lg text-secondary/90 hover:text-pink transition duration-300"
              >
                {contactDetails.email}
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-8 border-t border-boardercolor/30">
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Follow Our Journey
            </h3>
            <div className="flex space-x-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={`Follow us on ${link.label}`}
                  className="text-secondary hover:text-pink transition duration-300 transform hover:scale-110"
                >
                  <link.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Modern Contact Form */}
        <div className="p-8 rounded-3xl bg-white shadow-2xl shadow-boardercolor/20 border border-boardercolor/10">
          <h2 className="text-4xl font-bold text-accent mb-8">
            Send a Message
          </h2>

          <form className="space-y-6">
            {/* Input Group: Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-secondary/80 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-5 py-3 border border-boardercolor/50 rounded-lg focus:ring-2 focus:ring-pink focus:border-pink transition duration-200 placeholder-secondary/50"
              />
            </div>

            {/* Input Group: Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary/80 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3 border border-boardercolor/50 rounded-lg focus:ring-2 focus:ring-pink focus:border-pink transition duration-200 placeholder-secondary/50"
              />
            </div>

            {/* Input Group: Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-secondary/80 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Regarding an order or product"
                className="w-full px-5 py-3 border border-boardercolor/50 rounded-lg focus:ring-2 focus:ring-pink focus:border-pink transition duration-200 placeholder-secondary/50"
              />
            </div>

            {/* Input Group: Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-secondary/80 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="How can we assist you today?"
                className="w-full px-5 py-3 border border-boardercolor/50 rounded-lg focus:ring-2 focus:ring-pink focus:border-pink transition duration-200 placeholder-secondary/50"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 font-semibold text-lg text-white bg-pink rounded-full shadow-lg hover:bg-accent hover:shadow-xl transition duration-300 transform hover:scale-[1.01]"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </section>

      {/* Map Section: Visual Location Placeholder */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-accent mb-8">
          Find Our Boutique
        </h2>
        <div className="max-w-6xl mx-auto h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-boardercolor/50 bg-boardercolor/30">
          {/* This is where a Google Maps embed would typically go */}
          <iframe
            title="Crystal Beauty Clear Location"
            src="https://www.google.com/maps?q=Colombo%20Sri%20Lanka&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

       <Footer/>
    </div>
    
  );
 
}

