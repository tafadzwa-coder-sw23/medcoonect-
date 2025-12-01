import React from 'react';
import { Heart, Menu, X, Activity, MapPin, MessageCircle, Stethoscope, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Find Beds', path: '/', icon: Activity },
    { label: 'Find Doctors', path: '/doctors', icon: Stethoscope },
    { label: 'Vaccination', path: '/vaccine', icon: MapPin },
    { label: 'AI Assistant', path: '/assistant', icon: MessageCircle },
    { label: 'Dashboard', path: '/dashboard', icon: Activity },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg leading-tight text-slate-800">MediConnect</span>
                    <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">Zimbabwe</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={16} className={location.pathname === item.path ? "stroke-[2.5px]" : ""} />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-slate-200 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
             <div className="mb-6 md:mb-0">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center text-slate-500">
                    <Heart size={14} fill="currentColor" />
                    </div>
                    <span className="font-bold text-slate-700">MediConnect Zimbabwe</span>
                </Link>
                <p className="mt-2 text-sm text-slate-500 max-w-xs">
                    Connecting patients with healthcare services across Zimbabwe. Finding beds, doctors, and vaccines made easy.
                </p>
             </div>
             <div className="flex flex-col md:flex-row gap-8 text-sm text-slate-500">
                <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Emergency Numbers</h4>
                    <p>Ambulance: 999 / 994</p>
                    <p>Police: 995</p>
                    <p>Covid Hotline: 2019</p>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Services</h4>
                    <Link to="/" className="block hover:text-blue-600">Hospital Beds</Link>
                    <Link to="/doctors" className="block hover:text-blue-600">Specialist Doctors</Link>
                    <Link to="/vaccine" className="block hover:text-blue-600">Vaccination</Link>
                </div>
             </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} MediConnect Zimbabwe. Designed for better healthcare access.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;