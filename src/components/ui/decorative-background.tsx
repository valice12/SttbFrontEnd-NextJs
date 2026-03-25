import imgBackgroundComponent from "figma:asset/8bfa8b7b41cb66560717cf47d1956a947b1825ca.png";
import imgBackgroundComponentFlip from "figma:asset/80465bed59ca7cdead8d3f5a091bbf2983903d85.png";

interface DecorativeBackgroundProps {
  variant?: 'normal' | 'flip';
  className?: string;
}

export function DecorativeBackground({ variant = 'normal', className = '' }: DecorativeBackgroundProps) {
  const imageSrc = variant === 'flip' ? imgBackgroundComponentFlip : imgBackgroundComponent;
  
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <img 
        src={typeof imageSrc === 'string' ? imageSrc : (imageSrc as any).src || (imageSrc as any).default?.src || imageSrc} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
    </div>
  );
}
