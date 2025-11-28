import React, { useState } from 'react';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { MOCK_VACCINATION_CENTERS } from '../services/mockData';

const VaccineCenterList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCenters = MOCK_VACCINATION_CENTERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Vaccination Centers</h1>
        <p className="text-slate-500 mb-6">Find nearby COVID-19 vaccination centers and book your slot.</p>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by area or center name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map(center => (
          <div key={center.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-slate-900">{center.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${center.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {center.price}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1 flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {center.address}
              </p>
              
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Vaccines</p>
                <div className="flex flex-wrap gap-2">
                  {center.vaccines.map(v => (
                    <span key={v} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center text-blue-700">
                   <Clock className="h-4 w-4 mr-2" />
                   <span className="text-sm font-medium">{center.slotsAvailable} slots today</span>
                </div>
                <span className="text-xs text-blue-600 font-medium">{center.distance}</span>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <Calendar className="h-4 w-4 mr-2" />
              Book Slot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaccineCenterList;