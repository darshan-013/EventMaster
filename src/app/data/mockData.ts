export interface Event {
  id: number;
  name: string;
  type: 'Seminar' | 'Meeting' | 'Workshop' | 'Conference';
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: 'Planned' | 'Completed' | 'Cancelled';
  description: string;
  createdDate: string;
}

export const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Annual Tech Conference 2026',
    type: 'Conference',
    date: '2026-03-15',
    time: '09:00',
    location: 'Convention Center Hall A',
    organizer: 'John Smith',
    status: 'Planned',
    description: 'Annual technology conference featuring keynote speakers and workshops.',
    createdDate: '2026-01-10'
  },
  {
    id: 2,
    name: 'Product Launch Seminar',
    type: 'Seminar',
    date: '2026-02-28',
    time: '14:00',
    location: 'Innovation Hub Room 203',
    organizer: 'Sarah Johnson',
    status: 'Planned',
    description: 'Introducing our latest product line to stakeholders and partners.',
    createdDate: '2026-01-15'
  },
  {
    id: 3,
    name: 'Q4 Strategy Meeting',
    type: 'Meeting',
    date: '2026-01-20',
    time: '10:00',
    location: 'Executive Boardroom',
    organizer: 'Michael Chen',
    status: 'Completed',
    description: 'Quarterly strategy review and planning session.',
    createdDate: '2025-12-15'
  },
  {
    id: 4,
    name: 'Design Thinking Workshop',
    type: 'Workshop',
    date: '2026-03-05',
    time: '13:00',
    location: 'Creative Studio B',
    organizer: 'Emily Davis',
    status: 'Planned',
    description: 'Interactive workshop on design thinking methodologies.',
    createdDate: '2026-01-20'
  },
  {
    id: 5,
    name: 'Customer Success Seminar',
    type: 'Seminar',
    date: '2026-02-18',
    time: '11:00',
    location: 'Training Center',
    organizer: 'Robert Brown',
    status: 'Planned',
    description: 'Best practices for customer success management.',
    createdDate: '2026-01-25'
  },
  {
    id: 6,
    name: 'Team Building Workshop',
    type: 'Workshop',
    date: '2026-01-15',
    time: '15:00',
    location: 'Outdoor Venue Park',
    organizer: 'Lisa Martinez',
    status: 'Completed',
    description: 'Annual team building activities and exercises.',
    createdDate: '2025-12-20'
  },
  {
    id: 7,
    name: 'AI & Machine Learning Conference',
    type: 'Conference',
    date: '2026-04-10',
    time: '08:30',
    location: 'Tech Campus Auditorium',
    organizer: 'David Wilson',
    status: 'Planned',
    description: 'Exploring the latest trends in AI and machine learning.',
    createdDate: '2026-02-01'
  },
  {
    id: 8,
    name: 'Sales Kickoff Meeting',
    type: 'Meeting',
    date: '2026-01-05',
    time: '09:00',
    location: 'Grand Hotel Ballroom',
    organizer: 'Jennifer Lee',
    status: 'Completed',
    description: 'Annual sales team kickoff and goal setting.',
    createdDate: '2025-12-10'
  },
  {
    id: 9,
    name: 'Security Awareness Seminar',
    type: 'Seminar',
    date: '2026-03-22',
    time: '10:30',
    location: 'IT Department Room 101',
    organizer: 'Thomas Anderson',
    status: 'Planned',
    description: 'Cybersecurity best practices and awareness training.',
    createdDate: '2026-02-05'
  },
  {
    id: 10,
    name: 'Agile Development Workshop',
    type: 'Workshop',
    date: '2026-02-25',
    time: '09:30',
    location: 'Development Center Lab 2',
    organizer: 'Amanda Taylor',
    status: 'Planned',
    description: 'Hands-on agile development practices and scrum framework.',
    createdDate: '2026-01-30'
  },
  {
    id: 11,
    name: 'Budget Planning Meeting',
    type: 'Meeting',
    date: '2025-12-28',
    time: '14:00',
    location: 'Finance Office Conference Room',
    organizer: 'Christopher Moore',
    status: 'Completed',
    description: 'Annual budget review and planning for 2026.',
    createdDate: '2025-12-01'
  },
  {
    id: 12,
    name: 'Leadership Summit',
    type: 'Conference',
    date: '2026-05-15',
    time: '08:00',
    location: 'Luxury Resort Convention Center',
    organizer: 'Patricia White',
    status: 'Planned',
    description: 'Executive leadership summit with industry experts.',
    createdDate: '2026-02-08'
  },
  {
    id: 13,
    name: 'Project Retrospective Meeting',
    type: 'Meeting',
    date: '2025-12-15',
    time: '16:00',
    location: 'Project Office',
    organizer: 'Daniel Harris',
    status: 'Cancelled',
    description: 'Review of completed project outcomes and lessons learned.',
    createdDate: '2025-11-20'
  },
  {
    id: 14,
    name: 'Digital Marketing Workshop',
    type: 'Workshop',
    date: '2026-03-18',
    time: '11:00',
    location: 'Marketing Department Studio',
    organizer: 'Michelle Garcia',
    status: 'Planned',
    description: 'Latest trends and strategies in digital marketing.',
    createdDate: '2026-02-10'
  },
  {
    id: 15,
    name: 'Compliance Training Seminar',
    type: 'Seminar',
    date: '2026-04-05',
    time: '13:30',
    location: 'Legal Department Hall',
    organizer: 'Kevin Rodriguez',
    status: 'Planned',
    description: 'Mandatory compliance and regulatory training session.',
    createdDate: '2026-02-11'
  }
];

export const eventTypes = ['Seminar', 'Meeting', 'Workshop', 'Conference'];
export const eventStatuses = ['Planned', 'Completed', 'Cancelled'];
export const organizers = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Davis',
  'Robert Brown',
  'Lisa Martinez',
  'David Wilson',
  'Jennifer Lee',
  'Thomas Anderson',
  'Amanda Taylor',
  'Christopher Moore',
  'Patricia White',
  'Daniel Harris',
  'Michelle Garcia',
  'Kevin Rodriguez'
];
