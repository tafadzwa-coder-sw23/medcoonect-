import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Calendar, Clock, User, Phone, FileText } from 'lucide-react';
import { Hospital, BedType, BookingDetails, Doctor } from '../types';

interface BookingModalProps {
  type: 'BED' | 'APPOINTMENT';
  data: Hospital | Doctor;
  selectedBedType?: BedType | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ type, data, selectedBedType, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<BookingDetails>>({
    bookingType: type,
    targetId: data.id,
    targetName: data.name,
    subTarget: selectedBedType || (type === 'BED' ? BedType.GENERAL : undefined),
    isEmergency: false
  });
  const [step, setStep] = useState<'form' | 'success'>('form');

  useEffect(() => {
    setFormData({
      bookingType: type,
      targetId: data.id,
      targetName: data.name,
      subTarget: selectedBedType || (type === 'BED' ? BedType.GENERAL : undefined),
      isEmergency: false
    });
    setStep('form');
  }, [type, data, selectedBedType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const hospital = type === 'BED' ? (data as Hospital) : null;
  const doctor = type === 'APPOINTMENT' ? (data as Doctor) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl leading-6 font-bold text-slate-900" id="modal-title">
                    {type === 'BED' ? 'Book Hospital Bed' : 'Book Appointment'}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {type === 'BED' ? `at ${hospital?.name}` : `with ${doctor?.name}`}
                  </p>
                </div>
                <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-500 bg-slate-100 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {type === 'BED' && hospital && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bed Type</label>
                    <select 
                      value={formData.subTarget || ''}
                      onChange={e => setFormData({...formData, subTarget: e.target.value})}
                      className="block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-slate-50"
                    >
                      {hospital.beds.map(bed => (
                        <option key={bed.type} value={bed.type} disabled={bed.available === 0}>
                          {bed.type} ({bed.available} available) - ${bed.pricePerDay}/day
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {type === 'APPOINTMENT' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="date"
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.appointmentDate || ''}
                          onChange={e => setFormData({...formData, appointmentDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="time"
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.appointmentTime || ''}
                          onChange={e => setFormData({...formData, appointmentTime: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.patientName || ''}
                      onChange={e => setFormData({...formData, patientName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      required
                      placeholder="Age"
                      className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.patientAge || ''}
                      onChange={e => setFormData({...formData, patientAge: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                       <input
                        type="tel"
                        required
                        placeholder="+263..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={formData.contactNumber || ''}
                        onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {type === 'APPOINTMENT' && (
                   <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit</label>
                    <textarea
                      rows={2}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Briefly describe your symptoms..."
                      value={formData.notes || ''}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                    />
                   </div>
                )}

                {type === 'BED' && (
                  <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
                    <input
                      id="emergency"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-300 rounded"
                      checked={formData.isEmergency || false}
                      onChange={e => setFormData({...formData, isEmergency: e.target.checked})}
                    />
                    <label htmlFor="emergency" className="ml-3 block text-sm text-red-800 font-medium">
                      This is a Medical Emergency
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  type="submit"
                  className={`w-full inline-flex justify-center items-center rounded-xl border border-transparent shadow-sm px-4 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-all transform hover:scale-[1.02] ${
                    formData.isEmergency 
                      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {type === 'BED' ? 'Request Admission' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl leading-6 font-bold text-slate-900 mb-2">
                Booking Confirmed
              </h3>
              <div className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">
                <p>
                  Your {type === 'BED' ? 'bed request' : 'appointment'} at <span className="font-semibold text-slate-700">{data.name}</span> has been scheduled.
                </p>
                <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Reference ID</p>
                    <p className="text-lg font-mono font-bold text-slate-800">#{Math.floor(Math.random() * 10000)}</p>
                </div>
                <p className="mt-4">
                    We have sent a confirmation SMS to {formData.contactNumber}.
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-slate-100 text-base font-medium text-slate-700 hover:bg-slate-200 focus:outline-none sm:text-sm"
                  onClick={onClose}
                >
                  Close
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