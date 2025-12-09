import { cn } from "@/lib/utils";

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const defaultProps = {
  size: 24,
  color: "#D4A657",
  strokeWidth: 1.5,
};

// 1. Tomteluva (Santa Hat)
export const SantaHatIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path 
      d="M4 20C4 20 6 18 12 18C18 18 20 20 20 20" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
    />
    <path 
      d="M6 18C6.5 14 8 9 10 6C11 4.5 12 4 14 4C15 4 16.5 4.5 18 6" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
    />
    <path 
      d="M18 6C19 7 20 9 20 11C20 12 19.5 13 18 13" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round"
    />
    <circle cx="18" cy="13" r="2" fill={color} />
  </svg>
);

// 2. Paket (Gift)
export const GiftIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <rect x="4" y="10" width="16" height="11" rx="1" stroke={color} strokeWidth={strokeWidth} />
    <rect x="3" y="6" width="18" height="5" rx="1" stroke={color} strokeWidth={strokeWidth} />
    <line x1="12" y1="6" x2="12" y2="21" stroke={color} strokeWidth={strokeWidth} />
    <path d="M12 6C11 5 9 3 7.5 3.5C6 4 6 5.5 7 6C8 6.5 10 6 12 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M12 6C13 5 15 3 16.5 3.5C18 4 18 5.5 17 6C16 6.5 14 6 12 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// 3. Stjärna (Star)
export const StarIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path 
      d="M12 3L14.2 9.3L21 9.8L16 14.2L17.5 21L12 17.5L6.5 21L8 14.2L3 9.8L9.8 9.3L12 3Z" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinejoin="round"
    />
  </svg>
);

// 4. Hjärta (Heart)
export const HeartIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path 
      d="M12 20L4.5 12.5C2.5 10.5 2.5 7 4.5 5C6.5 3 10 3 12 5.5C14 3 17.5 3 19.5 5C21.5 7 21.5 10.5 19.5 12.5L12 20Z" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinejoin="round"
    />
  </svg>
);

// 5. Klocka/Bjällra (Bell)
export const BellIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path 
      d="M18 10C18 6.7 15.3 4 12 4C8.7 4 6 6.7 6 10V16L4 18V19H20V18L18 16V10Z" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinejoin="round"
    />
    <path d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="12" y1="2" x2="12" y2="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// 6. BankID / Verifiering (Shield with check)
export const BankIdIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path 
      d="M12 3L4 7V11C4 16.5 7.4 21.3 12 22.5C16.6 21.3 20 16.5 20 11V7L12 3Z" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinejoin="round"
    />
    <path d="M8.5 12L11 14.5L15.5 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 7. Familj (Family)
export const FamilyIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    {/* Adult 1 */}
    <circle cx="8" cy="6" r="2" stroke={color} strokeWidth={strokeWidth} />
    <path d="M5 21V16C5 14.3 6.3 13 8 13C9.7 13 11 14.3 11 16V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Adult 2 */}
    <circle cx="16" cy="6" r="2" stroke={color} strokeWidth={strokeWidth} />
    <path d="M13 21V16C13 14.3 14.3 13 16 13C17.7 13 19 14.3 19 16V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Child */}
    <circle cx="12" cy="10" r="1.5" stroke={color} strokeWidth={strokeWidth} />
    <path d="M10 21V18C10 16.9 10.9 16 12 16C13.1 16 14 16.9 14 18V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// 8. Renar (Reindeer)
export const ReindeerIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    {/* Head */}
    <ellipse cx="12" cy="14" rx="4" ry="5" stroke={color} strokeWidth={strokeWidth} />
    {/* Antlers left */}
    <path d="M8 12C6 10 5 7 5 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M6 8C5 7 4 7 3 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M6.5 6C6 5 5 5 4 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Antlers right */}
    <path d="M16 12C18 10 19 7 19 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M18 8C19 7 20 7 21 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M17.5 6C18 5 19 5 20 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Nose */}
    <circle cx="12" cy="16" r="1" fill={color} />
    {/* Eyes */}
    <circle cx="10" cy="13" r="0.5" fill={color} />
    <circle cx="14" cy="13" r="0.5" fill={color} />
  </svg>
);

