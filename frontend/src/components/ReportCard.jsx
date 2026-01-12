import PropTypes from 'prop-types';

const ReportCard = ({ role, isCompact = false }) => {
  const { 
    number, 
    title, 
    timeline, 
    origin, 
    confidence, 
    narrative, 
    tasks, 
    rpiScore 
  } = role;

  const confidenceStyles = {
    high: 'bg-teal text-white',
    moderate: 'bg-gold text-white',
    speculative: 'bg-crimson text-white'
  };

  return (
    <div className="bg-white border border-platinum mb-10 overflow-hidden">
      {/* Header */}
      <div className="bg-black text-white p-8 flex flex-wrap justify-between items-start gap-4">
        <span className="font-playfair text-7xl font-normal text-charcoal leading-none mr-6">
          {String(number).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-playfair text-3xl font-normal mb-2">{title}</h3>
          <div className="font-inter text-xs text-mist flex gap-6 flex-wrap">
            <span>📅 {timeline}</span>
            {origin && <span>🎯 From: {origin}</span>}
            {rpiScore !== undefined && <span>RPI: {rpiScore}</span>}
          </div>
        </div>
        {confidence && (
          <span className={`font-inter text-xs font-semibold uppercase tracking-wider px-4 py-2 ${confidenceStyles[confidence.toLowerCase()] || confidenceStyles.moderate}`}>
            {confidence}
          </span>
        )}
      </div>
      
      {/* Body */}
      <div className="p-8">
        {/* Narrative */}
        <div className="text-lg leading-relaxed text-charcoal mb-8 border-l-[3px] border-crimson pl-6">
          {narrative}
        </div>
        
        {/* RPI Table - only show for non-compact */}
        {!isCompact && tasks && tasks.length > 0 && (
          <table className="w-full border-collapse font-inter text-sm my-6">
            <thead>
              <tr className="bg-black text-white">
                <th className="text-left p-3.5 font-semibold uppercase tracking-wide text-xs">Task</th>
                <th className="text-left p-3.5 font-semibold uppercase tracking-wide text-xs">APS</th>
                <th className="text-left p-3.5 font-semibold uppercase tracking-wide text-xs">W</th>
                <th className="text-left p-3.5 font-semibold uppercase tracking-wide text-xs">HRF</th>
                <th className="text-left p-3.5 font-semibold uppercase tracking-wide text-xs">HRA_t</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className="hover:bg-platinum border-b border-platinum">
                  <td className="p-3.5">{task.name}</td>
                  <td className="p-3.5">{task.aps}</td>
                  <td className="p-3.5">{task.w}</td>
                  <td className="p-3.5">{task.hrf}</td>
                  <td className="p-3.5 font-bold">{task.hraT}</td>
                </tr>
              ))}
              <tr className="bg-bg font-bold">
                <td colSpan={4} className="p-3.5">ROLE RPI</td>
                <td className="p-3.5 font-bold">{rpiScore}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

ReportCard.propTypes = {
  role: PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
    origin: PropTypes.string,
    confidence: PropTypes.string,
    narrative: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      aps: PropTypes.number,
      w: PropTypes.number,
      hrf: PropTypes.number,
      hraT: PropTypes.number
    })),
    rpiScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  isCompact: PropTypes.bool
};

export default ReportCard;
