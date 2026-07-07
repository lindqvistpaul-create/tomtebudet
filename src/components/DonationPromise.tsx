import { Gift, Heart, Sparkles } from "lucide-react";

// Donation promise: every booking helps a child who would otherwise
// go without a Christmas present. Partner organisation announced in autumn.
const DonationPromise = () => {
  return (
    <section id="donation" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8 md:mb-12">
            <span className="text-accent font-medium text-xs md:text-sm uppercase tracking-wider">
              Ett besök som ger mer
            </span>
            <h2 className="font-serif text-2xl md:text-5xl text-foreground mt-2 md:mt-3 mb-3 md:mb-4">
              Varje bokning ger en julklapp <span className="text-primary">till ett barn som annars blir utan</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
              Alla barn får inte julklappar. För varje tomtebesök som bokas
              donerar Tomtebudet en del av intäkten till barn i Sverige som
              lever i ekonomisk utsatthet.
            </p>
          </div>

          {/* Three-part promise */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
            <div className="flex flex-col items-center text-center bg-card rounded-lg md:rounded-xl p-5 md:p-8 shadow-soft">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3 md:mb-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <p className="text-foreground font-medium text-sm md:text-base leading-snug">
                Era barn får ett magiskt tomtebesök
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-card rounded-lg md:rounded-xl p-5 md:p-8 shadow-soft">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3 md:mb-4">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <p className="text-foreground font-medium text-sm md:text-base leading-snug">
                Tomten får ett meningsfullt uppdrag på julafton
              </p>
            </div>

            <div className="flex flex-col items-center text-center bg-card rounded-lg md:rounded-xl p-5 md:p-8 shadow-soft">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3 md:mb-4">
                <Gift className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <p className="text-foreground font-medium text-sm md:text-base leading-snug">
                Ett barn i utsatthet får en julklapp
              </p>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-xs md:text-sm mt-6 md:mt-8">
            Donationen görs av Tomtebudet i samarbete med en svensk
            barnorganisation – partnern presenteras under hösten 2026.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationPromise;
