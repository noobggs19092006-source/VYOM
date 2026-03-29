import React from 'react';

const ShinyText = ({ 
  text, 
  speed = 2, 
  delay = 0, 
  color = "#b5b5b5", 
  shineColor = "#ffffff", 
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  ...props 
}) => {
  if (disabled) return <span {...props}>{text}</span>;

  const bgStyle = direction === "left" 
    ? `linear-gradient(120deg, ${color} 0%, ${color} 40%, ${shineColor} 50%, ${color} 60%, ${color} 100%)`
    : `linear-gradient(240deg, ${color} 0%, ${color} 40%, ${shineColor} 50%, ${color} 60%, ${color} 100%)`;

  return (
    <span
      className={`inline font-bold ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      style={{
        backgroundImage: bgStyle,
        backgroundSize: `${spread * 2}% auto`,
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: `shineAnim ${speed}s linear infinite ${yoyo ? 'alternate' : 'normal'}`,
        animationDelay: `${delay}s`
      }}
      {...props}
    >
      {text}
      <style>{`
        @keyframes shineAnim {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
      `}</style>
    </span>
  );
};

export default ShinyText;
