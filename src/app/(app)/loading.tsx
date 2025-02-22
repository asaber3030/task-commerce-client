"use client";

const GeometricLoadingScreen = () => {
  return (
    <div className='fixed inset-0 bg-gradient-to-r from-blue-900 to-slate-900 flex items-center justify-center'>
      <div className='relative'>
        {/* Hexagon container */}
        <div className='relative w-40 h-40'>
          {/* Rotating hexagons */}
          <div className='absolute inset-0 animate-spin-slow'>
            <div
              className='w-40 h-40 border-4 border-cyan-500/30 rotate-[30deg] transform-gpu'
              style={{
                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)"
              }}
            />
          </div>

          <div className='absolute inset-0 animate-spin-reverse-slow'>
            <div
              className='w-32 h-32 border-4 border-blue-400/40 rotate-[30deg] transform-gpu absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              style={{
                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)"
              }}
            />
          </div>

          {/* Center pulsing star */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div
              className='w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse transform-gpu'
              style={{
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
              }}
            />
          </div>

          {/* Orbiting dots */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-400 animate-orbit'
              style={{
                animationDelay: `${i * -0.6}s`,
                transform: `rotate(${i * 60}deg) translateX(64px)`
              }}
            />
          ))}
        </div>

        {/* Loading text with gradient */}
        <div className='absolute -bottom-16 left-1/2 -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold tracking-widest animate-pulse'>
          LOADING
        </div>
      </div>
    </div>
  );
};

export default GeometricLoadingScreen;
