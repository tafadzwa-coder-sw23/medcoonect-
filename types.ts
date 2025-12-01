export enum BedType {
  ICU = 'ICU',
  GENERAL = 'General',
  OXYGEN = 'Oxygen',
  VENTILATOR = 'Ventilator',
  MATERNITY = 'Maternity',
  PEDIATRIC = 'Pediatric'
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

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospitalId: string;
  hospitalName: string;
  yearsExperience: number;
  consultationFee: number;
  availability: string; // e.g. "Mon-Fri 08:00 - 16:00"
  rating: number;
  image?: string;
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
  bookingType: 'BED' | 'APPOINTMENT';
  targetId: string; // Hospital ID or Doctor ID
  targetName: string; // Hospital Name or Doctor Name
  subTarget?: string; // Bed Type or null
  appointmentDate?: string;
  appointmentTime?: string;
  patientName: string;
  patientAge: string;
  contactNumber: string;
  notes?: string;
  isEmergency: boolean;
}