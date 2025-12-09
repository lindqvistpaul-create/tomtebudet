/**
 * Tomtebudet Microcopy
 * 
 * Komplett samling av all text i applikationen.
 * Stil: Kort, elegant, trygg och vänlig med julmagisk värme.
 */

// ============================================
// BOKNINGSFLÖDE – STEG
// ============================================

export const bookingFlow = {
  steps: [
    {
      id: 1,
      name: "Välj tid",
      shortName: "Tid",
      description: "När ska magin ske?",
      hint: "Välj datum och tid som passar er familj bäst.",
    },
    {
      id: 2,
      name: "Skapa din bokning",
      shortName: "Bokning",
      description: "Berätta om ert besök",
      hint: "Anpassa besökets längd efter era önskemål.",
    },
    {
      id: 3,
      name: "Familjens detaljer",
      shortName: "Familjen",
      description: "Hjälp tomten att skapa magi",
      hint: "Dela information om barnen så att tomten kan göra besöket extra personligt.",
    },
    {
      id: 4,
      name: "Instruktioner till tomten",
      shortName: "Instruktioner",
      description: "Sista förberedelserna",
      hint: "Berätta hur tomten hittar till er och om det finns något speciellt att tänka på.",
    },
    {
      id: 5,
      name: "Bekräftelse",
      shortName: "Bekräfta",
      description: "Granska era uppgifter",
      hint: "Kontrollera att allt stämmer innan ni går vidare till betalning.",
    },
    {
      id: 6,
      name: "Betalning",
      shortName: "Betala",
      description: "Trygg betalning",
      hint: "Beloppet reserveras och frisläpps till tomten först efter genomfört besök.",
    },
    {
      id: 7,
      name: "Klar – Tomten är på väg",
      shortName: "Klar!",
      description: "Nu börjar nedräkningen!",
      hint: "Er bokning är bekräftad. Vi ser fram emot att skapa ett magiskt ögonblick för er familj.",
    },
  ],
  
  // Navigeringsknappar för varje steg
  navigation: {
    next: "Fortsätt",
    back: "Tillbaka",
    confirm: "Bekräfta bokning",
    pay: "Betala tryggt",
    complete: "Visa min bokning",
  },
  
  // Rubriker för varje steg (längre format)
  titles: {
    selectTime: "Välj tid för ert tomtebesök",
    createBooking: "Anpassa ert magiska ögonblick",
    familyDetails: "Berätta om era barn",
    instructions: "Instruktioner till tomten",
    confirmation: "Bekräfta era uppgifter",
    payment: "Slutför er bokning",
    complete: "Bokningen är bekräftad!",
  },
  
  // Underrubriker för varje steg
  subtitles: {
    selectTime: "Välj en tid som passar er familj på julafton",
    createBooking: "Välj längd och lägg till detaljer för ert besök",
    familyDetails: "Dela information som hjälper tomten att skapa ett personligt besök",
    instructions: "Hjälp tomten att hitta rätt och förbered för ett smidigt besök",
    confirmation: "Granska och bekräfta innan betalning",
    payment: "Trygg betalning – pengarna frisläpps först efter besöket",
    complete: "Tack för ert förtroende! En magisk julupplevelse väntar er familj.",
  },
} as const;

// ============================================
// KNAPPAR
// ============================================

export const buttons = {
  // Primära åtgärder
  bookSanta: "Boka tomte",
  findYourSanta: "Hitta er tomte",
  selectTime: "Välj tid",
  continue: "Fortsätt",
  confirmBooking: "Bekräfta bokning",
  paySecurely: "Betala tryggt",
  completePayment: "Slutför betalning",
  reserve: "Reservera",
  
  // Sekundära åtgärder
  editDetails: "Redigera uppgifter",
  viewProfile: "Visa profil",
  viewBooking: "Visa bokning",
  viewAllBookings: "Visa alla bokningar",
  goBack: "Tillbaka",
  cancel: "Avbryt",
  save: "Spara",
  saveChanges: "Spara ändringar",
  
  // Tomte-specifika
  becomeSanta: "Bli tomte",
  applyNow: "Ansök nu",
  bePartOfMagic: "Bli en del av magin",
  
  // Uppladdning
  uploadPhoto: "Ladda upp foto",
  uploadId: "Ladda upp ID",
  changePhoto: "Byt bild",
  takePhoto: "Ta foto",
  
  // Autentisering
  loginBankId: "Logga in med BankID",
  verifyWithBankId: "Verifiera med BankID",
  signOut: "Logga ut",
  
  // Chat & kommunikation
  sendMessage: "Skicka",
  chatWithSanta: "Chatta med tomten",
  contactSupport: "Kontakta oss",
  
  // Filter & sökning
  search: "Sök",
  filter: "Filtrera",
  showMore: "Visa fler",
  exploreAllSantas: "Utforska alla tomtar",
  
  // Omdömen
  leaveReview: "Lämna omdöme",
  writeReview: "Skriv omdöme",
  
  // Betalning
  withdraw: "Ta ut",
  addPaymentMethod: "Lägg till betalmetod",
  
  // Bokning
  acceptBooking: "Acceptera",
  declineBooking: "Avböj",
  reschedule: "Ändra tid",
  cancelBooking: "Avboka",
} as const;

