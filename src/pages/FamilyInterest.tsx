import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const formSchema = z.object({
  email: z.string().trim().email({ message: "Ange en giltig e-postadress" }),
  name: z.string().trim().min(1, { message: "Namn är obligatoriskt" }).max(100),
  location: z.string().trim().max(100).optional(),
  children_info: z.string().trim().max(500).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Du måste godkänna för att fortsätta",
  }),
});

type FormData = z.infer<typeof formSchema>;

const FamilyInterest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      location: "",
      children_info: "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("family_interest").insert({
        email: data.email,
        name: data.name || null,
        location: data.location || null,
        children_info: data.children_info || null,
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting interest:", error);
      toast.error("Något gick fel när vi skulle spara din intresseanmälan. Prova gärna igen om en stund.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="py-6 px-4 border-b border-snow/10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <Logo variant="horizontal" size="md" textColor="light" iconColor="gold" />
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm" className="border-snow/30 text-snow hover:bg-snow/10">
              Tillbaka till startsidan
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-xl mx-auto">
          {/* Hero text */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Inför julen 2026</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-snow mb-4">
              Anmäl intresse som familj
            </h1>
            <p className="text-snow/70 text-lg">
              Tomtebudet lanseras som bokningsplattform inför julen 2026. 
              Skriv upp dig här så hör vi av oss när bokningen öppnar!
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-snow/5 border-snow/10 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="font-serif text-2xl text-snow mb-3">
                    Tack för ditt intresse!
                  </h2>
                  <p className="text-snow/70 mb-6">
                    Du står nu på intresselistan. Vi hör av oss när bokningen öppnar inför julen 2026.
                  </p>
                  <Link to="/">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Tillbaka till startsidan
                    </Button>
                  </Link>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-snow">E-postadress *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="din@email.se"
                              type="email"
                              className="bg-snow/10 border-snow/20 text-snow placeholder:text-snow/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-snow">Ditt namn *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Förnamn Efternamn"
                              className="bg-snow/10 border-snow/20 text-snow placeholder:text-snow/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-snow">Postort/område</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="T.ex. Sundbyberg, Stockholm"
                              className="bg-snow/10 border-snow/20 text-snow placeholder:text-snow/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="children_info"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-snow">Berätta kort om er familj (valfritt)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Hur många barn har ni? Hur gamla är de?"
                              className="bg-snow/10 border-snow/20 text-snow placeholder:text-snow/40 min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-snow/40 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-snow/80 text-sm font-normal cursor-pointer">
                              Jag vill få e-post när Tomtebudet öppnar bokningen inför julen 2026. *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg"
                    >
                      {submitting ? "Skickar..." : "Anmäl intresse"}
                    </Button>

                    <p className="text-snow/50 text-xs text-center">
                      Vi delar aldrig din e-postadress med tredje part.{" "}
                      <Link to="/integritet-sakerhet" className="underline hover:text-snow/70">
                        Läs vår integritetspolicy
                      </Link>
                    </p>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FamilyInterest;
