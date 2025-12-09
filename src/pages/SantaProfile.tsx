import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  BadgeCheck, 
  MapPin, 
  Clock, 
  Shield, 
  ChevronLeft, 
  Gift, 
  Heart, 
  MessageCircle,
  Calendar,
  Check
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { mockSantas } from "@/lib/mockData";

const SantaProfile = () => {
  const { id } = useParams();
  const santa = mockSantas.find((s) => s.id === id) || mockSantas[0];

  const includedItems = [
    { icon: Clock, text: "Tomtebesök på 15–30 minuter" },
    { icon: Gift, text: "Utdelning av julklappar" },
    { icon: MessageCircle, text: "Personligt prat med barnen" },
    { icon: Heart, text: "Julstämning och magi" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <SimpleHeader />
      
      <main className="pt-20">
        {/* Hero Section - More compact on mobile */}
        <section className="bg-gradient-to-b from-primary/20 to-background py-8 md:py-16">
          <div className="container mx-auto px-4">
            {/* Back link */}
            <Link 
              to="/sok" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8 min-h-[44px]"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm md:text-base">Tillbaka till sökning</span>
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
              {/* Profile Image - Smaller on mobile */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-accent shadow-2xl">
                  <img
                    src={santa.image}
                    alt={santa.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {santa.verified && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                    <BadgeCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Verifierad
                  </div>
                )}
              </div>

              {/* Profile Info - Tighter spacing on mobile */}
              <div className="text-center md:text-left flex-1">
                <h1 className="font-serif text-2xl md:text-5xl text-foreground mb-2 md:mb-4">
                  {santa.name}
                </h1>
                
                {/* Rating - Compact on mobile */}
                <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-2 md:mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(santa.rating) ? 'text-accent fill-accent' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <span className="font-serif text-lg md:text-xl text-foreground">{santa.rating}</span>
                  <span className="text-muted-foreground text-sm">({santa.reviews} omdömen)</span>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4 md:mb-6">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-lg">{santa.location}</span>
                </div>

                {/* Trust badges - Horizontal scroll on mobile */}
                <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                  <div className="flex items-center gap-1.5 md:gap-2 bg-card px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border/50 flex-shrink-0">
                    <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">BankID-verifierad</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 bg-card px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border/50 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">Granskad av teamet</span>
                  </div>
                </div>
              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:block flex-shrink-0">
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 w-80">
                  <div className="text-center mb-4">
                    <span className="font-serif text-3xl text-foreground">{santa.pricePerQuarter} kr</span>
                    <span className="text-muted-foreground"> / 15 min</span>
                  </div>
                  <Link to={`/boka/${santa.id}`}>
                    <Button variant="hero" size="xl" className="w-full">
                      🎅 Boka denna tomte
                    </Button>
                  </Link>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Trygg betalning – reserveras tills besöket är klart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections - Tighter padding on mobile */}
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 md:space-y-8">
              
              {/* Mobile: Available times card */}
              <section className="lg:hidden bg-card rounded-xl p-4 shadow-soft border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-foreground font-medium text-sm">Tillgängliga tider 24 dec</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {santa.availableTimes.map((time) => (
                    <span
                      key={time}
                      className="py-1.5 px-3 rounded-lg bg-accent/10 text-accent text-sm font-medium"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </section>

              {/* Photos Section */}
              <section className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-xl md:text-2xl text-foreground mb-4 md:mb-6">Bilder</h2>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                    <img
                      src={santa.image}
                      alt={`${santa.name} i tomtedräkt`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-primary/90 text-primary-foreground px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                      I tomtedräkt
                    </div>
                  </div>
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                    <img
                      src={santa.imageWithoutCostume}
                      alt={`${santa.name} utan dräkt`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-card/90 text-foreground px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg text-xs md:text-sm font-medium border border-border/50">
                      Utan dräkt
                    </div>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3 md:mb-4">Om {santa.name}</h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-3 md:mb-4">
                  {santa.bio}
                </p>
                <div className="flex items-center gap-2 text-accent font-medium text-sm md:text-base">
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{santa.experience}</span>
                </div>
              </section>

              {/* What's Included Section */}
              <section className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-xl md:text-2xl text-foreground mb-4 md:mb-6">Vad som ingår</h2>
                <ul className="space-y-3 md:space-y-4">
                  {includedItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 md:gap-4">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                      </div>
                      <span className="text-foreground text-sm md:text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Reviews Section */}
              <section className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-soft border border-border/50">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="font-serif text-xl md:text-2xl text-foreground">Omdömen</h2>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-accent fill-accent" />
                    <span className="font-serif text-lg md:text-xl text-foreground">{santa.rating}</span>
                    <span className="text-muted-foreground text-xs md:text-base">({santa.reviews})</span>
                  </div>
                </div>
                
                {santa.reviewsList && santa.reviewsList.length > 0 ? (
                  <div className="space-y-4 md:space-y-6">
                    {santa.reviewsList.map((review) => (
                      <div key={review.id} className="border-b border-border/50 pb-4 md:pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <span className="font-semibold text-foreground text-sm md:text-lg">{review.author}</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-3 h-3 md:w-4 md:h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">"{review.text}"</p>
                        <p className="text-xs md:text-sm text-muted-foreground/70 mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 md:py-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                      <Star className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                    </div>
                    <p className="text-muted-foreground text-sm md:text-lg">
                      Inga omdömen ännu – bli först med att boka!
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Desktop: Additional info card */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                  <h3 className="font-serif text-xl text-foreground mb-4">Priser & tillgänglighet</h3>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Pris per 15 min</span>
                    <span className="font-serif text-xl text-foreground">{santa.pricePerQuarter} kr</span>
                  </div>
                  
                  {/* Available Times */}
                  <div className="py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-foreground font-medium">Tillgängliga tider 24 dec</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {santa.availableTimes.map((time) => (
                        <span
                          key={time}
                          className="py-1.5 px-3 rounded-lg bg-accent/10 text-accent text-sm font-medium"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trust info */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-foreground mb-2">Trygg bokning</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>BankID-verifierad identitet</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Manuellt granskad av teamet</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Betalning hålls säkert tills besöket är klart</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky CTA - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-3 safe-area-pb">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-serif text-xl text-foreground">{santa.pricePerQuarter} kr</span>
            <span className="text-muted-foreground text-xs">per 15 min</span>
          </div>
          <Link to={`/boka/${santa.id}`} className="flex-1 max-w-[200px]">
            <Button variant="hero" size="lg" className="w-full h-12 text-base">
              🎅 Boka nu
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SantaProfile;
