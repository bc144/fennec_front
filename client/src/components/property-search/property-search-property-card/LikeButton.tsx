import React from 'react';
import '@/styles/animations.css';

interface LikeButtonProps {
  /**
   * Whether the item is liked/favorited
   */
  isLiked: boolean;
  /**
   * Function to handle like/unlike action
   */
  onToggle: () => void;
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Like/favorite button component with hover and click animations
 */
const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  onToggle,
  className = ''
}) => {
  return (
    <button 
      className={`
        w-10 h-10 
        bg-white/80 backdrop-blur-sm
        rounded-full 
        flex items-center justify-center 
        shadow-sm 
        transition-all duration-300 ease-in-out
        hover:bg-orange-50 
        focus:outline-none focus:ring-2 focus:ring-orange-300 
        group
        ${className}
      `}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isLiked ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <div className="relative">
        {/* Corazón base */}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          className={`
            transform transition-all duration-300 ease-in-out
            ${isLiked ? 'scale-110' : 'scale-100 group-hover:scale-105'}
          `}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
            fill={isLiked ? "#f97316" : "none"}
            stroke={isLiked ? "#f97316" : "currentColor"}
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`
              transition-all duration-300 ease-in-out
              ${isLiked ? '' : 'text-gray-400 group-hover:text-orange-500'}
            `}
          />
        </svg>
        
        {/* Efecto de partículas al dar like */}
        {isLiked && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-8 h-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute w-1 h-1 bg-orange-500 rounded-full
                    animate-particle-${i}
                  `}
                  style={{
                    '--particle-angle': `${i * 60}deg`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default LikeButton;
