import { Hospital, BedType, VaccinationCenter, Doctor } from "../types";

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Parirenyatwa Group of Hospitals",
    address: "Mazowe Street, Harare",
    phone: "+263 24 2701555",
    distance: "2.5 km",
    isCovidCenter: true,
    rating: 4.2,
    location: { lat: -17.81, lng: 31.05 },
    beds: [
      { type: BedType.ICU, available: 5, total: 40, pricePerDay: 150 },
      { type: BedType.GENERAL, available: 45, total: 300, pricePerDay: 40 },
      { type: BedType.MATERNITY, available: 12, total: 50, pricePerDay: 60 },
      { type: BedType.OXYGEN, available: 10, total: 60, pricePerDay: 80 },
    ]
  },
  {
    id: "h2",
    name: "The Avenues Clinic",
    address: "Baines Avenue, Harare",
    phone: "+263 24 2251180",
    distance: "1.8 km",
    isCovidCenter: false,
    rating: 4.8,
    location: { lat: -17.82, lng: 31.05 },
    beds: [
      { type: BedType.ICU, available: 2, total: 15, pricePerDay: 400 },
      { type: BedType.GENERAL, available: 8, total: 60, pricePerDay: 150 },
      { type: BedType.PEDIATRIC, available: 5, total: 20, pricePerDay: 120 },
    ]
  },
  {
    id: "h3",
    name: "Mpilo Central Hospital",
    address: "Vera Road, Bulawayo",
    phone: "+263 29 2212010",
    distance: "439 km",
    isCovidCenter: true,
    rating: 4.0,
    location: { lat: -20.15, lng: 28.58 },
    beds: [
      { type: BedType.ICU, available: 8, total: 25, pricePerDay: 100 },
      { type: BedType.VENTILATOR, available: 2, total: 10, pricePerDay: 120 },
      { type: BedType.GENERAL, available: 60, total: 200, pricePerDay: 30 },
    ]
  },
  {
    id: "h4",
    name: "Mater Dei Hospital",
    address: "Burns Drive, Malindela, Bulawayo",
    phone: "+263 29 2240000",
    distance: "442 km",
    isCovidCenter: false,
    rating: 4.7,
    location: { lat: -20.18, lng: 28.59 },
    beds: [
      { type: BedType.ICU, available: 3, total: 12, pricePerDay: 350 },
      { type: BedType.GENERAL, available: 15, total: 80, pricePerDay: 120 },
    ]
  },
  {
    id: "h5",
    name: "Mutare Provincial Hospital",
    address: "Hospital Road, Mutare",
    phone: "+263 20 2060600",
    distance: "263 km",
    isCovidCenter: true,
    rating: 3.9,
    location: { lat: -18.97, lng: 32.66 },
    beds: [
      { type: BedType.GENERAL, available: 30, total: 150, pricePerDay: 35 },
      { type: BedType.OXYGEN, available: 8, total: 30, pricePerDay: 70 },
    ]
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. T. Moyo",
    specialization: "Cardiologist",
    hospitalId: "h2",
    hospitalName: "The Avenues Clinic",
    yearsExperience: 15,
    consultationFee: 80,
    availability: "Mon, Wed, Fri (09:00 - 15:00)",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "d2",
    name: "Dr. S. Ndlovu",
    specialization: "General Practitioner",
    hospitalId: "h1",
    hospitalName: "Parirenyatwa Group of Hospitals",
    yearsExperience: 8,
    consultationFee: 40,
    availability: "Mon-Sat (08:00 - 16:00)",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "d3",
    name: "Dr. R. Patel",
    specialization: "Pediatrician",
    hospitalId: "h4",
    hospitalName: "Mater Dei Hospital",
    yearsExperience: 12,
    consultationFee: 70,
    availability: "Tue, Thu (10:00 - 18:00)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "d4",
    name: "Dr. A. Chiwenga",
    specialization: "Dentist",
    hospitalId: "h2",
    hospitalName: "The Avenues Clinic",
    yearsExperience: 6,
    consultationFee: 50,
    availability: "Mon-Fri (08:30 - 16:30)",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "d5",
    name: "Dr. M. Zulu",
    specialization: "Orthopedic Surgeon",
    hospitalId: "h3",
    hospitalName: "Mpilo Central Hospital",
    yearsExperience: 20,
    consultationFee: 60,
    availability: "Wed, Fri (08:00 - 12:00)",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const MOCK_VACCINATION_CENTERS: VaccinationCenter[] = [
  {
    id: "v1",
    name: "Wilkins Infectious Diseases Hospital",
    address: "Harare",
    vaccines: ["Sinopharm", "Sinovac", "Covaxin"],
    slotsAvailable: 150,
    distance: "5.0 km",
    price: "Free"
  },
  {
    id: "v2",
    name: "Cimas Rescue & Medical Centre",
    address: "Jason Moyo Ave, Bulawayo",
    vaccines: ["J&J", "Sinopharm"],
    slotsAvailable: 45,
    distance: "440 km",
    price: "$20"
  },
  {
    id: "v3",
    name: "Avondale Clinic",
    address: "King George Road, Harare",
    vaccines: ["Sinovac", "Pfizer"],
    slotsAvailable: 80,
    distance: "4.1 km",
    price: "Free"
  }
];