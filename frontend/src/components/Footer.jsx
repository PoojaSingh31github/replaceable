import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black py-20 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20">
        {/* Brand */}
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="font-playfair text-xl text-white no-underline">
            Replace<span className="text-crimson">able</span>.ai
          </Link>
          <p className="text-base text-mist mt-6 leading-relaxed max-w-xs">
            Professional Augmentation · Industry Intelligence. Deep future workforce projections for organizations thinking in decades, not quarters.
          </p>
          <div className="flex gap-3 mt-6">
            {['Li', 'X', 'Yt'].map((social) => (
              <a 
                key={social}
                href="#"
                className="w-11 h-11 bg-charcoal text-white flex items-center justify-center no-underline font-inter text-sm font-semibold hover:bg-crimson hover:-translate-y-0.5 transition-all"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        {/* Reports */}
        <div>
          <h5 className="font-inter text-xs font-semibold uppercase tracking-widest text-white mb-7">Reports</h5>
          <ul className="list-none p-0 m-0">
            {['Goa Hospitality 2064', 'UK Healthcare 2065', 'German Manufacturing 2074', 'All Reports'].map((item) => (
              <li key={item} className="mb-3.5">
                <Link to="/reports" className="font-inter text-sm text-mist no-underline hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Enterprise */}
        <div>
          <h5 className="font-inter text-xs font-semibold uppercase tracking-widest text-white mb-7">Enterprise</h5>
          <ul className="list-none p-0 m-0">
            {['Private Research', 'Strategic Workshops', 'Full Immersion', 'Enterprise Pricing'].map((item) => (
              <li key={item} className="mb-3.5">
                <a href="#" className="font-inter text-sm text-mist no-underline hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Company */}
        <div>
          <h5 className="font-inter text-xs font-semibold uppercase tracking-widest text-white mb-7">Company</h5>
          <ul className="list-none p-0 m-0">
            {['About', 'Methodology', 'Careers', 'Contact'].map((item) => (
              <li key={item} className="mb-3.5">
                <a href="#" className="font-inter text-sm text-mist no-underline hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-charcoal flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="font-inter text-sm text-mist m-0">
          © 2024 Replaceable.ai · Horizon Scan Series
        </p>
        <p className="font-inter text-sm text-mist m-0">
          Privacy Policy · Terms of Service
        </p>
      </div>
    </footer>
  );
};

export default Footer;
