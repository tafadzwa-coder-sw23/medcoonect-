import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HospitalList from './components/HospitalList';
import DoctorList from './components/DoctorList';
import VaccineCenterList from './components/VaccineCenterList';
import Assistant from './components/Assistant';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HospitalList />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/vaccine" element={<VaccineCenterList />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;