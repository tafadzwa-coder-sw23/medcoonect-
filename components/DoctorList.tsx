import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Clock, DollarSign, Filter, User } from 'lucide-react';
import { Doctor } from '../types';
import { MOCK_DOCTORS } from '../services/mockData';
import BookingModal from './BookingModal';

const DoctorList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique specialties
  const specialties = ['All', ...Array.from(new Set(MOCK_DOCTORS.map(d => d.specialization)))];

  const filteredDoctors = MOCK_DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBook = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Find a Specialist Doctor</h1>
        <p className="text-slate-500 mb-6">Book appointments with top doctors in Zimbabwe.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by doctor name or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative min-w-[200px]">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-slate-400" />
             </div>
             <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white"
             >
                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="p-6">
                <div className="flex gap-4">
                    <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-20 h-20 rounded-xl object-cover border border-slate-100 shadow-sm"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium text-sm">{doctor.specialization}</p>
                        <div className="flex items-center mt-1 text-yellow-500 text-xs font-bold">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            {doctor.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="truncate">{doctor.hospitalName}</span>
                    </div>
                     <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{doctor.availability}</span>
                    </div>
                     <div className="flex items-center text-sm text-slate-600">
                        <User className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{doctor.yearsExperience} years experience</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Consultation</p>
                        <p className="text-lg font-bold text-slate-800">${doctor.consultationFee}</p>
                    </div>
                    <button 
                        onClick={() => handleBook(doctor)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm shadow-blue-200"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
        
      {selectedDoctor && (
        <BookingModal
            type="APPOINTMENT"
            data={selectedDoctor}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DoctorList;