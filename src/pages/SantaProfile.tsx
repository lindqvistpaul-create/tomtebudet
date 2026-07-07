import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import {
  ChevronLeft,
  MapPin,
  Shield,
  CheckCircle,
  Gift,
  Calendar,
  CalendarClock,
  Clock,
  Sparkles,
  Lock,
  Heart,
  Search,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Snowfall from "@/components/Snowfall";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { resolvePublicPhotoUrl } from "@/lib/santaPhotos";
import type { Database } from "@/integrations/supabase/types";

type PublicSanta = Database["public"]["Views"]["public_santas"]["Row"];

type PhotoView = "costume" | "portrait";

const trustItems = [
  {
    icon: Shield,
    title: "BankID-verifierad",
    text: "Varje tomte har bekräftat sin identitet med BankID.",
  },
  {
    icon: CheckCircle,
    title: "Personligt granskad",
    text: "Vi granskar varje profil manuellt innan den publiceras.",
  },
  {
    icon: Lock,
    title: "Säker betalning",
    text: "Betalningen hålls säkert tills besöket är genomfört.",
  },
  {
    icon: Heart,
    title: "Nöjdhetsgaranti",
    text: "100% nöjdhetsgaranti – julen ska bli magisk.",
  },
];

const ProfileSkeleton = () => (
  <div className="container mx-auto px-4 pt-8 md:pt-12 pb-16 animate-pulse">
    <div className="h-5 bg-muted rounded w-32 mb-8" />
    <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-[4/5] bg-muted rounded-2xl" />
          <div className="space-y-4 py-2">
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-5 bg-muted rounded w-1/3" />
            <div className="flex gap-2">
              <div className="h-8 bg-muted rounded-full w-36" />
              <div className="h-8 bg-muted rounded-full w-44" />
            </div>
          </div>
        </div>
        <div className="h-40 bg-muted rounded-2xl" />
        <div className="h-28 bg-muted rounded-2xl" />
      </div>
      <div className="hidden lg:block">
        <div className="h-64 bg-muted rounded-2xl" />
      </div>
    </div>
  </div>
);

const SantaProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [santa, setSanta] = useState<PublicSanta | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [photoView, setPhotoView] = useState<PhotoView>("costume");
  const [brokenPhotos, setBrokenPhotos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    const fetchSanta = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setLoading(true);
      setNotFound(false);
      try {
        const { data, error } = await supabase
          .from("public_santas")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (cancelled) return;
        if (error || !data) {
          setNotFound(true);
        } else {
          setSanta(data);
        }
      } catch (err) {
        console.error("Error fetching santa profile:", err);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSanta();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Resolve photo URLs (public bucket paths or legacy full URLs)
  const costumeUrl = useMemo(
    () => resolvePublicPhotoUrl(santa?.costume_photo_url),
    [santa?.costume_photo_url]
  );
  const portraitUrl = useMemo(
    () => resolvePublicPhotoUrl(santa?.portrait_photo_url),
    [santa?.portrait_photo_url]
  );

  const costumeAvailable = !!costumeUrl && !brokenPhotos[costumeUrl];
  const portraitAvailable = !!portraitUrl && !brokenPhotos[portraitUrl];
  const showToggle = costumeAvailable && portraitAvailable;

  // Pick a sensible default/fallback view when photos load or break
  useEffect(() => {
    if (photoView === "costume" && !costumeAvailable && portraitAvailable) {
      setPhotoView("portrait");
    } else if (photoView === "portrait" && !portraitAvailable && costumeAvailable) {
      setPhotoView("costume");
    }
  }, [photoView, costumeAvailable, portraitAvailable]);

  const activePhotoUrl =
    photoView === "costume"
      ? costumeAvailable
        ? costumeUrl
        : portraitAvailable
          ? portraitUrl
          : null
      : portraitAvailable
        ? portraitUrl
        : costumeAvailable
          ? costumeUrl
          : null;

  // Document title
  useEffect(() => {
    if (santa) {
      const name = santa.display_name || "vår tomte";
      document.title = santa.city
        ? `Tomten ${name} i ${santa.city} – Tomtebudet`
        : `Tomten ${name} – Tomtebudet`;
    } else if (notFound) {
      document.title = "Tomten hittades inte – Tomtebudet";
    }
    return () => {
      document.title = "Tomtebudet";
    };
  }, [santa, notFound]);

  const santaSince = useMemo(() => {
    if (!santa?.reviewed_at) return null;
    const date = new Date(santa.reviewed_at);
    if (Number.isNaN(date.getTime())) return null;
    return format(date, "MMMM yyyy", { locale: sv });
  }, [santa?.reviewed_at]);

  const displayName = santa?.display_name || "utan namn";
  const sortedTimes = useMemo(
    () => [...(santa?.available_times ?? [])].sort((a, b) => a.localeCompare(b, "sv")),
    [santa?.available_times]
  );

  // ---------- 404 state ----------
  if (!loading && (notFound || !santa)) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Snowfall />
        <Header />
        <main className="relative z-20">
          <div className="container mx-auto px-4 py-16 md:py-28">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                Vi hittar inte den här tomten
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Tomten kan ha tagit bort sin profil eller så är länken felaktig.
                Det finns fler tomtar att upptäcka!
              </p>
              <Link to="/sok">
                <Button variant="hero" size="lg">
                  <Gift className="w-5 h-5" />
                  Se alla tomtar
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-32 lg:pb-0">
      <Snowfall />
      <Header />

      <main className="relative z-20">
        {loading || !santa ? (
          <ProfileSkeleton />
        ) : (
          <>
            <div className="container mx-auto px-4 pt-6 md:pt-10 pb-12 md:pb-16">
              {/* Back link */}
              <Link
                to="/sok"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8 min-h-[44px]"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm md:text-base">Alla tomtar</span>
              </Link>

              <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
                {/* ---------- Main column ---------- */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                  {/* Hero: photo + identity */}
                  <section className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
                    {/* Photo area */}
                    <div>
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted shadow-soft border border-border/50">
                        {activePhotoUrl ? (
                          <img
                            key={activePhotoUrl}
                            src={activePhotoUrl}
                            alt={
                              photoView === "costume"
                                ? `Tomten ${displayName} i tomtedräkt`
                                : `Tomten ${displayName} utan dräkt`
                            }
                            className="w-full h-full object-cover"
                            onError={() =>
                              setBrokenPhotos((prev) => ({
                                ...prev,
                                [activePhotoUrl]: true,
                              }))
                            }
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-primary/10 gap-3">
                            <Gift className="w-16 h-16 text-primary/40" />
                            <span className="text-muted-foreground text-sm">
                              Foto kommer snart
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Med dräkt / utan dräkt toggle */}
                      {showToggle && (
                        <div className="mt-3 inline-flex w-full rounded-xl bg-muted p-1" role="group" aria-label="Välj bild">
                          <button
                            type="button"
                            onClick={() => setPhotoView("costume")}
                            aria-pressed={photoView === "costume"}
                            className={cn(
                              "flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all",
                              photoView === "costume"
                                ? "bg-card text-foreground shadow-soft"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Med dräkt
                          </button>
                          <button
                            type="button"
                            onClick={() => setPhotoView("portrait")}
                            aria-pressed={photoView === "portrait"}
                            className={cn(
                              "flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all",
                              photoView === "portrait"
                                ? "bg-card text-foreground shadow-soft"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Utan dräkt
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Identity */}
                    <div className="md:py-2">
                      <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
                        Tomten {displayName}
                      </h1>

                      {santa.city && (
                        <div className="flex items-center gap-2 text-muted-foreground mb-5">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          <span className="text-base md:text-lg">{santa.city}</span>
                        </div>
                      )}

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {santa.bankid_verified && (
                          <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
                            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                              BankID-verifierad
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                            Granskad av Tomtebudet
                          </span>
                        </div>
                        {santaSince && (
                          <div className="flex items-center gap-1.5 bg-accent/10 text-accent-foreground px-3 py-1.5 rounded-full border border-accent/30">
                            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                            <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                              Tomte sedan {santaSince}
                            </span>
                          </div>
                        )}
                      </div>

                      {santa.price_per_quarter != null && (
                        <p className="text-muted-foreground text-sm md:text-base">
                          <span className="font-serif text-2xl md:text-3xl text-foreground">
                            {santa.price_per_quarter} kr
                          </span>{" "}
                          / 15 min
                        </p>
                      )}
                    </div>
                  </section>

                  {/* Om mig */}
                  {santa.bio?.trim() && (
                    <section className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-soft border border-border/50">
                      <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3 md:mb-4">
                        Om mig
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-base md:text-lg whitespace-pre-line">
                        {santa.bio}
                      </p>
                    </section>
                  )}

                  {/* Erfarenhet */}
                  {santa.experience?.trim() && (
                    <section className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-soft border border-border/50">
                      <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3 md:mb-4">
                        Erfarenhet
                      </h2>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg whitespace-pre-line pt-1.5">
                          {santa.experience}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Tillgängliga tider */}
                  {sortedTimes.length > 0 && (
                    <section className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-soft border border-border/50">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-accent" />
                        <h2 className="font-serif text-xl md:text-2xl text-foreground">
                          Tillgängliga tider på julafton
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sortedTimes.map((time) => (
                          <span
                            key={time}
                            className="py-1.5 px-4 rounded-lg bg-accent/10 text-accent text-sm md:text-base font-medium"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Tiderna gäller julafton den 24 december 2026.
                      </p>
                    </section>
                  )}
                </div>

                {/* ---------- Sticky booking card (desktop) ---------- */}
                <div className="hidden lg:block">
                  <div className="sticky top-28">
                    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                      {santa.price_per_quarter != null ? (
                        <div className="text-center mb-4">
                          <span className="font-serif text-3xl text-foreground">
                            {santa.price_per_quarter} kr
                          </span>
                          <span className="text-muted-foreground"> / 15 min</span>
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground mb-4">
                          Pris ej angivet ännu
                        </p>
                      )}

                      <div className="flex items-center justify-center gap-2 bg-accent/10 text-accent-foreground rounded-lg py-2.5 px-3 mb-4 border border-accent/30">
                        <CalendarClock className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium">
                          Bokningen öppnar i november
                        </span>
                      </div>

                      <Link to="/intresse-familj">
                        <Button variant="hero" size="xl" className="w-full">
                          Anmäl intresse inför julen 2026
                        </Button>
                      </Link>
                      <p className="text-center text-xs text-muted-foreground mt-3">
                        Vi hör av oss när du kan boka {displayName}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Trust strip ---------- */}
            <section className="py-10 md:py-16 bg-card border-t border-border/50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-10">
                  <span className="text-accent font-medium text-xs md:text-sm uppercase tracking-wider">
                    Trygghet & kvalitet
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mt-2">
                    Därför kan du känna dig trygg
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                  {trustItems.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 bg-background rounded-xl p-4 md:p-5 shadow-soft"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium text-sm md:text-base mb-1">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------- Mobile sticky booking bar ---------- */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 pt-2.5 pb-3 safe-area-pb">
              <div className="flex items-center justify-center gap-1.5 text-accent text-xs font-medium mb-2">
                <CalendarClock className="w-3.5 h-3.5" />
                Bokningen öppnar i november
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  {santa.price_per_quarter != null ? (
                    <>
                      <span className="font-serif text-xl text-foreground">
                        {santa.price_per_quarter} kr
                      </span>
                      <span className="text-muted-foreground text-xs">per 15 min</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Pris ej angivet
                    </span>
                  )}
                </div>
                <Link to="/intresse-familj" className="flex-1 max-w-[230px]">
                  <Button variant="hero" size="lg" className="w-full h-12 text-sm">
                    Anmäl intresse
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SantaProfile;
