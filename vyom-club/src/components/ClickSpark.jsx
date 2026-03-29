import React, { useState, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  children
}) => {
  const [sparks, setSparks] = useState([]);

  const handleClick = useCallback((e) => {
    // Only capture clicks on the document that bubble up
    const { clientX, clientY } = e;
    const newSpark = { id: Date.now(), x: clientX, y: clientY };
    setSparks((current) => [...current, newSpark]);
    
    setTimeout(() => {
      setSparks((current) => current.filter((s) => s.id !== newSpark.id));
    }, duration);
  }, [duration]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      {sparks.map((spark) => (
        <div key={spark.id} style={{ position: 'fixed', left: spark.x, top: spark.y, pointerEvents: 'none', zIndex: 9999 }}>
          {[...Array(sparkCount)].map((_, i) => {
            const angle = (i * 360) / sparkCount;
            const rad = (angle * Math.PI) / 180;
            const dx = Math.cos(rad) * sparkRadius;
            const dy = Math.sin(rad) * sparkRadius;
            
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${sparkSize}px`,
                  height: '2px',
                  backgroundColor: sparkColor,
                  transformOrigin: '0 0',
                  animation: `sparkOut${spark.id}_${i} ${duration}ms ease-out forwards`
                }}
              />
            );
          })}
          <style>{`
            ${[...Array(sparkCount)].map((_, i) => {
              const angle = (i * 360) / sparkCount;
              const rad = (angle * Math.PI) / 180;
              const dx = Math.cos(rad) * sparkRadius;
              const dy = Math.sin(rad) * sparkRadius;
              return `
                @keyframes sparkOut${spark.id}_${i} {
                  0% { transform: rotate(${angle}deg) translate(0, 0) scaleX(1); opacity: 1; }
                  100% { transform: rotate(${angle}deg) translate(${dx}px, ${dy}px) scaleX(0); opacity: 0; }
                }
              `;
            }).join('\n')}
          `}</style>
        </div>
      ))}
    </>
  );
};

export default ClickSpark;
