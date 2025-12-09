import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Home, Sparkles } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import AnimatedCheckmark from "@/components/AnimatedCheckmark";

const BookingConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft text-center">
            {/* Success Icon with Animation */}
            <div className="flex justify-center mb-6">
              <AnimatedCheckmark size="md" />
            </div>

            {/* Heading */}
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Bokningen är <span className="text-gradient-gold">bekräftad!</span>
            </h1>

            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Tack för din bokning! En magisk julupplevelse väntar er familj.
            </p>

            {/* Sparkles decoration */}
            <div className="flex justify-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-accent" />
              <Sparkles className="w-6 h-6 text-accent" />
              <Sparkles className="w-5 h-5 text-accent" />
            </div>

            {/* Booking Details */}
            <div className="bg-muted/30 rounded-2xl p-6 mb-8 text-left">
              <h2 className="font-serif text-xl text-foreground mb-4">Bokningsdetaljer</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">24 december 2024 kl 15:00</p>
                    <p className="text-sm text-muted-foreground">30 minuters besök</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                      alt="Tomte"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Tomte Erik</p>
                    <p className="text-sm text-muted-foreground">Verifierad tomte</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 text-left">
              <h2 className="font-serif text-xl text-foreground mb-4">Vad händer nu?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Tomten kontaktas.</span> Vi meddelar Tomte Erik om din bokning.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Bekräftelse via e-post.</span> Du får all information skickad till din e-post.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Chatten öppnas.</span> Du kan kommunicera direkt med tomten via chatten.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mina-bokningar">
                <Button variant="hero" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Visa min bokning
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="w-5 h-5" />
                  Tillbaka till startsidan
                </Button>
              </Link>
            </div>

            {/* Warm message */}
            <p className="text-sm text-muted-foreground mt-8">
              ✨ Vi önskar er en riktigt magisk julafton!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;
