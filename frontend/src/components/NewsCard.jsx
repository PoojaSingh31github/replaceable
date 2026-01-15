import PropTypes from 'prop-types';

const NewsCard = ({ report }) => {
  const { label, title, meta, stats, icon, isComingSoon, comingBadge } = report;
  
  return (
    <div className={`bg-white/[0.02] border border-white/[0.08] overflow-hidden transition-all duration-300 relative group hover:-translate-y-2 hover:border-crimson/30 hover:bg-white/[0.04] hover:shadow-2xl ${isComingSoon ? 'opacity-70 hover:opacity-100' : ''}`}>
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-crimson scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      
      {/* Image area */}
      <div 
        className="h-52 flex items-center justify-center relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #2d2d2d 0%, rgba(139, 22, 41, 0.3) 100%)' 
        }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(196, 30, 58, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 30, 58, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
        <span className="text-6xl relative z-10">{icon || '📊'}</span>
      </div>
      
      {/* Content */}
      <div className="p-8">
        {isComingSoon && comingBadge && (
          <span className="font-inter text-xs font-semibold uppercase tracking-wider bg-white/10 text-mist px-3 py-1.5 inline-block mb-3">
            {comingBadge}
          </span>
        )}
        <div className="font-inter text-xs font-semibold uppercase tracking-widest text-crimson mb-3">
          {label}
        </div>
        <h3 className="font-playfair text-2xl text-white mb-2 leading-tight">
          {title}
        </h3>
        <div className="font-inter text-sm text-mist mb-6">
          {meta}
        </div>
        
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="font-playfair text-2xl text-white">{stat.value}</div>
                <div className="font-inter text-[9px] text-mist uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  report: PropTypes.shape({
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    meta: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })),
    icon: PropTypes.string,
    isComingSoon: PropTypes.bool,
    comingBadge: PropTypes.string
  }).isRequired
};

export default NewsCard;
