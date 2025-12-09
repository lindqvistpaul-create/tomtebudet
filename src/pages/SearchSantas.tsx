import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Search, Star, BadgeCheck } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { cn } from "@/lib/utils";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { mockSantas } from "@/lib/mockData";
import { Link } from "react-router-dom";

const SearchSantas = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>(new Date(2024, 11, 24));
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = () => {
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      {/* Search Section */}
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl text-snow text-center mb-8">
              Hitta din <span className="text-gradient-gold">tomte</span>
            </h1>
            
            {/* Search Form */}
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Plats</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Ange stad eller postnummer"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-12 bg-background"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Datum</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal bg-background",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {date ? format(date, "d MMMM yyyy", { locale: sv }) : "Välj datum"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Search Button */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-transparent">Sök</label>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full h-12"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5" />
                    Sök tomtar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl text-foreground">
                  {mockSantas.length} tomtar tillgängliga
                </h2>
                <p className="text-muted-foreground">
                  {date && format(date, "d MMMM yyyy", { locale: sv })} • {location || "Alla platser"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Pris</Button>
                <Button variant="outline" size="sm">Betyg</Button>
                <Button variant="outline" size="sm">Avstånd</Button>
              </div>
            </div>

            {/* Santa Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockSantas.map((santa) => (
                <Link
                  key={santa.id}
                  to={`/tomte/${santa.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={santa.image}
                      alt={santa.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {santa.verified && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        BankID
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-xl text-foreground">{santa.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-medium text-foreground">{santa.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{santa.location}</span>
                      <span className="mx-1">•</span>
                      <span>{santa.distance}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div>
                        <span className="font-serif text-xl text-foreground">{santa.pricePerQuarter} kr</span>
                        <span className="text-muted-foreground text-sm"> / 15 min</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {santa.reviews} omdömen
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default SearchSantas;
