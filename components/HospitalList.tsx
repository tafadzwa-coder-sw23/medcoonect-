import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Star, AlertTriangle, Syringe, BedDouble, Filter } from 'lucide-react';
import { Hospital, BedType } from '../types';
import { MOCK_HOSPITALS } from '../services/mockData';
import { generateLocalHospitals } from '../services/geminiService';
import BookingModal from './BookingModal';

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(MOCK_HOSPITALS);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedBedType, setSelectedBedType] = useState<BedType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);
  const [filterType, setFilterType] = useState<BedType | 'ALL'>('ALL');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setHospitals(MOCK_HOSPITALS);
      setAiGenerated(false);
      return;
    }

    setLoading(true);
    
    // If API KEY is present, try to generate realistic data for the location
    if (process.env.API_KEY) {
      const generated = await generateLocalHospitals(searchTerm);
      if (generated.length > 0) {
        setHospitals(generated);
        setAiGenerated(true);
      } else {
        // Fallback to filtering mock data
        const filtered = MOCK_HOSPITALS.filter(h => 
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          h.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setHospitals(filtered);
        setAiGenerated(false);
      }
    } else {
      // Offline mode filtering
      const filtered = MOCK_HOSPITALS.filter(h => 
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setHospitals(filtered);
      setAiGenerated(false);
    }
    
    setLoading(false);
  };

  const handleBook = (hospital: Hospital, type?: BedType) => {
    setSelectedHospital(hospital);
    setSelectedBedType(type || null);
    setIsModalOpen(true);
  };

  const filteredHospitals = hospitals.filter(hospital => {
    if (filterType === 'ALL') return true;
    return hospital.beds.some(bed => bed.type === filterType);
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Find Hospital Beds</h1>
        <p className="text-slate-500 mb-6">Enter your location to find nearby hospitals with real-time bed availability.</p>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter city, zip, or area (e.g., 'New York', 'Downtown')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Searching...' : <><Search className="h-4 w-4 mr-2" /> Search</>}
          </button>
        </form>

        {/* Filter Section */}
        <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Filter by Bed Type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setFilterType('ALL')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filterType === 'ALL'
                        ? 'bg-slate-800 text-white shadow-md transform scale-105'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                    All Types
                </button>
                {Object.values(BedType).map(type => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filterType === type
                            ? 'bg-blue-600 text-white shadow-md transform scale-105'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>

        {aiGenerated && (
          <p className="mt-4 text-xs text-blue-600 flex items-center">
            <Star className="h-3 w-3 mr-1" />
            Results generated by AI based on location
          </p>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map(hospital => (
          <div key={hospital.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-5 flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{hospital.name}</h3>
                {hospital.isCovidCenter && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    COVID Center
                  </span>
                )}
              </div>
              
              <div className="mt-2 flex items-center text-sm text-slate-500">
                <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                <span className="truncate">{hospital.address}</span>
              </div>

              <div className="mt-1 flex items-center text-sm text-slate-500">
                <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                <span className="truncate">{hospital.phone}</span>
              </div>
              
              <div className="mt-1 flex items-center text-sm text-slate-500">
                <span className="font-medium text-slate-700 mr-2">{hospital.distance} away</span>
                <span className="flex items-center text-yellow-500">
                   <Star className="h-3 w-3 fill-current mr-1" /> {hospital.rating}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bed Availability</h4>
                {hospital.beds.map(bed => (
                  <div key={bed.type} className={`flex items-center justify-between p-2 rounded-lg border ${filterType === bed.type ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${bed.available > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="text-sm font-medium text-slate-700">{bed.type}</div>
                        <div className="text-xs text-slate-400">${bed.pricePerDay}/day</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-bold ${bed.available < 5 ? 'text-red-600' : 'text-green-600'}`}>
                        {bed.available} / {bed.total}
                      </div>
                      <button 
                        onClick={() => handleBook(hospital, bed.type)}
                        disabled={bed.available === 0}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                          bed.available > 0 
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-4 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => handleBook(hospital)}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Book Bed
              </button>
              <a 
                href={`tel:${hospital.phone}`}
                className="inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12">
           <AlertTriangle className="mx-auto h-12 w-12 text-slate-300" />
           <h3 className="mt-2 text-sm font-medium text-slate-900">No hospitals found</h3>
           <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {selectedHospital && (
        <BookingModal 
          hospital={selectedHospital}
          selectedBedType={selectedBedType}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HospitalList;