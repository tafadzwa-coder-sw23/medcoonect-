export enum BedType {
  ICU = 'ICU',
  GENERAL = 'General',
  OXYGEN = 'Oxygen',
  VENTILATOR = 'Ventilator'
}

export interface BedAvailability {
  type: BedType;
  available: number;
  total: number;
  pricePerDay: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string; // e.g., "2.5 km"
  beds: BedAvailability[];
  isCovidCenter: boolean;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface VaccinationCenter {
  id: string;
  name: string;
  address: string;
  vaccines: string[]; // e.g., ["Covishield", "Pfizer"]
  slotsAvailable: number;
  distance: string;
  price: string; // "Free" or price
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BookingDetails {
  hospitalId: string;
  hospitalName: string;
  bedType: BedType;
  patientName: string;
  patientAge: string;
  contactNumber: string;
  isEmergency: boolean;
}