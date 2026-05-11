import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  Trophy, 
  LayoutDashboard, 
  MapPin,
  Calendar,
  ClipboardList,
  DollarSign,
  Users,
  Settings, 
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Globe,
  Moon
} from 'lucide-react';
import AdminOverview from './admin/AdminOverview';
import ManageCourts from './admin/ManageCourts';
import ManageBookings from './admin/ManageBookings';
import AdminSettings from './admin/AdminSettings';
import { Courts } from '../pages/Courts';
import { Customers } from '../pages/Customers';
import { Financial } from '../pages/Financial';
import { CourtAdmin } from '../pages/CourtAdmin';
import { clearStoredUser, getStoredUser } from '../lib/auth';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminUser = getStoredUser();

  const handleLogout = () => {
    clearStoredUser();
    navigate('/login');
  };

  const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: MapPin, label: 'Manage Courts', path: '/admin/courts' },
  { icon: ClipboardList, label: 'Court Admin', path: '/admin/court-admin' },
  { icon: Trophy, label: 'Courts Page', path: '/admin/courts-page' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
  { icon: DollarSign, label: 'Financial', path: '/admin/financial' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];
  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-[#d3dfd5] bg-[#163E1B] flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg border border-white/20 bg-white/12 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-white">Admin Panel</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 border-r border-[#224727] bg-[#163E1B] z-40
        transition-transform lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 bg-[#163E1B]">
            <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/12 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white leading-tight">Tennis Finder</div>
              <div className="text-xs text-white/70">Admin Panel</div>
            </div>
          </div>

          
          {/* Admin Info */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <ShieldCheck className="w-5 h-5 text-[#9CCC65]" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Admin User</div>
                <div className="text-xs text-white/72">{adminUser?.email || 'System Administrator'}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                                (item.path !== '/admin' && location.pathname.startsWith(item.path));
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 rounded-xl px-4 py-3 transition-colors
                        ${isActive 
                          ? 'bg-[#2E7D32] text-white shadow-sm' 
                          : 'text-white/84 hover:bg-white/8 hover:text-white'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-white/10 p-4">
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              className="w-full justify-start text-white/84 hover:bg-white/8 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-5 rounded-[28px] border border-[#dbe6dc] bg-gradient-to-r from-[#163E1B] via-[#1f5a24] to-[#2E7D32] px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#cce0c6]">Admin Workspace</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Tennis Finder Dashboard</h1>
              <p className="mt-2 max-w-3xl text-[#e3efe4]">
                Manage courts, bookings, finances, and customers from one branded control panel.
              </p>
            </div>
            <div>
              <Button className="rounded-2xl border border-white/15 bg-white/12 px-6 py-6 text-base font-semibold text-white shadow-none hover:bg-white/18">
                Enterprise View
              </Button>
            </div>
          </div>
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="courts" element={<ManageCourts />} />
            <Route path="court-admin" element={<CourtAdmin />} />
            <Route path="courts-page" element={<Courts />} />
            <Route path="customers" element={<Customers />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="financial" element={<Financial />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
