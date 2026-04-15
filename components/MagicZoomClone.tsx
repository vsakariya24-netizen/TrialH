import React, { useRef, useState } from "react";

interface Props {
  src: string;
  zoomSrc?: string;
  alt?: string;
  zoomLevel?: number;
  glassSize?: number;
}

const MagicZoomClone: React.FC<Props> = ({
  src,
  zoomSrc,
  alt,
  zoomLevel = 2,
  glassSize = 150,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [showZoom, setShowZoom] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  const getPosition = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    setPos({ x, y });
  };

  // 🖱 Desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    setIsTouch(false);
    getPosition(e.clientX, e.clientY);
  };

  // 📱 Mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    setIsTouch(true);
    const touch = e.touches[0];
    getPosition(touch.clientX, touch.clientY);
  };

  // 👉 IMPORTANT: offset for mobile (finger ke upar)
  const getGlassPosition = () => {
    const offsetY = isTouch ? glassSize * 0.9 : glassSize / 2;

    return {
      left: pos.x - glassSize / 2,
      top: pos.y - offsetY,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setShowZoom(true)}
      onTouchEnd={() => setShowZoom(false)}
      onTouchMove={handleTouchMove}
    >
      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />

      {/* Zoom Glass */}
      {showZoom && (
        <div
          className="absolute border-2 border-yellow-500 rounded-full pointer-events-none shadow-lg transition-all duration-75"
          style={{
            width: glassSize,
            height: glassSize,
            ...getGlassPosition(),
            backgroundImage: `url(${zoomSrc || src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `
              ${(pos.x / (containerRef.current?.offsetWidth || 1)) * 100}% 
              ${(pos.y / (containerRef.current?.offsetHeight || 1)) * 100}%
            `,
          }}
        />
      )}
    </div>
  );
};

export default MagicZoomClone;