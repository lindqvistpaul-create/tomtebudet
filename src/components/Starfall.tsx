import { Star } from "lucide-react";
import { useMemo } from "react";

interface StarfallProps {
  count?: number;
}

const Starfall = ({ count = 12 }: StarfallProps) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 12,
      animationDelay: Math.random() * 10,
      size: 10 + Math.random() * 14,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="starfall"
          style={{
            left: `${star.left}%`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            opacity: star.opacity,
          }}
        >
          <Star
            className="fill-current"
            style={{ width: star.size, height: star.size }}
          />
        </div>
      ))}
    </div>
  );
};

export default Starfall;
