import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import {
  SantaHatIcon,
  GiftIcon,
  StarIcon,
  HeartIcon,
  BellIcon,
  BankIdIcon,
  FamilyIcon,
  ReindeerIcon,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  MapPinIcon,
  SnowflakeIcon,
  ChristmasTreeIcon,
  CreditCardIcon,
  ChatIcon,
  SparklesIcon,
  UserIcon,
  CheckIcon,
  OrnamentIcon,
} from "@/components/TomtebudetIcons";

const icons = [
  { name: "Tomteluva", icon: SantaHatIcon, desc: "Santa hat" },
  { name: "Paket", icon: GiftIcon, desc: "Gift/Present" },
  { name: "Stjärna", icon: StarIcon, desc: "Star" },
  { name: "Hjärta", icon: HeartIcon, desc: "Heart/Favorite" },
  { name: "Bjällra", icon: BellIcon, desc: "Bell/Notification" },
  { name: "BankID", icon: BankIdIcon, desc: "Verification/Security" },
  { name: "Familj", icon: FamilyIcon, desc: "Family" },
  { name: "Ren", icon: ReindeerIcon, desc: "Reindeer" },
  { name: "Kalender", icon: CalendarIcon, desc: "Calendar/Date" },
  { name: "Klocka", icon: ClockIcon, desc: "Clock/Time" },
  { name: "Hem", icon: HomeIcon, desc: "Home/Address" },
  { name: "Plats", icon: MapPinIcon, desc: "Location/Map" },
  { name: "Snöflinga", icon: SnowflakeIcon, desc: "Snowflake" },
  { name: "Julgran", icon: ChristmasTreeIcon, desc: "Christmas tree" },
  { name: "Betalning", icon: CreditCardIcon, desc: "Payment/Card" },
  { name: "Chatt", icon: ChatIcon, desc: "Chat/Message" },
  { name: "Magi", icon: SparklesIcon, desc: "Sparkles/Magic" },
  { name: "Användare", icon: UserIcon, desc: "User/Profile" },
  { name: "Bock", icon: CheckIcon, desc: "Check/Confirmed" },
  { name: "Julkula", icon: OrnamentIcon, desc: "Ornament" },
];

const IconShowcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Designsystem</span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
              Tomtebudet <span className="text-gradient-gold">Ikoner</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              20 minimalistiska linjeikoner i guld, designade för att matcha Tomtebudets premium julkänsla.
            </p>
          </div>

          {/* Icon Grid - Light Background */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-foreground mb-6">På ljus bakgrund</h2>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {icons.map(({ name, icon: Icon }) => (
                <div 
                  key={name}
                  className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border/50 hover:shadow-lg transition-shadow"
                >
                  <Icon size={32} />
                  <span className="text-xs text-muted-foreground text-center">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Icon Grid - Dark Background */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-foreground mb-6">På mörk bakgrund</h2>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 p-6 bg-primary rounded-2xl">
              {icons.map(({ name, icon: Icon }) => (
                <div 
                  key={name}
                  className="flex flex-col items-center gap-2 p-3"
                >
                  <Icon size={32} />
                  <span className="text-xs text-primary-foreground/70 text-center">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-foreground mb-6">Storlekar</h2>
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-end gap-8 flex-wrap">
                {[16, 20, 24, 32, 40, 48, 64].map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <GiftIcon size={size} />
                    <span className="text-xs text-muted-foreground">{size}px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stroke Weights */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-foreground mb-6">Linjetjocklek</h2>
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-8 flex-wrap">
                {[1, 1.5, 2, 2.5, 3].map((weight) => (
                  <div key={weight} className="flex flex-col items-center gap-2">
                    <StarIcon size={40} strokeWidth={weight} />
                    <span className="text-xs text-muted-foreground">{weight}px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Example */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-foreground mb-6">Användning</h2>
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <pre className="text-sm text-muted-foreground overflow-x-auto">
{`import { GiftIcon, StarIcon } from '@/components/TomtebudetIcons';

// Standard användning
<GiftIcon />

// Med anpassad storlek
<GiftIcon size={32} />

// Med anpassad färg
<StarIcon color="#FFFFFF" />

// Med anpassad linjetjocklek
<StarIcon strokeWidth={2} />

// Med className
<GiftIcon className="hover:scale-110 transition-transform" />`}
              </pre>
            </div>
          </div>

          {/* Icon with Labels */}
          <div>
            <h2 className="font-serif text-2xl text-foreground mb-6">Med etiketter</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {icons.slice(0, 6).map(({ name, icon: Icon, desc }) => (
                <div 
                  key={name}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IconShowcase;