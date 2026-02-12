import { useState } from 'react';
import { Save, X, Trash2, CheckCircle } from 'lucide-react';
import { eventTypes, eventStatuses, organizers } from '../data/mockData';

interface EventFormProps {
  onNavigate: (page: string) => void;
}

export default function EventForm({ onNavigate }: EventFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    status: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Event name is required';
    if (!formData.type) newErrors.type = 'Event type is required';
    if (!formData.date) newErrors.date = 'Event date is required';
    if (!formData.time) newErrors.time = 'Event time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.organizer) newErrors.organizer = 'Organizer is required';
    if (!formData.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setFormData({
          name: '',
          type: '',
          date: '',
          time: '',
          location: '',
          organizer: '',
          status: '',
          description: ''
        });
      }, 2000);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      type: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      status: '',
      description: ''
    });
    setErrors({});
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      handleCancel();
      onNavigate('dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-green-500 p-2 rounded-lg">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-green-800 font-semibold">Event saved successfully!</p>
            <p className="text-green-700 text-sm">Your event has been created and added to the system.</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/50 hover:border-indigo-300'
              }`}
              placeholder="Enter event name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.name}</p>}
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Event Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                errors.type ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/50 hover:border-indigo-300'
              }`}
            >
              <option value="">Select type</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.type}</p>}
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/50 hover:border-indigo-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.date}</p>}
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Event Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                errors.time ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/50 hover:border-indigo-300'
              }`}
            />
            {errors.time && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.time}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/50 hover:border-indigo-300'
              }`}
              placeholder="Enter location"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.location}</p>}
          </div>

          {/* Organizer */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Organizer <span className="text-red-500">*</span>
            </label>
            <select
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                errors.organizer ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/50 hover:border-indigo-300'
              }`}
            >
              <option value="">Select organizer</option>
              {organizers.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
            {errors.organizer && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.organizer}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                errors.status ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white/50 hover:border-indigo-300'
              }`}
            >
              <option value="">Select status</option>
              {eventStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.status}</p>}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 hover:border-indigo-300 transition-all duration-200"
              placeholder="Enter event description"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            <Save className="w-5 h-5" />
            Save Event
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 px-8 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-semibold"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-8 py-3.5 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold ml-auto"
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
