import { useState } from "react";
import { z } from "zod";
import { Mail, Send, CheckCircle2, MessageCircle } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import Starfall from "@/components/Starfall";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Namn är obligatoriskt").max(100, "Namnet får max vara 100 tecken"),
  email: z.string().trim().email("Ange en giltig e-postadress").max(255, "E-postadressen är för lång"),
  subject: z.string().min(1, "Välj en ärendetyp"),
  message: z.string().trim().min(1, "Meddelande är obligatoriskt").max(2000, "Meddelandet får max vara 2000 tecken")
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const subjectOptions = [
  { value: "booking", label: "Fråga om bokning" },
  { value: "technical", label: "Teknisk fråga" },
  { value: "santa", label: "Fråga om att bli tomte" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Övrigt" }
];

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (field: keyof ContactFormData, value: string) => {
    try {
      contactSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: err.errors[0].message }));
      }
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const subjectLabel =
        subjectOptions.find((o) => o.value === result.data.subject)?.label ??
        result.data.subject;

      const { error } = await supabase.from('contact_messages').insert({
        name: result.data.name,
        email: result.data.email,
        subject: subjectLabel,
        message: result.data.message,
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrors({ message: "Något gick fel. Försök igen senare." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Starfall />
      <SimpleHeader />
      
      <main className="pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Vi finns här för dig</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Kontakta <span className="text-gradient-gold">Tomtebudet</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Har du frågor om en bokning, funderingar kring trygghet eller vill komma i kontakt med oss? 
              Fyll i formuläret så återkommer vi så snart vi kan.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              {isSubmitted ? (
                <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">
                    Tack för ditt meddelande!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Vi har tagit emot ditt meddelande och hör av oss så snart vi kan. 
                    Vanligtvis svarar vi inom 24 timmar.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Skicka ett nytt meddelande
                  </Button>
                </div>
              ) : (
                <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-xl text-foreground">Skicka ett meddelande</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Ditt namn <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Anna Andersson"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={`bg-muted/50 ${errors.name ? "border-destructive" : ""}`}
                        maxLength={100}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        E-postadress <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="anna@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={`bg-muted/50 ${errors.email ? "border-destructive" : ""}`}
                        maxLength={255}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Ärendetyp <span className="text-destructive">*</span>
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => handleChange("subject", value)}
                      >
                        <SelectTrigger 
                          id="subject"
                          className={`bg-muted/50 ${errors.subject ? "border-destructive" : ""}`}
                        >
                          <SelectValue placeholder="Välj ärendetyp" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {subjectOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-sm text-destructive mt-1">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Ditt meddelande <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Beskriv ditt ärende här..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                        className={`bg-muted/50 min-h-[150px] ${errors.message ? "border-destructive" : ""}`}
                        maxLength={2000}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message ? (
                          <p className="text-sm text-destructive">{errors.message}</p>
                        ) : (
                          <span />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formData.message.length}/2000
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Skickar..."
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Skicka meddelande
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="text-sm text-muted-foreground text-center">
                      Vi svarar vanligtvis inom 24 timmar. För akuta ärenden, 
                      maila oss på{" "}
                      <a href="mailto:hej@tomtebudet.se" className="text-accent hover:underline">
                        hej@tomtebudet.se
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">E-post</h3>
                <a href="mailto:hej@tomtebudet.se" className="text-accent hover:underline">
                  hej@tomtebudet.se
                </a>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">Vanliga frågor</h3>
                <a href="/sa-funkar-det#faq" className="text-accent hover:underline">
                  Läs våra FAQ →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
