import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, MessageCircle, Edit2, CheckCircle, XCircle, Send } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { mockBookings } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const statusConfig = {
  upcoming: {
    label: "Kommande",
    color: "bg-accent/10 text-accent",
    icon: Calendar,
  },
  completed: {
    label: "Genomförd",
    color: "bg-primary/10 text-primary",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Avbokad",
    color: "bg-destructive/10 text-destructive",
    icon: XCircle,
  },
};

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
  const [chatMessage, setChatMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(mockBookings[0]?.id || null);

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === "upcoming") return booking.status === "upcoming";
    return booking.status === "completed" || booking.status === "cancelled";
  });

  const currentBooking = mockBookings.find((b) => b.id === selectedBooking);

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            Mina <span className="text-gradient-gold">bokningar</span>
          </h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={activeTab === "upcoming" ? "default" : "outline"}
              onClick={() => setActiveTab("upcoming")}
            >
              Kommande
            </Button>
            <Button
              variant={activeTab === "completed" ? "default" : "outline"}
              onClick={() => setActiveTab("completed")}
            >
              Tidigare
            </Button>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 text-center shadow-soft">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-foreground mb-2">Inga bokningar</h2>
              <p className="text-muted-foreground mb-6">
                {activeTab === "upcoming" 
                  ? "Du har inga kommande bokningar ännu."
                  : "Du har inga tidigare bokningar."}
              </p>
              <Link to="/sok">
                <Button variant="hero">
                  Boka en tomte
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Bookings List */}
              <div className="lg:col-span-1 space-y-4">
                {filteredBookings.map((booking) => {
                  const status = statusConfig[booking.status];
                  return (
                    <button
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking.id)}
                      className={cn(
                        "w-full bg-card rounded-2xl p-5 shadow-soft text-left transition-all hover:shadow-lg",
                        selectedBooking === booking.id && "ring-2 ring-primary"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={booking.santaImage}
                          alt={booking.santaName}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-serif text-lg text-foreground truncate">
                              {booking.santaName}
                            </h3>
                            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", status.color)}>
                              {status.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{booking.date}</span>
                            <span className="mx-1">•</span>
                            <Clock className="w-3.5 h-3.5" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Booking Details */}
              {currentBooking && (
                <div className="lg:col-span-2 space-y-6">
                  {/* Main Details Card */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={currentBooking.santaImage}
                          alt={currentBooking.santaName}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <h2 className="font-serif text-2xl text-foreground">
                            {currentBooking.santaName}
                          </h2>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            statusConfig[currentBooking.status].color
                          )}>
                            {statusConfig[currentBooking.status].label}
                          </span>
                        </div>
                      </div>
                      {currentBooking.status === "upcoming" && (
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4" />
                          Ändra
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-foreground mb-2">Datum & tid</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{currentBooking.date} kl {currentBooking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Clock className="w-4 h-4" />
                            <span>{currentBooking.duration} minuters besök</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-foreground mb-2">Adress</h3>
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 mt-0.5" />
                            <span>{currentBooking.address}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-foreground mb-2">Barn</h3>
                        <div className="space-y-2">
                          {currentBooking.children.map((child, i) => (
                            <div key={i} className="p-3 bg-muted/30 rounded-lg">
                              <p className="font-medium text-foreground">
                                {child.name}, {child.age}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Presenter: {child.gifts}
                              </p>
                              {child.specialInfo && (
                                <p className="text-sm text-muted-foreground">
                                  Info: {child.specialInfo}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                      <span className="text-muted-foreground">Totalt belopp</span>
                      <span className="font-serif text-2xl text-foreground">{currentBooking.totalPrice} kr</span>
                    </div>
                  </div>

                  {/* Chat Card */}
                  {currentBooking.status === "upcoming" && (
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <h3 className="font-serif text-xl text-foreground">Chatta med tomten</h3>
                      </div>

                      <div className="bg-muted/30 rounded-xl p-4 h-48 mb-4 overflow-y-auto">
                        <p className="text-center text-muted-foreground text-sm">
                          Inga meddelanden ännu. Skriv till tomten om du har frågor!
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Skriv ett meddelande..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          className="bg-background resize-none"
                          rows={2}
                        />
                        <Button variant="hero" size="icon" className="h-auto">
                          <Send className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
