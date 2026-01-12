import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';
import { 
  coverStats, 
  execCards, 
  roles, 
  scenarios, 
  recommendations, 
  prologueText, 
  navSections 
} from '../data/reportsData';

const Reports = () => {
  const [activeSection, setActiveSection] = useState('executive');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.report-section');
      let current = 'executive';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Cover Section */}
      <section className="min-h-[70vh] flex items-center relative overflow-hidden pt-20" style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #2d2d2d 50%, #8b1629 100%)'
      }}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="mx-auto px-10 py-20 relative z-10" style={{ maxWidth: '1400px', width: '100%' }}>
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-6">
            Strategic Foresight Report · December 2024
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-none mb-6 max-w-4xl">
            The <em className="text-crimson italic">Goa</em> Hospitality Workforce of <em className="text-crimson italic">2064</em>
          </h1>
          <p className="font-crimson text-2xl text-titanium max-w-2xl leading-relaxed mb-12">
            A forty-year projection of workforce transformation in India's premier coastal tourism destination—where climate adaptation meets AI-augmented service excellence.
          </p>
          
          <div className="flex flex-wrap gap-12">
            {coverStats.map((stat, index) => (
              <div key={index}>
                <div className="font-playfair text-5xl text-white leading-none">{stat.value}</div>
                <div className="font-inter text-xs uppercase tracking-widest text-mist mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section Navigation */}
      <nav className="bg-white border-b border-platinum sticky top-14 z-40">
        <div className="mx-auto px-10 flex overflow-x-auto" style={{ maxWidth: '1400px', width: '100%' }}>
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`font-inter text-xs font-medium uppercase tracking-wider text-gray-500 px-6 py-4 border-b-2 whitespace-nowrap transition-all hover:text-crimson hover:border-crimson ${
                activeSection === section.id ? 'text-crimson border-crimson' : 'border-transparent'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
      
      <main className="mx-auto px-10" style={{ maxWidth: '1400px', width: '100%' }}>
        {/* Executive Summary */}
        <section id="executive" className="report-section py-20 border-b border-platinum">
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">Section I</div>
          <h2 className="font-playfair text-4xl font-normal text-black leading-tight mb-6">Executive Synthesis</h2>
          
          <p className="text-lg leading-relaxed text-charcoal mb-5">
            <strong>The most striking finding:</strong> By 2064, Goa's hospitality workforce will have fundamentally inverted its skill pyramid. Today's dominant roles—room attendants, front desk agents, and food service workers—will represent less than 15% of total employment, while entirely new categories of work centered on climate resilience, cultural authentication, and human-AI orchestration will account for over 60% of positions.
          </p>
          <p className="text-lg leading-relaxed text-charcoal mb-5">
            Our analysis projects a <strong>net positive employment trajectory of +23%</strong> despite an aggregate sector RPI of 0.47—indicating significant transformation. This counterintuitive finding emerges from Goa's unique positioning.
          </p>
          <p className="text-lg leading-relaxed text-charcoal mb-10">
            The transformation will unfold across three distinct phases: <em>Augmentation</em> (2025-2040), where AI tools enhance existing roles; <em>Restructuring</em> (2040-2055), where new role categories emerge; and <em>Equilibrium</em> (2055-2064), where the human-AI service model stabilizes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {execCards.map((card) => (
              <div 
                key={card.id}
                className="bg-white border border-platinum p-8 relative border-l-4 border-l-crimson"
              >
                <div className="font-inter text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{card.title}</div>
                <div className="font-playfair text-6xl text-black leading-none mb-2">{card.value}</div>
                <div className={`font-inter text-sm font-medium ${
                  card.changeType === 'positive' ? 'text-positive' : 
                  card.changeType === 'negative' ? 'text-crimson' : 'text-gray-500'
                }`}>
                  {card.change}
                </div>
                <div className="text-base text-gray-500 mt-4">{card.description}</div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Prologue */}
        <section id="prologue" className="report-section py-20 border-b border-platinum">
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">Section II</div>
          <h2 className="font-playfair text-4xl font-normal text-black leading-tight mb-6">The World of 2064: Narrative Prologue</h2>
          
          <div className="bg-white my-16 p-10 md:p-16 border border-platinum relative">
            {/* Quote mark */}
            <div className="font-playfair text-[200px] text-platinum absolute -top-5 left-8 leading-none select-none">"</div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              {prologueText.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`text-xl leading-loose text-charcoal mb-7 ${
                    index === 0 ? 'first-letter:font-playfair first-letter:text-7xl first-letter:float-left first-letter:leading-[0.8] first-letter:mr-3 first-letter:text-crimson' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
        
        {/* Methodology */}
        <section id="methodology" className="report-section py-20 border-b border-platinum">
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">Section III</div>
          <h2 className="font-playfair text-4xl font-normal text-black leading-tight mb-6">Methodology & Assumptions</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-playfair text-2xl font-normal mb-6 mt-12">Research Sources</h3>
              <ul className="font-inter text-sm text-gray-500 leading-loose list-none p-0">
                {[
                  'World Travel & Tourism Council Employment Projections 2024-2035',
                  'India Tourism Statistics 2023, Ministry of Tourism',
                  'Goa State Action Plan on Climate Change (SAPCC)',
                  'National Centre for Coastal Research Erosion Studies',
                  'American Hotel & Lodging Association Workforce Reports 2024',
                  'Hospitality Robots Market Analysis (Mordor Intelligence)',
                  'BLS Occupational Outlook Handbook—Lodging Managers',
                  'ScienceDirect: AI Adoption in Hospitality Research'
                ].map((source, idx) => (
                  <li key={idx} className="py-2 border-b border-platinum">{source}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-normal mb-6 mt-12">Key Assumptions</h3>
              <ul className="font-inter text-sm text-gray-500 leading-loose list-none p-0">
                {[
                  { label: 'Climate:', text: '40% of Goa\'s low-lying areas impacted by 2050; adaptive infrastructure by 2030' },
                  { label: 'Technology:', text: 'Hospitality robotics CAGR 17-25% through 2040; AI-human models mature by 2045' },
                  { label: 'Regulation:', text: 'Cultural authenticity frameworks by 2035; human-interaction minimums by 2040' },
                  { label: 'Economics:', text: 'India remains top-5 tourism destination; Goa\'s premium positioning strengthens' },
                  { label: 'Demographics:', text: 'Hospitality training capacity doubles by 2040' }
                ].map((item, idx) => (
                  <li key={idx} className="py-2 border-b border-platinum">
                    <strong className="text-black">{item.label}</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* RPI Framework */}
          <div className="bg-black text-white p-10 mt-10">
            <h4 className="text-crimson font-inter text-sm font-semibold uppercase tracking-wider mb-4">RPI Framework</h4>
            <p className="text-titanium text-base mb-6">
              The Replaceability Potential Index decomposes roles into tasks, scored across: <strong className="text-white">APS</strong> (Automation Probability Score, 0-1), <strong className="text-white">W</strong> (Weight/time proportion), <strong className="text-white">HRF</strong> (Human Resilience Factor, 0-1). Task score: HRA_t = APS × W × (1-HRF). Role RPI = Σ HRA_t
            </p>
            <div className="flex overflow-hidden rounded">
              {[
                { range: '0.00-0.20', label: 'Human Resilient', color: 'bg-teal' },
                { range: '0.21-0.40', label: 'Augmentation', color: 'bg-slate' },
                { range: '0.41-0.60', label: 'Transformation', color: 'bg-gold' },
                { range: '0.61-0.80', label: 'High Displacement', color: 'bg-crimson' },
                { range: '0.81-1.00', label: 'Near-Complete', color: 'bg-deep-crimson' }
              ].map((segment, idx) => (
                <div key={idx} className={`flex-1 p-4 text-center font-inter text-xs text-white ${segment.color}`}>
                  <div className="font-bold text-sm mb-1">{segment.range}</div>
                  {segment.label}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Future Roles */}
        <section id="roles" className="report-section py-20 border-b border-platinum">
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">Section IV</div>
          <h2 className="font-playfair text-4xl font-normal text-black leading-tight mb-10">Future Roles Analysis</h2>
          
          {roles.slice(0, 3).map((role) => (
            <ReportCard key={role.number} role={role} />
          ))}
          
          {roles.slice(3).map((role) => (
            <ReportCard key={role.number} role={role} isCompact />
          ))}
        </section>
        
        {/* Charts placeholder */}
        <section id="charts" className="report-section py-20 border-b border-platinum">
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">Section V</div>
          <h2 className="font-playfair text-4xl font-normal text-black leading-tight mb-10">Analytics Dashboard</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-platinum p-8">
              <h3 className="font-playfair text-xl mb-6">RPI Distribution Across Future Roles</h3>
              <div className="h-64 bg-gradient-to-br from-bg to-platinum flex items-center justify-center text-gray-500 font-inter text-sm">
                Chart visualization would render here with Chart.js
              </div>
            </div>
            <div className="bg-white border border-platinum p-8">
              <h3 className="font-playfair text-xl mb-6">Workforce Composition Shift: 2024 → 2064</h3>
              <div className="h-64 bg-gradient-to-br from-bg to-platinum flex items-center justify-center text-gray-500 font-inter text-sm">
                Chart visualization would render here with Chart.js
              </div>
            </div>
          </div>
        </section>
        
        {/* Scenarios */}
        <section id="scenarios" className="report-section py-20 border-b border-platinum">
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">Section VI</div>
          <h2 className="font-playfair text-4xl font-normal text-black leading-tight mb-10">Three Scenarios</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const borderColors = {
                acceleration: 'border-t-teal',
                baseline: 'border-t-gold',
                disruption: 'border-t-crimson'
              };
              
              return (
                <div 
                  key={scenario.id}
                  className={`bg-white border border-platinum border-t-4 ${borderColors[scenario.type]} p-8`}
                >
                  <h3 className="font-playfair text-2xl mb-4">{scenario.title}</h3>
                  <p className="text-base text-gray-500 mb-6">{scenario.description}</p>
                  <p className="text-base">
                    <strong className="text-black">Outcome:</strong> {scenario.outcome}
                  </p>
                  <div className="font-inter text-xs uppercase tracking-wider text-gray-500 mt-6 pt-4 border-t border-platinum">
                    <strong className="block text-black font-semibold mb-2">{scenario.indicator.title}</strong>
                    {scenario.indicator.text}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Implications */}
        <section id="implications" className="report-section py-20">
          <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">Section VII</div>
          <h2 className="font-playfair text-4xl font-normal text-black leading-tight mb-10">Strategic Implications</h2>
          
          {Object.entries(recommendations).map(([category, items]) => (
            <div key={category} className="mb-10">
              <h3 className="font-playfair text-2xl mb-4 pb-3 border-b-2 border-crimson capitalize">
                For {category === 'policymakers' ? 'Policymakers' : category === 'industry' ? 'Industry Leaders' : 'Individuals'}
              </h3>
              <ol className="list-none m-0 p-0">
                {items.map((item, idx) => (
                  <li 
                    key={idx}
                    className="py-5 pl-16 relative border-b border-platinum"
                  >
                    <span className="absolute left-0 top-5 w-10 h-10 bg-crimson text-white font-playfair text-xl flex items-center justify-center rounded-full">
                      {idx + 1}
                    </span>
                    <h4 className="font-inter text-base font-semibold mb-2">{item.title}</h4>
                    <p className="text-base text-gray-500 m-0">{item.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      </main>
      
      {/* CTA Section */}
      <section className="bg-black py-20 px-10 text-center mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-4xl text-white mb-4">Unlock the Full Report</h2>
          <p className="text-xl text-titanium mb-8">
            This executive briefing represents 20% of our complete analysis. Access detailed methodology, extended role profiles, and bespoke scenario modeling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="bg-crimson text-white px-8 py-4 font-inter text-sm font-semibold uppercase tracking-wider no-underline hover:bg-deep-crimson transition-all">
              Purchase Full Report
            </a>
            <a href="#" className="bg-transparent text-white px-8 py-4 font-inter text-sm font-semibold uppercase tracking-wider no-underline border border-mist hover:border-white transition-all">
              Request Bespoke Analysis
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Reports;
