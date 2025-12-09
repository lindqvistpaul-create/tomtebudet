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
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/20 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Back link */}
            <Link 
              to="/sok" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Tillbaka till sökning
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-accent shadow-2xl">
                  <img
                    src={santa.image}
                    alt={santa.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {santa.verified && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                    <BadgeCheck className="w-4 h-4" />
                    Verifierad tomte
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                  {santa.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(santa.rating) ? 'text-accent fill-accent' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <span className="font-serif text-xl text-foreground">{santa.rating}</span>
                  <span className="text-muted-foreground">({santa.reviews} omdömen)</span>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Verksam i {santa.location} med omnejd</span>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border/50">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">BankID-verifierad</span>
                  </div>
                  <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border/50">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Granskad av teamet</span>
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

        {/* Mobile CTA - Sticky */}
        <div className="lg:hidden sticky top-16 z-40 bg-card border-b border-border/50 shadow-md px-4 py-3">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div>
              <span className="font-serif text-xl text-foreground">{santa.pricePerQuarter} kr</span>
              <span className="text-muted-foreground text-sm"> / 15 min</span>
            </div>
            <Link to={`/boka/${santa.id}`}>
              <Button variant="hero" size="lg">
                🎅 Boka tomte
              </Button>
            </Link>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Photos Section */}
              <section className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-6">Bilder</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                    <img
                      src={santa.image}
                      alt={`${santa.name} i tomtedräkt`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-lg text-sm font-medium">
                      I tomtedräkt
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                    <img
                      src={santa.imageWithoutCostume}
                      alt={`${santa.name} utan dräkt`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-card/90 text-foreground px-3 py-1 rounded-lg text-sm font-medium border border-border/50">
                      Utan dräkt
                    </div>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">Om {santa.name}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  {santa.bio}
                </p>
                <div className="flex items-center gap-2 text-accent font-medium">
                  <Clock className="w-5 h-5" />
                  <span>{santa.experience}</span>
                </div>
              </section>

              {/* What's Included Section */}
              <section className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-6">Vad som ingår</h2>
                <ul className="space-y-4">
                  {includedItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-foreground text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Reviews Section */}
              <section className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-foreground">Omdömen från familjer</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <span className="font-serif text-xl text-foreground">{santa.rating}</span>
                    <span className="text-muted-foreground">({santa.reviews})</span>
                  </div>
                </div>
                
                {santa.reviewsList && santa.reviewsList.length > 0 ? (
                  <div className="space-y-6">
                    {santa.reviewsList.map((review) => (
                      <div key={review.id} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-foreground text-lg">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed">"{review.text}"</p>
                        <p className="text-sm text-muted-foreground/70 mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                      <Star className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      Inga omdömen ännu – bli först med att boka denna tomte!
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Desktop: Additional info card */}
                <div className="hidden lg:block bg-card rounded-2xl p-6 shadow-soft border border-border/50">
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

      <Footer />
    </div>
  );
};

export default SantaProfile;