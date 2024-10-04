import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found | EduWiz';
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-container-light dark:bg-container-dark">
      <div className="relative w-96 h-96">
        {/* Police Box */}
        <svg viewBox="0 0 100 100" className="absolute inset-0">
          <rect x="30" y="20" width="40" height="60" fill="#0057B8" className="origin-bottom animate-scaleY" />
          <rect x="28" y="15" width="44" height="5" fill="#003B7E" className="origin-left animate-scaleX delay-500" />
          {/* Windows */}
          {[25, 40, 55, 70].map((y, i) => (
            <rect
              key={i}
              x="35"
              y={y}
              width="10"
              height="10"
              fill="#FFFFFF"
              className={`animate-fadeIn delay-[${i * 100}ms]`}
            />
          ))}
          {[25, 40, 55, 70].map((y, i) => (
            <rect
              key={i}
              x="55"
              y={y}
              width="10"
              height="10"
              fill="#FFFFFF"
              className={`animate-fadeIn delay-[${i * 100}ms]`}
            />
          ))}
        </svg>

        {/* Error Sign */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 animate-slideInRight">
          <rect x="60" y="40" width="30" height="40" fill="#FFFFFF" />
          <text x="62" y="55" fontSize="6" fill="#000000">
            ERROR
          </text>
          <text x="62" y="65" fontSize="12" fill="#000000">
            404
          </text>
          <text x="62" y="75" fontSize="4" fill="#000000">
            Page not Found
          </text>
        </svg>

        {/* Paper Airplane (Top Right to Center) */}
        <svg
          viewBox="0 0 100 100"
          className="absolute right-0 top-0 w-24 h-24 animate-fly dark:text-white text-primary-light"
        >
          {/* Paper Airplane Path */}
          <path d="M20 40 L50 50 L30 20 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
