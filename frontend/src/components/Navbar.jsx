import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="bg-black/95 backdrop-blur-xl py-4 fixed top-0 left-0 right-0 z-50 border-b border-white/5">
      <div className="mx-auto px-10 flex justify-between items-center" style={{ maxWidth: '1400px' }}>
        <div className="flex items-center flex-wrap">
          <Link to="/" className="font-playfair text-2xl text-white no-underline flex items-baseline gap-1">
            Replace<span className="text-crimson">able</span>.ai
          </Link>
          <span className="font-crimson italic text-xs text-crimson ml-4 opacity-90 hidden md:inline">
            Professional Augmentation · Industry Intelligence
          </span>
        </div>
        
        <nav className="hidden md:flex gap-10 items-center">
          <Link 
            to="/#methodology" 
            className="font-inter text-sm font-medium text-titanium no-underline hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-crimson after:transition-all hover:after:w-full"
          >
            Methodology
          </Link>
          <Link 
            to="/reports" 
            className={`font-inter text-sm font-medium text-titanium no-underline hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-crimson after:transition-all hover:after:w-full ${location.pathname === '/reports' ? 'text-white after:w-full' : ''}`}
          >
            Reports
          </Link>
          <Link 
            to="/#enterprise" 
            className="font-inter text-sm font-medium text-titanium no-underline hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-crimson after:transition-all hover:after:w-full"
          >
            Enterprise
          </Link>
          <Link 
            to="/#booking" 
            className="bg-crimson text-white px-6 py-3 font-inter text-sm font-semibold no-underline hover:bg-deep-crimson transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-crimson/40"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
