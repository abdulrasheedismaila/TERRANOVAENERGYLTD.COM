import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  caption?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  priority = false,
  caption,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#2C1A11] via-[#1E3524] to-[#14532D] text-[#FBF9F5] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Leaf className="w-8 h-8 text-[#D99B26] mb-3 opacity-90" />
        <p className="text-xs font-medium max-w-xs text-[#FBF9F5]/90 leading-relaxed">{alt}</p>
        {caption && <p className="text-[11px] text-[#FBF9F5]/70 mt-1 italic">{caption}</p>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
