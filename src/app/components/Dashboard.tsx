import { Calendar, CalendarCheck, CalendarX, CalendarDays, PlusCircle, FileText, CalendarClock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockEvents } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  // Calculate KPIs
  const totalEvents = mockEvents.length;
  const today = new Date();
  const upcomingEvents = mockEvents.filter(e => e.status === 'Planned' && new Date(e.date) > today).length;
  const completedEvents = mockEvents.filter(e => e.status === 'Completed').length;
  const thisMonthEvents = mockEvents.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
  }).length;

  // Events by Month data
  const monthlyData = [
    { month: 'Dec', count: mockEvents.filter(e => new Date(e.date).getMonth() === 11 && new Date(e.date).getFullYear() === 2025).length },
    { month: 'Jan', count: mockEvents.filter(e => new Date(e.date).getMonth() === 0 && new Date(e.date).getFullYear() === 2026).length },
    { month: 'Feb', count: mockEvents.filter(e => new Date(e.date).getMonth() === 1).length },
    { month: 'Mar', count: mockEvents.filter(e => new Date(e.date).getMonth() === 2).length },
    { month: 'Apr', count: mockEvents.filter(e => new Date(e.date).getMonth() === 3).length },
    { month: 'May', count: mockEvents.filter(e => new Date(e.date).getMonth() === 4).length }
  ];

  // Events by Type data
  const typeData = [
    { name: 'Seminar', value: mockEvents.filter(e => e.type === 'Seminar').length },
    { name: 'Meeting', value: mockEvents.filter(e => e.type === 'Meeting').length },
    { name: 'Workshop', value: mockEvents.filter(e => e.type === 'Workshop').length },
    { name: 'Conference', value: mockEvents.filter(e => e.type === 'Conference').length }
  ];

  // Events by Status data
  const statusData = [
    { name: 'Planned', value: mockEvents.filter(e => e.status === 'Planned').length },
    { name: 'Completed', value: mockEvents.filter(e => e.status === 'Completed').length },
    { name: 'Cancelled', value: mockEvents.filter(e => e.status === 'Cancelled').length }
  ];

  const PIE_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
  const STATUS_COLORS = ['#3b82f6', '#10b981', '#ef4444'];

  // Next 5 upcoming events
  const nextUpcoming = mockEvents
    .filter(e => e.status === 'Planned' && new Date(e.date) > today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Recently added events
  const recentlyAdded = [...mockEvents]
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, 5);

  const kpiCards = [
    { title: 'Total Events', value: totalEvents, icon: Calendar, color: 'from-blue-500 to-blue-600', description: 'All events in system' },
    { title: 'Upcoming Events', value: upcomingEvents, icon: CalendarClock, color: 'from-indigo-500 to-indigo-600', description: 'Scheduled for future' },
    { title: 'Completed Events', value: completedEvents, icon: CalendarCheck, color: 'from-green-500 to-green-600', description: 'Successfully finished' },
    { title: 'Events This Month', value: thisMonthEvents, icon: CalendarDays, color: 'from-purple-500 to-purple-600', description: 'Current month total' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium mb-1">{card.title}</p>
                  <p className="text-4xl font-bold text-gray-800 mb-2">{card.value}</p>
                  <p className="text-xs text-gray-500">{card.description}</p>
                </div>
                <div className={`bg-gradient-to-br ${card.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column Chart - Events by Month */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Events by Month</h3>
              <p className="text-sm text-gray-600">Monthly event distribution</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="url(#colorGradient)" name="Events" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Events by Type */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Events by Type</h3>
              <p className="text-sm text-gray-600">Type distribution breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart - Events by Status */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Events by Status</h3>
            <p className="text-sm text-gray-600">Current status overview</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Reports Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next 5 Upcoming Events */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Next 5 Upcoming Events</h3>
              <p className="text-sm text-gray-600">Scheduled events coming soon</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Event Name</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody>
                {nextUpcoming.map((event, index) => (
                  <tr key={event.id} className={`border-b border-gray-100 hover:bg-indigo-50/50 transition-colors ${index % 2 === 0 ? 'bg-gray-50/30' : ''}`}>
                    <td className="py-3 px-3 text-sm font-medium text-gray-800">{event.name}</td>
                    <td className="py-3 px-3 text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="py-3 px-3 text-sm text-gray-600">{event.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently Added Events */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Recently Added Events</h3>
              <p className="text-sm text-gray-600">Latest event entries</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Event Name</th>
                  <th className="text-left py-3 px-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Created Date</th>
                </tr>
              </thead>
              <tbody>
                {recentlyAdded.map((event, index) => (
                  <tr key={event.id} className={`border-b border-gray-100 hover:bg-indigo-50/50 transition-colors ${index % 2 === 0 ? 'bg-gray-50/30' : ''}`}>
                    <td className="py-3 px-3 text-sm font-medium text-gray-800">{event.name}</td>
                    <td className="py-3 px-3 text-sm text-gray-600">{new Date(event.createdDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Quick Actions</h3>
            <p className="text-indigo-100 text-sm mt-1">Manage your events efficiently</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('create-event')}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            <PlusCircle className="w-5 h-5" />
            Create Event
          </button>
          <button
            onClick={() => onNavigate('event-list')}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 font-semibold"
          >
            <FileText className="w-5 h-5" />
            View All Events
          </button>
          <button
            onClick={() => onNavigate('upcoming-events')}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 font-semibold"
          >
            <CalendarClock className="w-5 h-5" />
            View Upcoming Events
          </button>
        </div>
      </div>
    </div>
  );
}
