import { ReactNode } from 'react';
import imgBasemapImage from "figma:asset/6e59641bcf6a90b6086138a4aa56bf2799b6bf2d.png";

interface MapBaseProps {
  children?: ReactNode;
  className?: string;
}

export default function MapBase({ children, className = '' }: MapBaseProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Map Background - Actual Nashik Map */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
        <img 
          src={imgBasemapImage} 
          alt="Nashik City Map" 
          className="w-full h-full object-contain"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      
      {/* Overlay content */}
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
