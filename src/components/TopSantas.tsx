import { Star, BadgeCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const santas = [
  {
    id: "1",
    name: "Tomte Erik",
    location: "Stockholm",
    distance: "2.3 km",
    rating: 5.0,
    reviews: 47,
    pricePerQuarter: 650,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "2",
    name: "Tomte Magnus",
    location: "Göteborg",
    distance: "1.8 km",
    rating: 4.9,
    reviews: 32,
    pricePerQuarter: 600,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "3",
    name: "Tomte Karl",
    location: "Malmö",
    distance: "3.1 km",
    rating: 4.8,
    reviews: 28,
    pricePerQuarter: 550,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "4",
    name: "Tomte Anders",
    location: "Uppsala",
    distance: "4.5 km",
    rating: 5.0,
    reviews: 19,
    pricePerQuarter: 625,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
];

const TopSantas = () => {
  return (
    <section id="top-santas" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header - compact on mobile */}
        <div className="text-center mb-6 md:mb-16">
          <span className="text-accent font-medium text-xs md:text-sm uppercase tracking-wider">Boka tomte</span>
          <h2 className="font-serif text-2xl md:text-5xl text-foreground mt-2 md:mt-3 mb-2 md:mb-4">
            Populära <span className="text-primary">jultomtar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg hidden sm:block">
            Möt våra BankID-verifierade och uppskattade tomtar
          </p>
        </div>

        {/* Santas - horizontal scroll on mobile */}
        <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible snap-x snap-mandatory">
          {santas.map((santa) => (
            <Link
              key={santa.id}
              to={`/tomte/${santa.id}`}
              className="group santa-card bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-soft border border-border/50 flex-shrink-0 w-[200px] md:w-auto snap-start"
            >
              {/* Image - shorter on mobile */}
              <div className="relative h-36 md:h-56 overflow-hidden bg-muted">
                <img
                  src={santa.image}
                  alt={santa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Verification badge - smaller on mobile */}
                {santa.verified && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-primary text-primary-foreground px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 shadow-md">
                    <BadgeCheck className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span className="hidden sm:inline">Verifierad</span>
                  </div>
                )}
              </div>

              {/* Content - compact on mobile */}
              <div className="p-3 md:p-5">
                {/* Name and rating */}
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-serif text-base md:text-xl text-foreground truncate pr-1">{santa.name}</h3>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent fill-accent" />
                    <span className="font-medium text-foreground text-sm md:text-base">{santa.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm mb-2 md:mb-4">
                  <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  <span className="truncate">{santa.location}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-border/50">
                  <div>
                    <span className="font-serif text-base md:text-xl text-foreground">{santa.pricePerQuarter}</span>
                    <span className="text-muted-foreground text-xs md:text-sm"> kr</span>
                  </div>
                  <span className="text-muted-foreground text-xs hidden md:inline">
                    ({santa.reviews})
                  </span>
                </div>
                
                <Button variant="default" size="sm" className="w-full mt-3 md:mt-4 h-9 md:h-10 text-sm">
                  Visa profil
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-6 md:mt-12">
          <Link to="/sok">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 w-full sm:w-auto">
              Utforska alla tomtar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSantas;