// ============================================
// FORMULÄRFÄLT & ETIKETTER
// ============================================

export const labels = {
  // Barn
  childName: "Barnets namn",
  childAge: "Ålder",
  childGifts: "Presenter som tomten tar med",
  childSpecialInfo: "Specialinformation",
  addChild: "Lägg till ett barn till",
  
  // Familj
  familyDescription: "Berätta om er familj",
  specialWishes: "Särskilda önskemål",
  
  // Adress
  address: "Adress",
  streetAddress: "Gatuadress",
  postalCode: "Postnummer",
  city: "Stad",
  doorCode: "Portkod",
  deliveryInstructions: "Instruktioner till tomten",
  
  // Bokning
  selectDate: "Välj datum",
  selectTime: "Välj starttid",
  duration: "Varaktighet",
  numberOfChildren: "Antal barn",
  
  // Kontakt
  email: "E-post",
  phone: "Telefon",
  fullName: "Fullständigt namn",
  
  // Tomteprofil
  pricePerQuarter: "Pris per 15 min",
  bio: "Om dig",
  experience: "Erfarenhet",
  maxDistance: "Max avstånd",
  availableTimes: "Tillgängliga tider",
  
  // Betalning
  cardNumber: "Kortnummer",
  cardholderName: "Kortinnehavarens namn",
  expiryDate: "Utgångsdatum",
  cvv: "CVV",
} as const;

// ============================================
// PLACEHOLDERS
// ============================================

export const placeholders = {
  // Barn
  childName: "Barnets namn...",
  childAge: "t.ex. 6 år",
  childGifts: "t.ex. Docka, Lego, Bok...",
  childSpecialInfo: "t.ex. Älskar dinosaurier, är lite blyg till en början...",
  
  // Familj
  familyDescription: "Berätta lite om er familj och era jultraditioner...",
  specialWishes: "Finns det något speciellt ni önskar att tomten gör?",
  
  // Adress
  streetAddress: "Storgatan 15",
  postalCode: "114 55",
  city: "Stockholm",
  doorCode: "1234",
  deliveryInstructions: "t.ex. Ring på dörren, använd bakingången, vänta ute tills barnen är redo...",
  
  // Kontakt
  email: "anna@exempel.se",
  phone: "070-123 45 67",
  fullName: "Anna Andersson",
  
  // Tomteprofil
  bio: "Berätta om dig själv och varför du älskar att vara tomte...",
  experience: "t.ex. 5 års erfarenhet",
  
  // Sökning
  searchLocation: "Sök på plats...",
  searchSanta: "Sök tomte...",
  
  // Chat
  writeMessage: "Skriv ett meddelande...",
  
  // Betalning
  cardNumber: "1234 5678 9012 3456",
  cardholderName: "Anna Andersson",
  expiryDate: "MM/ÅÅ",
  cvv: "123",
} as const;

// ============================================
// FELMEDDELANDEN
// ============================================

