import { Hospital, BedType, VaccinationCenter } from "../types";

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "City General Hospital",
    address: "123 Medical Drive, Downtown",
    phone: "(555) 123-4567",
    distance: "1.2 km",
    isCovidCenter: true,
    rating: 4.5,
    location: { lat: 0, lng: 0 },
    beds: [
      { type: BedType.ICU, available: 2, total: 20, pricePerDay: 500 },
      { type: BedType.GENERAL, available: 45, total: 100, pricePerDay: 150 },
      { type: BedType.OXYGEN, available: 5, total: 30, pricePerDay: 250 },
    ]
  },
  {
    id: "h2",
    name: "St. Mary's Medical Center",
    address: "456 Health Ave, Westside",
    phone: "(555) 987-6543",
    distance: "3.5 km",
    isCovidCenter: false,
    rating: 4.8,
    location: { lat: 0, lng: 0 },
    beds: [
      { type: BedType.ICU, available: 0, total: 15, pricePerDay: 600 },
      { type: BedType.GENERAL, available: 12, total: 80, pricePerDay: 200 },
    ]
  },
  {
    id: "h3",
    name: "Community Health Hub",
    address: "789 Wellness Way, Suburbia",
    phone: "(555) 456-7890",
    distance: "5.0 km",
    isCovidCenter: true,
    rating: 4.2,
    location: { lat: 0, lng: 0 },
    beds: [
      { type: BedType.ICU, available: 5, total: 10, pricePerDay: 400 },
      { type: BedType.VENTILATOR, available: 1, total: 5, pricePerDay: 800 },
      { type: BedType.GENERAL, available: 30, total: 50, pricePerDay: 100 },
    ]
  }
];

export const MOCK_VACCINATION_CENTERS: VaccinationCenter[] = [
  {
    id: "v1",
    name: "Downtown Clinic",
    address: "101 Main St",
    vaccines: ["Pfizer", "Moderna"],
    slotsAvailable: 50,
    distance: "0.8 km",
    price: "Free"
  },
  {
    id: "v2",
    name: "City Pharmacy",
    address: "202 Broadway",
    vaccines: ["J&J", "Pfizer"],
    slotsAvailable: 12,
    distance: "1.5 km",
    price: "$20"
  },
  {
    id: "v3",
    name: "Community Center",
    address: "303 Park Ave",
    vaccines: ["Moderna"],
    slotsAvailable: 100,
    distance: "2.1 km",
    price: "Free"
  }
];