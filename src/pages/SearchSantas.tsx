import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Shield,
  Gift,
  Users,
  AlertCircle,
  RefreshCw,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Snowfall from "@/components/Snowfall";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkeletonList } from "@/components/ui/skeleton-card";
import { supabase } from "@/integrations/supabase/client";
import { resolvePublicPhotoUrl } from "@/lib/santaPhotos";
import type { Database } from "@/integrations/supabase/types";

type PublicSanta = Database["public"]["Views"]["public_santas"]["Row"];

type SortOrder = "price_asc" | "price_desc";

/** Costume photo first, portrait as fallback, Gift placeholder if none/broken. */
const SantaCardImage = ({ santa }: { santa: PublicSanta }) => {
  const [broken, setBroken] = useState(false);
  const src =
    resolvePublicPhotoUrl(santa.costume_photo_url) ??
    resolvePublicPhotoUrl(santa.portrait_photo_url);

  if (!src || broken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary/10">
        <Gift className="w-10 h-10 md:w-14 md:h-14 text-primary/40" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={santa.display_name ? `Tomten ${santa.display_name}` : "Tomte"}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
};

const SearchSantas = () => {
  const [santas, setSantas] = useState<PublicSanta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("price_asc");

  useEffect(() => {
    document.title = "Hitta din tomte – Tomtebudet";
  }, []);

  const fetchSantas = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data, error: fetchError } = await supabase
        .from("public_santas")
        .select("*");

      if (fetchError) throw fetchError;
      setSantas(data ?? []);
    } catch (err) {
      console.error("Error fetching santas:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSantas();
  }, []);

  // Distinct cities from the loaded result, alphabetically (Swedish order)
  const cities = useMemo(() => {
    const set = new Set<string>();
    santas.forEach((s) => {
      if (s.city?.trim()) set.add(s.city.trim());
    });
    return [...set].sort((a, b) => a.localeCompare(b, "sv"));
  }, [santas]);

  const filteredSantas = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const result = santas.filter((s) => {
      const matchesTerm =
        !term ||
        s.display_name?.toLowerCase().includes(term) ||
        s.city?.toLowerCase().includes(term);
      const matchesCity =
        cityFilter === "all" || s.city?.trim() === cityFilter;
      return matchesTerm && matchesCity;
    });

    return result.sort((a, b) => {
      const priceA = a.price_per_quarter ?? Number.MAX_SAFE_INTEGER;
      const priceB = b.price_per_quarter ?? Number.MAX_SAFE_INTEGER;
      return sortOrder === "price_asc" ? priceA - priceB : priceB - priceA;
    });
  }, [santas, searchTerm, cityFilter, sortOrder]);

  const hasActiveFilters = searchTerm.trim() !== "" || cityFilter !== "all";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />
      <Header />

      <main className="relative z-20">
        {/* Hero / search section */}
        <section className="pt-10 md:pt-16 pb-8 md:pb-12 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-serif text-3xl md:text-4xl text-snow text-center mb-3">
                Hitta din <span className="text-gradient-gold">tomte</span>
              </h1>
              <p className="text-snow/80 text-center text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
                Alla tomtar är BankID-verifierade och granskade av oss.
                Bokningen öppnar i november – men du kan redan nu lära känna tomtarna.
              </p>

              {/* Filter bar */}
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-soft">
                <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                  {/* Free-text search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Sök</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Namn eller stad"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12 bg-background"
                      />
                    </div>
                  </div>

                  {/* City filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Stad/område</label>
                    <Select value={cityFilter} onValueChange={setCityFilter}>
                      <SelectTrigger className="h-12 bg-background">
                        <SelectValue placeholder="Alla städer" />
                      </SelectTrigger>
                      <SelectContent className="bg-card z-50">
                        <SelectItem value="all">Alla städer</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Sortera</label>
                    <Select
                      value={sortOrder}
                      onValueChange={(v) => setSortOrder(v as SortOrder)}
                    >
                      <SelectTrigger className="h-12 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card z-50">
                        <SelectItem value="price_asc">
                          <span className="flex items-center gap-2">
                            <ArrowDownNarrowWide className="w-4 h-4" />
                            Pris: lägst först
                          </span>
                        </SelectItem>
                        <SelectItem value="price_desc">
                          <span className="flex items-center gap-2">
                            <ArrowUpNarrowWide className="w-4 h-4" />
                            Pris: högst först
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <SkeletonList count={8} variant="santa" />
            ) : error ? (
              /* Error state with retry */
              <div className="max-w-md mx-auto text-center py-12 md:py-20">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-3">
                  Något gick fel
                </h2>
                <p className="text-muted-foreground mb-6">
                  Vi kunde inte hämta tomtarna just nu. Kontrollera din anslutning och försök igen.
                </p>
                <Button variant="outline" onClick={fetchSantas}>
                  <RefreshCw className="w-4 h-4" />
                  Försök igen
                </Button>
              </div>
            ) : santas.length === 0 ? (
              /* Empty state – no approved santas yet */
              <div className="max-w-2xl mx-auto text-center py-12 md:py-20">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-10 h-10 text-accent" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Våra första tomtar granskas just nu
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                  Vi verifierar varje tomte med BankID och granskar alla profiler
                  personligen innan de publiceras här. De första tomtarna dyker upp
                  inom kort – och bokningen öppnar i november, lagom till julen 2026.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/bli-tomte">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">
                      <Gift className="w-5 h-5" />
                      Bli tomte
                    </Button>
                  </Link>
                  <Link to="/intresse-familj">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Users className="w-5 h-5" />
                      Anmäl intresse som familj
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Result count */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h2 className="font-serif text-xl md:text-2xl text-foreground">
                    {filteredSantas.length === 1
                      ? "1 tomte"
                      : `${filteredSantas.length} tomtar`}
                    {cityFilter !== "all" ? ` i ${cityFilter}` : ""}
                  </h2>
                </div>

                {filteredSantas.length === 0 ? (
                  /* No matches for the current filters */
                  <div className="max-w-md mx-auto text-center py-10 md:py-16">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3">
                      Inga tomtar matchar din sökning
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Prova ett annat namn eller en annan stad – nya tomtar
                      tillkommer hela tiden.
                    </p>
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("");
                          setCityFilter("all");
                        }}
                      >
                        Rensa filter
                      </Button>
                    )}
                  </div>
                ) : (
                  /* Santa card grid */
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {filteredSantas.map((santa) => (
                      <Link
                        key={santa.id}
                        to={`/tomte/${santa.id}`}
                        className="group bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
                      >
                        {/* Image */}
                        <div className="relative h-40 md:h-56 overflow-hidden bg-muted">
                          <SantaCardImage santa={santa} />
                          {santa.bankid_verified && (
                            <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-primary text-primary-foreground px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 shadow-md">
                              <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" />
                              <span>BankID-verifierad</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-3 md:p-5">
                          <h3 className="font-serif text-base md:text-xl text-foreground truncate mb-1 md:mb-2">
                            Tomten {santa.display_name || "utan namn"}
                          </h3>

                          {santa.city && (
                            <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">
                              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                              <span className="truncate">{santa.city}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-border/50">
                            {santa.price_per_quarter != null ? (
                              <div>
                                <span className="text-muted-foreground text-xs md:text-sm">från </span>
                                <span className="font-serif text-base md:text-xl text-foreground">
                                  {santa.price_per_quarter} kr
                                </span>
                                <span className="text-muted-foreground text-xs md:text-sm"> / 15 min</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-xs md:text-sm">
                                Pris ej angivet
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchSantas;
