import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MessageForm = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    recipientEmail: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🎄 Hälsningen är på väg!",
      description: `Din julhälsning till ${formData.recipientName} förbereds av tomtarna.`,
    });
    setFormData({ senderName: "", recipientName: "", recipientEmail: "", message: "" });
  };

  return (
    <section id="message-form" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-20 left-10 text-accent/20 animate-twinkle">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 right-10 text-accent/30 animate-twinkle" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Skicka din hälsning</span>
            <h2 className="font-serif text-4xl md:text-5xl text-snow mt-3 mb-4">
              Skriv till <span className="text-gradient-gold">Tomten</span>
            </h2>
            <p className="text-snow/70 text-lg">
              Fyll i formuläret så tar tomtens älvor hand om resten
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft">
            <div className="space-y-6">
              {/* Sender name */}
              <div className="space-y-2">
                <Label htmlFor="senderName" className="text-foreground font-medium">
                  Ditt namn
                </Label>
                <Input
                  id="senderName"
                  placeholder="Vem skickar hälsningen?"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Recipient name */}
              <div className="space-y-2">
                <Label htmlFor="recipientName" className="text-foreground font-medium">
                  Mottagarens namn
                </Label>
                <Input
                  id="recipientName"
                  placeholder="Vem ska få hälsningen?"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Recipient email */}
              <div className="space-y-2">
                <Label htmlFor="recipientEmail" className="text-foreground font-medium">
                  Mottagarens e-post
                </Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  placeholder="tomte@nordpolen.se"
                  value={formData.recipientEmail}
                  onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">
                  Din julhälsning
                </Label>
                <Textarea
                  id="message"
                  placeholder="Skriv ett personligt meddelande fyllt med julkärlek..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[150px] bg-background border-border/50 focus:border-primary resize-none"
                  required
                />
              </div>

              {/* Submit button */}
              <Button type="submit" variant="festive" size="xl" className="w-full">
                <Send className="w-5 h-5" />
                Skicka hälsning till Tomten
              </Button>

              <p className="text-center text-muted-foreground text-sm">
                ✨ Din hälsning levereras av tomtens snabbaste renar
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MessageForm;
