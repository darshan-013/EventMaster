import { ReactNode, useState } from 'react';
import { LayoutDashboard, Calendar, CalendarClock, PlusCircle, Bell, User, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'event-list', label: 'Event List', icon: Calendar },
    { id: 'upcoming-events', label: 'Upcoming Events', icon: CalendarClock },
    { id: 'create-event', label: 'Create Event', icon: PlusCircle }
  ];

  const pageTitles: Record<string, string> = {
    'dashboard': 'Dashboard',
    'event-list': 'Event List Report',
    'upcoming-events': 'Upcoming Events',
    'create-event': 'Event Master'
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Sidebar - Glass Effect */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-white/10 backdrop-blur-xl text-gray-800 transition-all duration-300 overflow-hidden flex-shrink-0 border-r border-white/20 shadow-2xl relative`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Event Management</h1>
              <p className="text-xs text-gray-600">Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-4 px-3 relative z-10">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                  currentPage === item.id 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105' 
                    : 'text-gray-700 hover:bg-white/30 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-xs text-gray-700 font-medium">System Status</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600">All systems operational</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Glass Effect */}
        <header className="bg-white/70 backdrop-blur-lg shadow-sm border-b border-white/20 sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                {sidebarOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {pageTitles[currentPage] || 'Dashboard'}
                </h2>
                <p className="text-xs text-gray-600">Manage and track your events</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-white/50 rounded-xl transition-all duration-200 relative hover:shadow-md">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <button className="flex items-center gap-2 p-2 pr-3 hover:bg-white/50 rounded-xl transition-all duration-200 hover:shadow-md">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-600">Administrator</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
