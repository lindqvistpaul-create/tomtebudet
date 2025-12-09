import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, BadgeCheck, MapPin, Clock, Shield, ChevronLeft } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { mockSantas } from "@/lib/mockData";

const SantaProfile = () => {
  const { id } = useParams();
  const santa = mockSantas.find((s) => s.id === id) || mockSantas[0];

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link 
            to="/sok" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Tillbaka till sökning
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Photos & Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Photo Gallery */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-muted">
                  <img
                    src={santa.image}
                    alt={`${santa.name} i tomtedräkt`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-lg text-sm font-medium">
                    I tomtedräkt
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-muted">
                  <img
                    src={santa.imageWithoutCostume}
                    alt={`${santa.name} utan dräkt`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-card/90 text-foreground px-3 py-1 rounded-lg text-sm font-medium">
                    Utan dräkt
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-serif text-2xl text-foreground mb-4">Om {santa.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {santa.bio}
                </p>
                <div className="flex items-center gap-2 text-accent font-medium">
                  <Clock className="w-4 h-4" />
                  {santa.experience}
                </div>
              </div>

              {/* Verification */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-serif text-2xl text-foreground mb-4">Verifiering</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">BankID-verifierad</p>
                      <p className="text-sm text-muted-foreground">Identitet bekräftad</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Manuellt granskad</p>
                      <p className="text-sm text-muted-foreground">Godkänd av Tomtebudet-teamet</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-foreground">Omdömen</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <span className="font-serif text-xl text-foreground">{santa.rating}</span>
                    <span className="text-muted-foreground">({santa.reviews} omdömen)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {santa.reviewsList.map((review) => (
                    <div key={review.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{review.author}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-serif text-3xl text-foreground">{santa.pricePerQuarter} kr</span>
                    <span className="text-muted-foreground"> / 15 min</span>
                  </div>
                  {santa.verified && (
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      <BadgeCheck className="w-4 h-4" />
                      Verifierad
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  {santa.location} • {santa.distance}
                </div>

                {/* Available Times */}
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">Tillgängliga tider 24 dec</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {santa.availableTimes.map((time) => (
                      <div
                        key={time}
                        className="py-2 px-3 rounded-lg border border-border text-center text-sm text-foreground hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={`/boka/${santa.id}`}>
                  <Button variant="hero" size="xl" className="w-full">
                    🎅 Boka {santa.name}
                  </Button>
                </Link>

                <div className="mt-4 p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Trygg betalning</p>
                      <p className="text-xs text-muted-foreground">
                        Betalningen reserveras och frisläpps först efter genomfört besök
                      </p>
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
