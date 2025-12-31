import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  // Define social media links (placeholders)
  const socialLinks = [
    { icon: FaFacebookF, href: "#facebook", label: "Facebook" },
    { icon: FaInstagram, href: "#instagram", label: "Instagram" },
    { icon: FaTwitter, href: "#twitter", label: "Twitter" },
    { icon: FaTiktok, href: "#tiktok", label: "TikTok" },
  ];

  // Define navigation links
  const navLinks = [
    { name: "Shop All Products", href: "/products" },
    { name: "Order", href: "/order" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-secondary text-primary border-t border-boardercolor/30 py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section: Brand Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-boardercolor/50 mb-8">
          <h2 className="text-3xl font-bold font-serif text-pink tracking-wider mb-6 md:mb-0">
            Crystal Beauty Clear
          </h2>
          
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-primary hover:text-accent transition duration-300 transform hover:scale-110"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Main Links and Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* 1. Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold text-accent mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-primary/90 hover:text-pink transition duration-300 font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-accent mb-4 uppercase tracking-wider">Contact Us</h3>
            <address className="not-italic space-y-3 text-primary/90 font-light">
              <p>
                <span className="font-medium block text-pink">Phone:</span> 
                <a href="tel:0114523698" className="hover:text-pink transition duration-300">011 452 3698</a>
              </p>
              <p>
                <span className="font-medium block text-pink">Email:</span> 
                <a href="mailto:info@crystalbeautyclear.com" className="hover:text-pink transition duration-300">info@crystalbeautyclear.com</a>
              </p>
            </address>
          </div>

          {/* 3. Headquarters Address */}
          <div>
            <h3 className="text-xl font-semibold text-accent mb-4 uppercase tracking-wider">Headquarters</h3>
            <address className="not-italic text-primary/90 font-light max-w-xs md:max-w-none mx-auto">
              Crystal Beauty Clear pvt LTD, 
              <br />
              No 123, Main Road, Colombo.
            </address>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-16 pt-8 border-t border-boardercolor/50 text-center">
          <p className="text-sm text-primary/60">
            &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}