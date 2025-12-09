/**
 * DEPRECATED: This file contains mock data that was used during development.
 * It is no longer used in production - all Santa data comes from the database.
 * Keeping for reference only.
 */

// Mock data for santas (NOT USED IN PRODUCTION)
export interface Santa {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  pricePerQuarter: number;
  image: string;
  imageWithoutCostume: string;
  verified: boolean;
  bio: string;
  experience: string;
  availableTimes: string[];
  reviewsList: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Booking {
  id: string;
  santaId: string;
  santaName: string;
  santaImage: string;
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "completed" | "cancelled";
  children: Child[];
  address: string;
  totalPrice: number;
}

export interface Child {
  name: string;
  age: string;
  gifts: string;
  specialInfo: string;
}

export const mockSantas: Santa[] = [
  {
    id: "1",
    name: "Tomte Erik",
    location: "Stockholm",
    distance: "2.3 km",
    rating: 5.0,
    reviews: 47,
    pricePerQuarter: 650,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    imageWithoutCostume: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    verified: true,
    bio: "Jag har varit jultomte i över 15 år och älskar att se barnens glädje lysa upp rummet. Med erfarenhet från hundratals familjer vet jag hur man skapar magiska ögonblick.",
    experience: "15+ år som tomte",
    availableTimes: ["14:00", "15:00", "16:00", "17:00", "18:00"],
    reviewsList: [
      { id: "r1", author: "Anna S.", rating: 5, date: "2023-12-24", text: "Fantastisk upplevelse! Barnen var helt förtrollade." },
      { id: "r2", author: "Magnus L.", rating: 5, date: "2023-12-24", text: "Professionell och varm. Rekommenderas starkt!" },
    ],
  },
  {
    id: "2",
    name: "Tomte Magnus",
    location: "Göteborg",
    distance: "1.8 km",
    rating: 4.9,
    reviews: 32,
    pricePerQuarter: 600,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    imageWithoutCostume: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    verified: true,
    bio: "Som pensionerad lärare har jag alltid älskat att arbeta med barn. Nu sprider jag julglädje som tomte och det är årets höjdpunkt!",
    experience: "8 år som tomte",
    availableTimes: ["13:00", "14:00", "15:00", "16:00"],
    reviewsList: [
      { id: "r3", author: "Lisa K.", rating: 5, date: "2023-12-24", text: "Underbar tomte som verkligen tog sig tid med varje barn." },
    ],
  },
  {
    id: "3",
    name: "Tomte Karl",
    location: "Malmö",
    distance: "3.1 km",
    rating: 4.8,
    reviews: 28,
    pricePerQuarter: 550,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    imageWithoutCostume: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    verified: true,
    bio: "Med bakgrund som skådespelare ger jag en autentisk och minnesvärd tomteupplevelse. Varje besök är unikt!",
    experience: "5 år som tomte",
    availableTimes: ["15:00", "16:00", "17:00", "18:00", "19:00"],
    reviewsList: [
      { id: "r4", author: "Peter H.", rating: 5, date: "2023-12-24", text: "Bästa tomten vi haft! Kommer definitivt boka igen." },
    ],
  },
  {
    id: "4",
    name: "Tomte Anders",
    location: "Uppsala",
    distance: "4.5 km",
    rating: 5.0,
    reviews: 19,
    pricePerQuarter: 625,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    imageWithoutCostume: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    verified: true,
    bio: "Jag tror på att skapa genuina möten med barnen. Min filosofi är att lyssna, skratta och sprida värme.",
    experience: "10 år som tomte",
    availableTimes: ["14:00", "15:00", "16:00"],
    reviewsList: [
      { id: "r5", author: "Eva M.", rating: 5, date: "2023-12-24", text: "Så fint! Barnen pratar fortfarande om tomten." },
    ],
  },
];

export const mockBookings: Booking[] = [
  {
    id: "b1",
    santaId: "1",
    santaName: "Tomte Erik",
    santaImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    date: "2024-12-24",
    time: "15:00",
    duration: 30,
    status: "upcoming",
    children: [
      { name: "Emma", age: "6", gifts: "Docka, Lego", specialInfo: "Älskar hästar" },
      { name: "Oscar", age: "4", gifts: "Bilar, Dinosaurier", specialInfo: "" },
    ],
    address: "Storgatan 15, 114 55 Stockholm",
    totalPrice: 1300,
  },
];
