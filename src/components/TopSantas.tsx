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
    <section id="top-santas" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Populära val</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Uppskattade tomtar <span className="text-primary">nära er</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Möt några av våra mest omtyckta tomtar – redo att göra er julafton magisk
          </p>
        </div>

        {/* Santas grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {santas.map((santa) => (
            <Link
              key={santa.id}
              to={`/tomte/${santa.id}`}
              className="group santa-card bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-muted">
                <img
                  src={santa.image}
                  alt={santa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Verification badge */}
                {santa.verified && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verifierad
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Name and location */}
                <h3 className="font-serif text-xl text-foreground mb-1">{santa.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{santa.location}</span>
                  <span className="mx-1">•</span>
                  <span>{santa.distance}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(santa.rating) ? "text-accent fill-accent" : "text-muted"}`} 
                      />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">{santa.rating}</span>
                  <span className="text-muted-foreground text-sm">({santa.reviews})</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <span className="font-serif text-xl text-foreground">{santa.pricePerQuarter} kr</span>
                    <span className="text-muted-foreground text-sm"> / 15 min</span>
                  </div>
                </div>
                
                <Button variant="default" size="default" className="w-full mt-4">
                  Visa profil
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link to="/sok">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
              Utforska alla tomtar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSantas;