// 9. Kalender (Calendar)
export const CalendarIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <rect x="4" y="5" width="16" height="16" rx="2" stroke={color} strokeWidth={strokeWidth} />
    <line x1="4" y1="10" x2="20" y2="10" stroke={color} strokeWidth={strokeWidth} />
    <line x1="8" y1="3" x2="8" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="16" y1="3" x2="16" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* 24 */}
    <text x="12" y="17" textAnchor="middle" fill={color} fontSize="6" fontWeight="600" fontFamily="serif">24</text>
  </svg>
);

// 10. Klocka/Tid (Clock)
export const ClockIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
    <path d="M12 6V12L15 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 11. Hem (Home)
export const HomeIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path d="M4 11L12 4L20 11V20H15V15H9V20H4V11Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </svg>
);

// 12. Karta/Plats (Map Pin)
export const MapPinIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path d="M12 21C12 21 19 14.5 19 9.5C19 5.4 15.9 2 12 2C8.1 2 5 5.4 5 9.5C5 14.5 12 21 12 21Z" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="12" cy="9.5" r="2.5" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);

// 13. Snöflinga (Snowflake)
export const SnowflakeIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="19.1" y1="4.9" x2="4.9" y2="19.1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Branch details */}
    <path d="M12 5L10 7M12 5L14 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M12 19L10 17M12 19L14 17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M5 12L7 10M5 12L7 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M19 12L17 10M19 12L17 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// 14. Julgran (Christmas Tree)
export const ChristmasTreeIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path d="M12 3L7 10H9L5 16H8L4 21H20L16 16H19L15 10H17L12 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <line x1="12" y1="21" x2="12" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// 15. Betalning/Kort (Credit Card)
export const CreditCardIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth={strokeWidth} />
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth={strokeWidth} />
    <line x1="7" y1="15" x2="11" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// 16. Meddelande/Chatt (Chat)
export const ChatIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path d="M21 12C21 16.4 16.9 20 12 20C10.5 20 9 19.7 7.7 19.1L3 21L4.4 16.9C3.5 15.5 3 13.8 3 12C3 7.6 7.1 4 12 4C16.9 4 21 7.6 21 12Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <circle cx="8" cy="12" r="1" fill={color} />
    <circle cx="12" cy="12" r="1" fill={color} />
    <circle cx="16" cy="12" r="1" fill={color} />
  </svg>
);

// 17. Sparkles/Magi (Sparkles)
export const SparklesIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path d="M12 3L13 8L18 9L13 10L12 15L11 10L6 9L11 8L12 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M5 16L5.5 18L7.5 18.5L5.5 19L5 21L4.5 19L2.5 18.5L4.5 18L5 16Z" fill={color} />
    <path d="M18 14L18.5 16L20.5 16.5L18.5 17L18 19L17.5 17L15.5 16.5L17.5 16L18 14Z" fill={color} />
  </svg>
);

// 18. Användare (User)
export const UserIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} />
    <path d="M4 21V19C4 16.2 6.2 14 9 14H15C17.8 14 20 16.2 20 19V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// 19. Bock/Check (Check)
export const CheckIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <path d="M4 12L9 17L20 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 20. Julkula (Ornament)
export const OrnamentIcon = ({ 
  size = defaultProps.size, 
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className 
}: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("flex-shrink-0", className)}>
    <circle cx="12" cy="14" r="7" stroke={color} strokeWidth={strokeWidth} />
    <path d="M12 7V4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M10 4H14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M12 3V4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M9 11C9 11 10 14 12 14C14 14 15 11 15 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

// Export all icons as a collection
export const TomtebudetIcons = {
  SantaHat: SantaHatIcon,
  Gift: GiftIcon,
  Star: StarIcon,
  Heart: HeartIcon,
  Bell: BellIcon,
  BankId: BankIdIcon,
  Family: FamilyIcon,
  Reindeer: ReindeerIcon,
  Calendar: CalendarIcon,
  Clock: ClockIcon,
  Home: HomeIcon,
  MapPin: MapPinIcon,
  Snowflake: SnowflakeIcon,
  ChristmasTree: ChristmasTreeIcon,
  CreditCard: CreditCardIcon,
  Chat: ChatIcon,
  Sparkles: SparklesIcon,
  User: UserIcon,
  Check: CheckIcon,
  Ornament: OrnamentIcon,
};

export default TomtebudetIcons;