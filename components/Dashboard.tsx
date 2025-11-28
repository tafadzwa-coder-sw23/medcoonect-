import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MOCK_HOSPITALS } from '../services/mockData';

const Dashboard: React.FC = () => {
  // Calculate aggregated stats
  const totalBeds = MOCK_HOSPITALS.reduce((acc, h) => acc + h.beds.reduce((bAcc, b) => bAcc + b.total, 0), 0);
  const availableBeds = MOCK_HOSPITALS.reduce((acc, h) => acc + h.beds.reduce((bAcc, b) => bAcc + b.available, 0), 0);
  const occupiedBeds = totalBeds - availableBeds;

  const pieData = [
    { name: 'Available', value: availableBeds },
    { name: 'Occupied', value: occupiedBeds },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  const hospitalData = MOCK_HOSPITALS.map(h => ({
    name: h.name.split(' ')[0], // Short name
    ICU: h.beds.find(b => b.type === 'ICU')?.available || 0,
    General: h.beds.find(b => b.type === 'General')?.available || 0,
    Oxygen: h.beds.find(b => b.type === 'Oxygen')?.available || 0,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Live Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Total Capacity</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">{totalBeds}</p>
          <p className="text-sm text-slate-400 mt-1">Across {MOCK_HOSPITALS.length} monitored hospitals</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-medium text-slate-500 uppercase">Available Beds</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{availableBeds}</p>
          <p className="text-sm text-slate-400 mt-1">{Math.round((availableBeds/totalBeds)*100)}% vacancy rate</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-sm font-medium text-slate-500 uppercase">Critical (ICU)</h3>
           <p className="text-3xl font-bold text-red-600 mt-2">
             {MOCK_HOSPITALS.reduce((acc, h) => acc + (h.beds.find(b => b.type === 'ICU')?.available || 0), 0)}
           </p>
           <p className="text-sm text-slate-400 mt-1">Available immediately</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Occupancy Ratio</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Availability by Hospital</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hospitalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="ICU" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Oxygen" stackId="a" fill="#3B82F6" />
                <Bar dataKey="General" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;