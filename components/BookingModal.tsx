import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { Hospital, BedType, BookingDetails } from '../types';

interface BookingModalProps {
  hospital: Hospital;
  selectedBedType: BedType | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ hospital, selectedBedType, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<BookingDetails>>({
    hospitalId: hospital.id,
    hospitalName: hospital.name,
    bedType: selectedBedType || BedType.GENERAL,
    isEmergency: false
  });
  const [step, setStep] = useState<'form' | 'success'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Book Bed at {hospital.name}
                </h3>
                <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bed Type</label>
                  <select 
                    value={formData.bedType}
                    onChange={e => setFormData({...formData, bedType: e.target.value as BedType})}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  >
                    {hospital.beds.map(bed => (
                      <option key={bed.type} value={bed.type} disabled={bed.available === 0}>
                        {bed.type} ({bed.available} available) - ${bed.pricePerDay}/day
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.patientName || ''}
                    onChange={e => setFormData({...formData, patientName: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.patientAge || ''}
                      onChange={e => setFormData({...formData, patientAge: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <input
                      type="tel"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.contactNumber || ''}
                      onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="emergency"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    checked={formData.isEmergency || false}
                    onChange={e => setFormData({...formData, isEmergency: e.target.checked})}
                  />
                  <label htmlFor="emergency" className="ml-2 block text-sm text-gray-900 font-medium">
                    Critical / Emergency (COVID-19 Positive)
                  </label>
                </div>

                {formData.isEmergency && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          Priority will be given to emergency cases. Please have patient ID ready.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
                    formData.isEmergency 
                      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Booking Confirmed!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your request for a {formData.bedType} bed at {hospital.name} has been received. 
                    Reference ID: #{Math.floor(Math.random() * 10000)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Please arrive within 2 hours.
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  onClick={onClose}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;