export const errors = {
  // Obligatoriska fält
  required: "Fältet är obligatoriskt.",
  requiredField: (field: string) => `${field} är obligatoriskt.`,
  
  // Validering
  invalidEmail: "Ange en giltig e-postadress.",
  invalidPhone: "Ange ett giltigt telefonnummer.",
  invalidPostalCode: "Ange ett giltigt postnummer.",
  tooShort: (field: string, min: number) => `${field} måste vara minst ${min} tecken.`,
  tooLong: (field: string, max: number) => `${field} får vara max ${max} tecken.`,
  
  // Bokning
  selectTime: "Du måste välja en tid.",
  selectDuration: "Du måste välja varaktighet.",
  selectDate: "Du måste välja ett datum.",
  timeUnavailable: "Den valda tiden är inte längre tillgänglig.",
  bookingFailed: "Något gick fel. Försök igen eller kontakta oss.",
  
  // Uppladdning
  idMissing: "ID-handling saknas.",
  photoMissing: "Du måste ladda upp ett foto.",
  costumePhotoMissing: "Foto i tomtedräkt saknas.",
  fileTooLarge: "Filen är för stor. Max 10 MB.",
  invalidFileType: "Ogiltigt filformat. Använd JPG eller PNG.",
  uploadFailed: "Uppladdningen misslyckades. Försök igen.",
  
  // BankID
  bankIdFailed: "BankID-verifiering misslyckades. Försök igen.",
  bankIdCancelled: "BankID-verifiering avbröts.",
  bankIdTimeout: "BankID-sessionen gick ut. Försök igen.",
  bankIdNotFound: "Inget BankID hittades. Kontrollera att du har BankID installerat.",
  
  // Betalning
  paymentFailed: "Betalningen misslyckades. Kontrollera dina kortuppgifter.",
  cardDeclined: "Kortet nekades. Prova ett annat kort.",
  cardExpired: "Kortet har gått ut.",
  invalidCard: "Ogiltiga kortuppgifter.",
  
  // Generella
  somethingWentWrong: "Något gick fel. Försök igen.",
  networkError: "Kunde inte ansluta. Kontrollera din internetanslutning.",
  sessionExpired: "Din session har gått ut. Logga in igen.",
  
  // Chat
  messageFailed: "Meddelandet kunde inte skickas. Försök igen.",
} as const;

// ============================================
// EMPTY STATES
// ============================================

export const emptyStates = {
  // Bokningar
  noBookings: {
    title: "Inga bokningar ännu",
    description: "Du har inte bokat någon tomte än. Börja genom att söka efter tillgängliga tomtar!",
    action: "Boka en tomte",
  },
  noUpcomingBookings: {
    title: "Inga kommande bokningar",
    description: "Du har inga bokningar inplanerade. Dags att boka julmagin?",
    action: "Hitta en tomte",
  },
  noPastBookings: {
    title: "Inga tidigare bokningar",
    description: "Du har inga genomförda bokningar än.",
  },
  
  // Tomtar
  noSantasAvailable: {
    title: "Inga tomtar tillgängliga",
    description: "Inga tomtar tillgängliga just nu – prova att ändra tid eller plats.",
    action: "Ändra sökning",
  },
  noSantasInArea: {
    title: "Inga tomtar i ditt område",
    description: "Vi har tyvärr inga tomtar nära dig just nu. Prova att utöka sökområdet.",
    action: "Utöka område",
  },
  noSearchResults: {
    title: "Inga resultat",
    description: "Din sökning gav inga träffar. Prova att ändra dina filter.",
    action: "Rensa filter",
  },
  
  // Favoriter
  noFavorites: {
    title: "Inga favoriter ännu",
    description: "Spara dina favorittomtar för snabb åtkomst.",
    action: "Utforska tomtar",
  },
  
  // Omdömen
  noReviews: {
    title: "Inga omdömen ännu",
    description: "Denna tomte har inte fått några omdömen än. Bli först med att betygsätta!",
  },
  
  // Meddelanden
  noMessages: {
    title: "Inga meddelanden",
    description: "Inga meddelanden ännu. Skriv till tomten om du har frågor!",
  },
  
  // Tomte-dashboard
  noBookingRequests: {
    title: "Inga bokningsförfrågningar",
    description: "Du har inga nya förfrågningar just nu. Se till att dina tillgängliga tider är uppdaterade!",
    action: "Uppdatera tider",
  },
  noEarnings: {
    title: "Inga intäkter än",
    description: "Dina intäkter visas här efter genomförda bokningar.",
  },
  noNotifications: {
    title: "Inga notiser",
    description: "Du har inga nya notiser.",
  },
} as const;

// ============================================
// TOMTEKORT & PROFIL
// ============================================

export const santaCard = {
  // Badges
  verified: "Verifierad tomte",
  bankIdVerified: "BankID-verifierad",
  manuallyReviewed: "Manuellt granskad",
  topRated: "Toppomdömen",
  popular: "Populär",
  newSanta: "Ny tomte",
  
  // Pris & tillgänglighet
  pricePerQuarter: "per 15 min",
  availableChristmasEve: "Tillgänglig på julafton",
  limitedAvailability: "Få tider kvar",
  fullyBooked: "Fullbokad",
  
  // Distans
  distance: (km: string) => `${km} km bort`,
  inYourArea: "I ditt område",
  
  // Omdömen
  reviews: (count: number) => count === 1 ? "1 omdöme" : `${count} omdömen`,
  noReviewsYet: "Inga omdömen än",
  rating: (rating: string) => `${rating} av 5`,
  
  // Erfarenhet
  yearsExperience: (years: number) => years === 1 ? "1 års erfarenhet" : `${years} års erfarenhet`,
} as const;

