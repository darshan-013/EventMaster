import { useState } from 'react';
import { Search, Filter, Download, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockEvents, Event } from '../data/mockData';

export default function EventList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter events
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handleExport = () => {
    alert('Export functionality would download a CSV/Excel file with the event data');
  };

  const handleEdit = (event: Event) => {
    alert(`Edit functionality for: ${event.name}`);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Planned: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      Seminar: 'bg-purple-100 text-purple-800',
      Meeting: 'bg-indigo-100 text-indigo-800',
      Workshop: 'bg-pink-100 text-pink-800',
      Conference: 'bg-orange-100 text-orange-800'
    };
    return styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 hover:border-indigo-300 transition-all duration-200"
            />
          </div>

          {/* Filters and Export */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 hover:border-indigo-300 transition-all duration-200 font-medium"
              >
                <option value="all">All Status</option>
                <option value="Planned">Planned</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 hover:border-indigo-300 transition-all duration-200 font-medium"
            >
              <option value="all">All Types</option>
              <option value="Seminar">Seminar</option>
              <option value="Meeting">Meeting</option>
              <option value="Workshop">Workshop</option>
              <option value="Conference">Conference</option>
            </select>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-xl text-sm font-semibold">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} events
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Event Name</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Organizer</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.map((event, index) => (
                <tr
                  key={event.id}
                  className={`border-b border-gray-100 hover:bg-indigo-50/50 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="py-4 px-4 text-sm font-semibold text-gray-800">{event.name}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(event.type)}`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{event.location}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{event.organizer}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Edit event"
                    >
                      <Edit className="w-4 h-4 text-indigo-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
