import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Search, Star, BadgeCheck, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { cn } from "@/lib/utils";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import PullToRefresh from "@/components/PullToRefresh";
import { SkeletonList } from "@/components/ui/skeleton-card";
import { mockSantas } from "@/lib/mockData";
import { Link } from "react-router-dom";

const SearchSantas = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>(new Date(2024, 11, 24));
  const [hasSearched, setHasSearched] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 600));
    setHasSearched(true);
    setIsSearching(false);
  };

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <PullToRefresh onRefresh={handleRefresh}>
        {/* Search Section */}
        <section className="pt-20 md:pt-28 pb-8 md:pb-12 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-serif text-2xl md:text-4xl text-snow text-center mb-6 md:mb-8">
                Hitta din <span className="text-gradient-gold">tomte</span>
              </h1>
              
              {/* Search Form */}
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-soft">
                <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Plats</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Stad eller postnummer"
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
                          {date ? format(date, "d MMM yyyy", { locale: sv }) : "Välj datum"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card z-50" align="start">
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
                    <label className="text-sm font-medium text-transparent hidden md:block">Sök</label>
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full h-12"
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                      {isSearching ? "Söker..." : "Sök tomtar"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {hasSearched && (
          <section className="py-6 md:py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h2 className="font-serif text-xl md:text-2xl text-foreground">
                    {mockSantas.length} tomtar tillgängliga
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {date && format(date, "d MMMM yyyy", { locale: sv })} • {location || "Alla platser"}
                  </p>
                </div>
                <div className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
                  <Button variant="outline" size="sm" className="flex-shrink-0 h-9">Pris</Button>
                  <Button variant="outline" size="sm" className="flex-shrink-0 h-9">Betyg</Button>
                  <Button variant="outline" size="sm" className="flex-shrink-0 h-9">Avstånd</Button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading || isSearching ? (
                <SkeletonList count={8} variant="santa" />
              ) : (
                /* Santa Cards Grid */
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                  {mockSantas.map((santa) => (
                    <Link
                      key={santa.id}
                      to={`/tomte/${santa.id}`}
                      className="group bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
                    >
                      {/* Image */}
                      <div className="relative h-36 md:h-56 overflow-hidden bg-muted">
                        <img
                          src={santa.image}
                          alt={santa.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {santa.verified && (
                          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-primary text-primary-foreground px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 shadow-md">
                            <BadgeCheck className="w-3 h-3 md:w-3.5 md:h-3.5" />
                            <span className="hidden xs:inline">BankID</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-3 md:p-5">
                        <div className="flex items-start justify-between mb-1 md:mb-2">
                          <h3 className="font-serif text-base md:text-xl text-foreground truncate pr-1">{santa.name}</h3>
                          <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent fill-accent" />
                            <span className="font-medium text-foreground text-sm md:text-base">{santa.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">
                          <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                          <span className="truncate">{santa.location}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-border/50">
                          <div>
                            <span className="font-serif text-base md:text-xl text-foreground">{santa.pricePerQuarter}</span>
                            <span className="text-muted-foreground text-xs md:text-sm"> kr</span>
                          </div>
                          <span className="text-muted-foreground text-xs hidden md:inline">
                            {santa.reviews} omdömen
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <Footer />
      </PullToRefresh>
    </div>
  );
};

export default SearchSantas;
