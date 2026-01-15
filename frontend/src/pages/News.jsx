import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import { pillars, reports, packages, deliverables, methodologyLayers, industries } from '../data/newsData';

const News = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-black relative overflow-hidden pt-20">
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(139, 22, 41, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(13, 115, 119, 0.2) 0%, transparent 40%), radial-gradient(ellipse at 50% 20%, rgba(184, 134, 11, 0.15) 0%, transparent 40%)'
        }} />
        
        <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-24 items-center mx-auto px-10 py-20" style={{ maxWidth: '1400px', width: '100%' }}>
          <div>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-[84px] font-normal text-white mb-8" style={{ lineHeight: '1.05' }}>
              The <em className="text-crimson italic">Horizon Scan</em> Series
            </h1>
            <p className="font-crimson text-2xl text-titanium leading-relaxed mb-5 max-w-xl">
              Deep future workforce intelligence for organizations thinking in decades, not quarters. Rigorous projections that transform automation uncertainty into strategic clarity.
            </p>
            
            <div className="font-inter text-sm text-mist py-5 border-t border-b border-white/10 mb-10 flex items-center gap-4">
              <strong className="text-crimson font-semibold">Not short-term forecasting.</strong>
              For daily market intelligence and news analysis, see our Current Intelligence briefings. Horizon Scans operate on a fundamentally different timescale.
            </div>
            
            {/* Time range */}
            <div className="flex flex-wrap items-center gap-6 bg-white/[0.03] py-6 px-8 border border-white/[0.08] mb-12">
              <div className="text-center">
                <div className="font-playfair text-5xl text-white leading-none">25</div>
                <div className="font-inter text-[10px] uppercase tracking-widest text-mist mt-2">Year Minimum</div>
              </div>
              <div className="font-playfair text-3xl text-crimson">→</div>
              <div className="text-center">
                <div className="font-playfair text-5xl text-white leading-none">100</div>
                <div className="font-inter text-[10px] uppercase tracking-widest text-mist mt-2">Year Maximum</div>
              </div>
              <div className="flex-1 pl-6 border-l border-white/10 min-w-[200px]">
                <p className="text-sm text-titanium m-0 leading-snug">
                  Long enough to capture fundamental transformation. Far enough to escape quarterly thinking. This is generational strategy—the decisions that shape your organization's workforce for your successors' successors.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href="#reports" className="bg-crimson text-white px-9 py-[18px] font-inter text-sm font-semibold uppercase tracking-wider no-underline hover:bg-deep-crimson transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-crimson/40">
                Explore Published Reports
              </a>
              <a href="#enterprise" className="bg-transparent text-white px-9 py-[18px] font-inter text-sm font-semibold uppercase tracking-wider no-underline border border-white/30 hover:border-white hover:bg-white/[0.05] transition-all hover:-translate-y-0.5">
                Commission Private Research →
              </a>
            </div>
          </div>
          
          {/* Hero visual - hidden on mobile */}
          <div className="hidden lg:block relative h-[500px]">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Time rings animation */}
              <div className="relative w-[300px] h-[300px]">
                <div className="absolute inset-0 border border-crimson/30 rounded-full" style={{ animation: 'spin 20s linear infinite' }} />
                <div className="absolute border border-teal/30 rounded-full" style={{ width: '80%', height: '80%', top: '10%', left: '10%', animation: 'spin 15s linear infinite reverse' }} />
                <div className="absolute border border-gold/30 rounded-full" style={{ width: '60%', height: '60%', top: '20%', left: '20%', animation: 'spin 10s linear infinite' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full flex items-center justify-center" style={{
                  background: 'radial-gradient(circle, rgba(196, 30, 58, 0.8) 0%, rgba(139, 22, 41, 0.4) 50%, transparent 70%)'
                }}>
                  <div className="font-playfair text-sm text-white text-center leading-tight">HORIZON<br/>ENGINE</div>
                </div>
                {/* Year markers positioned around the circle */}
                <div className="absolute font-inter text-[11px] text-mist uppercase tracking-wider" style={{ top: '50%', right: 'calc(100% + 20px)', transform: 'translateY(-50%)' }}>
                  <span className="block font-playfair text-2xl text-white normal-case tracking-normal">2024</span>
                  Today
                </div>
                <div className="absolute font-inter text-[11px] text-mist uppercase tracking-wider" style={{ top: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
                  <span className="block font-playfair text-2xl text-white normal-case tracking-normal">2049</span>
                  25 Years
                </div>
                <div className="absolute font-inter text-[11px] text-mist uppercase tracking-wider" style={{ top: '50%', left: 'calc(100% + 20px)', transform: 'translateY(-50%)' }}>
                  <span className="block font-playfair text-2xl text-white normal-case tracking-normal">2074</span>
                  50 Years
                </div>
                <div className="absolute font-inter text-[11px] text-mist uppercase tracking-wider" style={{ bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
                  <span className="block font-playfair text-2xl text-white normal-case tracking-normal">2124</span>
                  100 Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What Is Section */}
      <section id="what-is" className="py-[120px] bg-white border-t border-platinum">
        <div className="mx-auto px-10" style={{ maxWidth: '1400px' }}>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-24 items-start">
            <div>
              <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-4 flex items-center gap-3 before:content-[''] before:w-10 before:h-px before:bg-crimson">
                About the Series
              </div>
              <h2 className="font-playfair text-5xl font-normal text-black leading-tight mb-6">
                Strategic Foresight, <em className="italic text-crimson">Not Science Fiction</em>
              </h2>
              <div className="text-xl leading-loose text-charcoal [&>p:first-of-type]:first-letter:font-playfair [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:leading-[0.75] [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-2 [&>p:first-of-type]:first-letter:text-crimson">
                <p className="mb-7">The Horizon Scan series represents a new category of workforce intelligence: long-range projections grounded in rigorous methodology rather than speculative futurism. Each report examines a specific industry-region combination across a 25-100 year horizon.</p>
                <p className="mb-7">Where most automation research asks "which jobs will disappear?", we ask the more useful question: "what will humans do that matters?" Every Horizon Scan identifies ten or more future roles that don't exist today.</p>
                <p className="mb-7">The value proposition is strategic patience. While competitors obsess over next quarter's headcount, you'll understand workforce architecture that spans generations.</p>
              </div>
            </div>
            
            {/* RPI Sidebar */}
            <div className="lg:sticky lg:top-[120px]">
              <div className="bg-black text-white p-12 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-teal before:via-gold before:to-crimson">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-playfair text-3xl text-white">RPI</span>
                  <span className="font-inter text-[9px] font-semibold text-mist align-super">™</span>
                </div>
                <p className="text-base text-titanium mb-8 leading-relaxed">
                  The Replaceability Potential Index. Our proprietary methodology that decomposes every role into constituent tasks, scoring each across three dimensions.
                </p>
                <div className="mb-5">
                  <div className="flex gap-0.5 mb-3 h-3 rounded-md overflow-hidden">
                    <div className="flex-1 bg-teal hover:scale-y-150 transition-transform" />
                    <div className="flex-1 bg-slate hover:scale-y-150 transition-transform" />
                    <div className="flex-1 bg-gold hover:scale-y-150 transition-transform" />
                    <div className="flex-1 bg-crimson hover:scale-y-150 transition-transform" />
                    <div className="flex-1 bg-deep-crimson hover:scale-y-150 transition-transform" />
                  </div>
                  <div className="flex justify-between font-inter text-[10px] text-mist uppercase tracking-wide">
                    <span>Human Resilient</span>
                    <span>Near-Complete Automation</span>
                  </div>
                </div>
                <div className="bg-white/5 p-5 mt-6 font-inter text-sm text-titanium">
                  <code className="text-crimson font-semibold block mb-1">HRA_t = APS × W × (1-HRF)</code>
                  <code className="text-crimson font-semibold">Role RPI = Σ HRA_t</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Four Pillars */}
      <section className="py-[120px] bg-bg overflow-hidden">
        <div className="mx-auto px-10 mb-16" style={{ maxWidth: '1400px' }}>
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-4 flex items-center gap-3 before:content-[''] before:w-10 before:h-px before:bg-crimson">
            Methodology
          </div>
          <h2 className="font-playfair text-5xl font-normal text-black leading-tight">
            Four Pillars of <em className="italic text-crimson">Horizon Intelligence</em>
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-0">
          {pillars.map((pillar) => (
            <div 
              key={pillar.id} 
              className="py-[60px] px-10 bg-white border-r border-platinum relative transition-all duration-500 group overflow-hidden hover:before:h-full before:content-[''] before:absolute before:inset-0 before:h-0 before:bg-black before:transition-all before:duration-500 before:z-0 last:border-r-0"
            >
              <div className="relative z-10">
                <div className="font-playfair text-7xl text-platinum leading-none mb-6 transition-colors duration-500 group-hover:text-crimson">
                  {pillar.number}
                </div>
                <div className="font-playfair text-2xl text-black mb-4 transition-colors duration-500 group-hover:text-white">
                  {pillar.title}
                </div>
                <div className="text-base text-gray-500 leading-relaxed transition-colors duration-500 group-hover:text-titanium">
                  {pillar.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Methodology Section */}
      <section id="methodology" className="py-[120px] bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 10% 90%, rgba(13, 115, 119, 0.2) 0%, transparent 40%), radial-gradient(ellipse at 90% 10%, rgba(184, 134, 11, 0.15) 0%, transparent 40%)'
        }} />
        
        <div className="mx-auto px-10 relative z-10" style={{ maxWidth: '1400px' }}>
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-4 flex items-center gap-3 before:content-[''] before:w-10 before:h-px before:bg-crimson">
            The Science of Foresight
          </div>
          <h2 className="font-playfair text-5xl font-normal text-white leading-tight mb-6">
            How We See <em className="italic text-crimson">What's Coming</em>
          </h2>
          <p className="text-xl text-titanium max-w-3xl leading-relaxed mb-16">
            Our projections aren't guesswork dressed in confidence. They emerge from a rigorous, multi-layered methodology.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-20 mt-16">
            <div className="text-lg leading-loose text-titanium [&>p]:mb-7 [&>p>strong]:text-white [&>p>strong]:font-semibold">
              <p><strong>We begin where others end.</strong> Most automation forecasts start with technology capabilities. We start with economic fundamentals: What tasks create value? Technology is one variable among many.</p>
              <p><strong>We decompose before we predict.</strong> "This job will be automated" is a category error. Jobs are bundles of tasks with wildly different automation profiles.</p>
              <p><strong>We triangulate across disciplines.</strong> No single research stream captures workforce futures. We synthesize labor economics, technology forecasting, and regulatory analysis.</p>
              <p><strong>We name what we don't know.</strong> Every Horizon Scan includes explicit confidence ratings. Intellectual honesty about uncertainty is itself a form of rigor.</p>
            </div>
            
            <div className="flex flex-col gap-6">
              {methodologyLayers.map((layer) => (
                <div 
                  key={layer.id}
                  className="bg-white/[0.03] border border-white/[0.08] p-8 relative transition-all duration-500 hover:bg-white/[0.05] hover:border-crimson/30 group before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-crimson before:scale-y-0 before:transition-transform before:duration-500 hover:before:scale-y-100"
                >
                  <div className="font-playfair text-5xl text-charcoal leading-none mb-3 transition-colors duration-500 group-hover:text-crimson">
                    {layer.number}
                  </div>
                  <div className="font-inter text-sm font-semibold uppercase tracking-wider text-white mb-3">
                    {layer.title}
                  </div>
                  <div className="text-base text-mist leading-relaxed">
                    {layer.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Reports Section */}
      <section id="reports" className="py-[120px] bg-black text-white relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 70%, rgba(139, 22, 41, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(13, 115, 119, 0.1) 0%, transparent 40%)'
        }} />
        
        <div className="mx-auto px-10 relative z-10" style={{ maxWidth: '1400px' }}>
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-4 flex items-center gap-3 before:content-[''] before:w-10 before:h-px before:bg-crimson">
            Published Research
          </div>
          <h2 className="font-playfair text-5xl font-normal text-white leading-tight mb-6">
            The <em className="italic text-crimson">Reports</em>
          </h2>
          <p className="text-xl text-titanium max-w-3xl leading-relaxed mb-16">
            Each Horizon Scan examines a specific industry-region intersection across generational timescales. New reports released quarterly.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report) => (
              <Link key={report.id} to={report.link || '#'} className="no-underline">
                <NewsCard report={report} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enterprise Section */}
      <section id="enterprise" className="py-[120px] bg-white relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-crimson before:to-transparent">
        <div className="mx-auto px-10" style={{ maxWidth: '1400px' }}>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-4 flex items-center justify-center gap-3 before:content-[''] before:w-10 before:h-px before:bg-crimson after:content-[''] after:w-10 after:h-px after:bg-crimson">
              Enterprise Engagements
            </div>
            <h2 className="font-playfair text-5xl font-normal text-black leading-tight mb-6">
              Commission a <em className="italic text-crimson">Private</em> Horizon Scan
            </h2>
            <p className="text-xl text-charcoal leading-relaxed">
              Our published reports serve the broader market. But the most powerful application of our methodology is company-specific.
            </p>
          </div>
          
          {/* Discretion Banner */}
          <div className="bg-black text-white p-10 md:p-14 mb-20 grid md:grid-cols-[auto_1fr] gap-10 items-center">
            <div className="w-20 h-20 border-2 border-crimson rounded-full flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-9 h-9 stroke-crimson stroke-[1.5] fill-none">
                <path d="M24 4C12 4 4 24 4 24s8 20 20 20 20-20 20-20S36 4 24 4z"/>
                <circle cx="24" cy="24" r="8"/>
              </svg>
            </div>
            <div>
              <h4 className="font-playfair text-3xl text-white mb-3">Trusted by S&P 500 Organizations</h4>
              <p className="text-base text-titanium leading-relaxed mb-4">
                We work with leading companies on sensitive workforce transformation initiatives. Discretion isn't a feature—it's foundational.
              </p>
              <div className="flex flex-wrap gap-4">
                {['NDA Available', 'Secure Data Handling', 'Confidential Deliverables', 'Executive-Only Access'].map((badge) => (
                  <span key={badge} className="font-inter text-xs font-semibold uppercase tracking-wider px-4 py-2 border border-white/20 text-mist">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Packages */}
          <div className="grid lg:grid-cols-3 border border-platinum mb-24">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`p-14 border-r border-platinum last:border-r-0 relative transition-all duration-500 ${
                  pkg.isFeatured 
                    ? 'bg-black text-white lg:-my-6 lg:py-20 z-10 shadow-2xl' 
                    : 'bg-white hover:bg-bg'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-crimson text-white font-inter text-[9px] font-bold uppercase tracking-widest px-5 py-2">
                    {pkg.badge}
                  </div>
                )}
                <div className="font-playfair text-3xl mb-2">{pkg.name}</div>
                <div className={`font-crimson italic text-base mb-10 ${pkg.isFeatured ? 'text-mist' : 'text-gray-500'}`}>
                  {pkg.tagline}
                </div>
                <ul className="list-none p-0 m-0 mb-10">
                  {pkg.features.map((feature, idx) => (
                    <li 
                      key={idx}
                      className={`font-inter text-sm py-4 border-b flex items-start gap-3 ${
                        pkg.isFeatured ? 'border-white/10' : 'border-platinum'
                      } last:border-b-0`}
                    >
                      <span className={`font-bold flex-shrink-0 ${pkg.isFeatured ? 'text-crimson' : 'text-teal'}`}>✓</span>
                      {typeof feature === 'string' ? feature : (
                        <>
                          {feature.text}
                          <span className={`${pkg.isFeatured ? 'bg-crimson/30' : 'bg-crimson/10'} text-crimson font-semibold px-2 py-0.5 ml-2 text-xs`}>
                            {feature.highlight}
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <div>
                  <a 
                    href="#booking" 
                    className={`block w-full text-center py-5 font-inter text-sm font-semibold uppercase tracking-wider no-underline transition-all ${
                      pkg.isFeatured 
                        ? 'bg-crimson text-white hover:bg-deep-crimson' 
                        : 'border border-platinum text-black hover:border-crimson hover:text-crimson'
                    }`}
                  >
                    Request Proposal
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Deliverables */}
          <div className="bg-black py-[100px] -mx-4 px-4 md:-mx-10 md:px-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 20% 80%, rgba(13, 115, 119, 0.2) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(184, 134, 11, 0.15) 0%, transparent 40%)'
            }} />
            <div className="mx-auto relative z-10" style={{ maxWidth: '1400px' }}>
              <div className="text-center mb-20">
                <h3 className="font-playfair text-4xl text-white mb-4">Enterprise Deliverables</h3>
                <p className="text-lg text-titanium max-w-xl mx-auto">
                  Every engagement produces artifacts designed for internal distribution and strategic activation
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deliverables.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white/[0.02] border border-white/[0.08] p-12 text-center relative overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-crimson/30 hover:-translate-y-2 group"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-crimson/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-crimson group-hover:scale-110">
                      <svg viewBox="0 0 48 48" className="w-9 h-9 stroke-crimson stroke-[1.5] fill-none transition-all duration-500 group-hover:stroke-white">
                        <rect x="8" y="4" width="32" height="40" rx="2" />
                        <line x1="14" y1="14" x2="34" y2="14" />
                        <line x1="14" y1="22" x2="34" y2="22" />
                        <line x1="14" y1="30" x2="26" y2="30" />
                      </svg>
                    </div>
                    <div className="font-playfair text-xl text-white mb-3">{item.title}</div>
                    <div className="text-sm text-mist leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section id="booking" className="py-32 bg-gradient-to-b from-bg to-white">
        <div className="mx-auto px-10" style={{ maxWidth: '900px' }}>
          <div className="bg-white border border-platinum shadow-2xl overflow-hidden">
            <div className="bg-black text-white p-12 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-teal after:via-gold after:to-crimson">
              <h3 className="font-playfair text-4xl mb-3">Schedule a Consultation</h3>
              <p className="text-base text-titanium">Tell us about your organization and we'll prepare a tailored proposal</p>
            </div>
            
            <form className="p-14">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal mb-2.5">First Name</label>
                  <input type="text" className="w-full p-4 font-inter text-base border border-platinum bg-bg outline-none transition-all focus:border-crimson focus:bg-white focus:shadow-[0_0_0_3px_rgba(196,30,58,0.1)]" placeholder="Your first name" />
                </div>
                <div>
                  <label className="block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal mb-2.5">Last Name</label>
                  <input type="text" className="w-full p-4 font-inter text-base border border-platinum bg-bg outline-none transition-all focus:border-crimson focus:bg-white focus:shadow-[0_0_0_3px_rgba(196,30,58,0.1)]" placeholder="Your last name" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal mb-2.5">Work Email</label>
                  <input type="email" className="w-full p-4 font-inter text-base border border-platinum bg-bg outline-none transition-all focus:border-crimson focus:bg-white focus:shadow-[0_0_0_3px_rgba(196,30,58,0.1)]" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal mb-2.5">Company</label>
                  <input type="text" className="w-full p-4 font-inter text-base border border-platinum bg-bg outline-none transition-all focus:border-crimson focus:bg-white focus:shadow-[0_0_0_3px_rgba(196,30,58,0.1)]" placeholder="Organization name" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal mb-2.5">Industry Sector</label>
                <select className="w-full p-4 font-inter text-base border border-platinum bg-bg outline-none transition-all focus:border-crimson focus:bg-white focus:shadow-[0_0_0_3px_rgba(196,30,58,0.1)] appearance-none cursor-pointer bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236f6f6f%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]">
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal mb-2.5">Message</label>
                <textarea className="w-full p-4 font-inter text-base border border-platinum bg-bg outline-none transition-all focus:border-crimson focus:bg-white focus:shadow-[0_0_0_3px_rgba(196,30,58,0.1)] min-h-[140px] resize-y" placeholder="Tell us about your workforce transformation goals..."></textarea>
              </div>
              
              <div className="mt-10 text-center">
                <button type="submit" className="bg-crimson text-white px-20 py-5 font-inter text-sm font-semibold uppercase tracking-wider border-none cursor-pointer transition-all hover:bg-deep-crimson hover:-translate-y-0.5 hover:shadow-lg hover:shadow-crimson/40">
                  Request Consultation
                </button>
                <p className="font-inter text-xs text-mist mt-4">
                  We typically respond within one business day
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default News;
