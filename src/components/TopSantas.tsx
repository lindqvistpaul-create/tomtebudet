import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const santas = [
  {
    name: "Tomte Erik",
    location: "Stockholm",
    rating: 5.0,
    reviews: 47,
    price: 1200,
    image: "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    name: "Tomte Magnus",
    location: "Göteborg",
    rating: 4.9,
    reviews: 32,
    price: 1100,
    image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    name: "Tomte Karl",
    location: "Malmö",
    rating: 4.8,
    reviews: 28,
    price: 1000,
    image: "https://images.unsplash.com/photo-1576015222774-6a5ed4e2c6f7?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
  {
    name: "Tomte Anders",
    location: "Uppsala",
    rating: 5.0,
    reviews: 19,
    price: 1150,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    verified: true,
  },
];

const TopSantas = () => {
  return (
    <section id="top-santas" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Populära tomtar</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Topptomtar <span className="text-primary">nära dig</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Upptäck våra högst betygsatta och mest populära tomtar
          </p>
        </div>

        {/* Santas grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {santas.map((santa) => (
            <div
              key={santa.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={santa.image}
                  alt={santa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {santa.verified && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" />
                    Verifierad
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-xl text-foreground mb-2">{santa.name}</h3>
                
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{santa.location}</span>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="font-medium text-foreground">{santa.rating}</span>
                  <span className="text-muted-foreground text-sm">({santa.reviews} omdömen)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl text-foreground">{santa.price} kr</span>
                    <span className="text-muted-foreground text-sm"> / besök</span>
                  </div>
                  <Button variant="default" size="sm">
                    Boka
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Visa alla tomtar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopSantas;