// ============================================
// STATUSTEXTER
// ============================================

export const status = {
  // Bokningsstatus
  upcoming: "Kommande",
  confirmed: "Bekräftad",
  pending: "Väntar på bekräftelse",
  completed: "Genomförd",
  cancelled: "Avbokad",
  
  // Ansökningsstatus
  underReview: "Under granskning",
  approved: "Godkänd",
  rejected: "Ej godkänd",
  
  // Betalningsstatus
  reserved: "Reserverad",
  paid: "Betald",
  refunded: "Återbetald",
  
  // Tillgänglighet
  available: "Tillgänglig",
  unavailable: "Ej tillgänglig",
  booked: "Bokad",
} as const;

// ============================================
// BEKRÄFTELSER & FRAMGÅNG
// ============================================

export const success = {
  // Bokning
  bookingConfirmed: "Bokningen är bekräftad!",
  bookingUpdated: "Bokningen har uppdaterats.",
  bookingCancelled: "Bokningen har avbokats.",
  
  // Profil
  profileSaved: "Profilen har sparats.",
  photoUploaded: "Foto uppladdad!",
  
  // Betalning
  paymentSuccessful: "Betalningen genomförd!",
  
  // Ansökan
  applicationSubmitted: "Din ansökan har skickats!",
  applicationApproved: "Grattis! Din ansökan är godkänd.",
  
  // Meddelanden
  messageSent: "Meddelande skickat!",
  
  // Omdömen
  reviewSubmitted: "Tack för ditt omdöme!",
} as const;

// ============================================
// HJÄLPTEXTER & TOOLTIPS
// ============================================

export const hints = {
  // Bokning
  durationHint: "Välj hur länge tomten ska stanna. Standardbesök är 30 minuter.",
  childInfoHint: "Dela information om barnen så att tomten kan göra besöket extra personligt.",
  giftHint: "Berätta vilka presenter tomten ska ta med i säcken. Ni ansvarar för att ha dem redo.",
  addressHint: "Ange fullständig adress där tomten ska komma.",
  instructionsHint: "T.ex. portkod, hur man hittar till dörren, eller om tomten ska vänta ute.",
  
  // Betalning
  securePayment: "Betalningen är säker och krypterad.",
  reservationInfo: "Beloppet reserveras nu och frisläpps till tomten först efter genomfört besök.",
  freeCancellation: "Gratis avbokning upp till 24 timmar innan besöket.",
  
  // Tomteprofil
  priceHint: "Ange ditt pris per 15-minutersintervall. Familjerna ser totalpriset baserat på varaktighet.",
  bioHint: "En personlig och varm beskrivning hjälper familjer att välja just dig.",
  photoHint: "Ladda upp ett tydligt foto. Familjer ser både ditt porträtt och dig i tomtedräkt.",
  
  // Verifiering
  bankIdInfo: "BankID används för att verifiera din identitet och skapa trygghet för familjerna.",
  idUploadInfo: "Din ID-handling granskas av vårt team och lagras säkert.",
} as const;

// ============================================
// TILLGÄNGLIGHET (A11Y)
// ============================================

export const a11y = {
  // Bilder
  santaImageAlt: (name: string) => `Profilbild på ${name}`,
  santaCostumeAlt: (name: string) => `${name} i tomtedräkt`,
  santaWithoutCostumeAlt: (name: string) => `${name} utan dräkt`,
  verifiedBadgeAlt: "Verifierad tomte",
  
  // Knappar
  closeDialog: "Stäng",
  openMenu: "Öppna meny",
  nextStep: "Gå till nästa steg",
  previousStep: "Gå tillbaka",
  
  // Formulär
  requiredField: "Obligatoriskt fält",
  showPassword: "Visa lösenord",
  hidePassword: "Dölj lösenord",
  
  // Rating
  starRating: (rating: number) => `${rating} av 5 stjärnor`,
} as const;

// ============================================
// DATUM & TID
// ============================================

export const dateTime = {
  christmasEve: "24 december",
  today: "Idag",
  tomorrow: "Imorgon",
  minutes: (min: number) => `${min} minuter`,
  shortVisit: "Kort besök",
  standardVisit: "Standard",
  extendedVisit: "Utökat besök",
} as const;

// ============================================
// VALUTA & PRISER
// ============================================

export const currency = {
  sek: "kr",
  perQuarter: "/ 15 min",
  free: "Gratis",
  included: "Ingår",
  serviceFee: "Serviceavgift",
  vat: "Moms",
  total: "Totalt",
} as const;