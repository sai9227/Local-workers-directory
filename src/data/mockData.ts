import { Artisan, ServiceJob, ServiceQuote } from '../utils/serviceLogic';

export interface Locality {
  name: string;
  ward: string;
  distance: string;
  isPopular?: boolean;
}

export const RAJAHMUNDRY_LOCALITIES: Locality[] = [
  { name: 'Danavaipeta', ward: 'Ward 14', distance: '0.0 km', isPopular: true },
  { name: 'Prakash Nagar', ward: 'Ward 21', distance: '1.2 km', isPopular: true },
  { name: 'Aryapuram', ward: 'Ward 9', distance: '1.8 km', isPopular: true },
  { name: 'Morampudi', ward: 'Ward 34', distance: '3.1 km', isPopular: true },
  { name: 'Innespeta', ward: 'Ward 12', distance: '1.5 km', isPopular: true },
  { name: 'Kotipalli Bus Stand', ward: 'Ward 17', distance: '2.4 km', isPopular: true },
  { name: 'Lalitha Nagar', ward: 'Ward 25', distance: '2.0 km', isPopular: false },
  { name: 'Katheru', ward: 'Ward 45', distance: '4.2 km', isPopular: false },
];

export const INITIAL_ARTISANS: Artisan[] = [
  {
    id: 'art-1',
    name: 'Ramesh Kumar',
    trade: 'Electrician',
    subTrade: 'Master Technician',
    rating: 4.9,
    reviewsCount: 184,
    locality: 'Danavaipeta',
    ward: 'Ward 14',
    distanceKm: 0.6,
    visitFee: 299,
    phone: '+91 98345 67812',
    isPoliceVerified: true,
    initials: 'RK',
    featured: true,
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=300&q=80',
  },
  {
    id: 'art-2',
    name: 'Suresh Gowda',
    trade: 'Plumber',
    subTrade: 'Sanitary & Leaks',
    rating: 4.8,
    reviewsCount: 96,
    locality: 'Danavaipeta Main Rd',
    ward: 'Ward 14',
    distanceKm: 1.0,
    visitFee: 249,
    phone: '+91 98450 12891',
    isPoliceVerified: true,
    initials: 'SG',
    avatarUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80',
  },
  {
    id: 'art-3',
    name: 'Ariave Godfrey',
    trade: 'Carpenter',
    subTrade: 'Furniture & Woodwork',
    rating: 4.9,
    reviewsCount: 142,
    locality: 'Prakash Nagar',
    ward: 'Ward 21',
    distanceKm: 1.4,
    visitFee: 450,
    phone: '+91 98234 56711',
    isPoliceVerified: true,
    initials: 'AG',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
  },
  {
    id: 'art-4',
    name: 'Sunita Devi',
    trade: 'Deep Cleaning',
    subTrade: 'Domestic & Kitchen Help',
    rating: 4.8,
    reviewsCount: 79,
    locality: 'Kotipalli',
    ward: 'Ward 17',
    distanceKm: 2.1,
    visitFee: 350,
    phone: '+91 98456 78913',
    isPoliceVerified: true,
    initials: 'SD',
  },
  {
    id: 'art-5',
    name: 'Baljit Singh',
    trade: 'AC Service',
    subTrade: 'AC & Home Appliances',
    rating: 4.7,
    reviewsCount: 118,
    locality: 'Aryapuram',
    ward: 'Ward 9',
    distanceKm: 1.9,
    visitFee: 499,
    phone: '+91 98789 01216',
    isPoliceVerified: true,
    initials: 'BS',
  },
  {
    id: 'art-6',
    name: 'Vikram Rao',
    trade: 'Electrician',
    subTrade: 'Inverters & Heavy Wiring',
    rating: 4.7,
    reviewsCount: 88,
    locality: 'Danavaipeta Ward 14',
    ward: 'Ward 14',
    distanceKm: 0.9,
    visitFee: 350,
    phone: '+91 98901 23418',
    isPoliceVerified: true,
    initials: 'VR',
  },
];

export const INITIAL_JOBS: ServiceJob[] = [
  {
    id: 'job-1',
    customerName: 'Ananya Sharma',
    customerPhone: '+91 94401 23456',
    locality: 'Danavaipeta',
    ward: 'Ward 14',
    addressFull: 'Flat #402, Krishna Residency, Danavaipeta, Rajahmundry',
    gatePass: '#0402',
    trade: 'Electrician',
    title: 'Electrical Repair (Emergency MCB Trip & Inverter Setup)',
    description: 'Main MCB trips every 10 minutes when AC turns on. Need urgent inverter & wiring inspection with clamp multimeter.',
    slot: 'Tomorrow, 10:30 AM',
    budgetMin: 300,
    budgetMax: 500,
    isEmergency: true,
    distanceKm: 0.8,
    postedTimeAgo: '2 hrs ago',
    status: 'offers_received',
    photos: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80',
    ],
  },
  {
    id: 'job-2',
    customerName: 'K. Venkatesh',
    customerPhone: '+91 98440 98711',
    locality: 'Prakash Nagar',
    ward: 'Ward 21',
    addressFull: 'House #12-4, Near RTC Complex, Prakash Nagar, Rajahmundry',
    trade: 'Electrician',
    title: 'Ceiling Fan & Concealed LED Wiring',
    description: 'Living room ceiling fan regulator not responding and 2 false-ceiling LED warm lights flicker.',
    slot: 'Today, Preferred',
    budgetMin: 350,
    budgetMax: 350,
    isEmergency: false,
    distanceKm: 1.4,
    postedTimeAgo: '4 hrs ago',
    status: 'open',
    photos: [],
  },
  {
    id: 'job-3',
    customerName: 'Satyanarayana P.',
    customerPhone: '+91 99887 76655',
    locality: 'Danavaipeta',
    ward: 'Ward 14',
    addressFull: 'House #4-18, Danavaipeta Main Road, Rajahmundry',
    gatePass: '3829',
    trade: 'Plumber',
    title: 'Kitchen Sink Tap Leakage & RO Overhaul',
    description: 'Slow under-sink drainage and high TDS in RO filter output.',
    slot: 'Today, 4:00 PM',
    budgetMin: 249,
    budgetMax: 350,
    isEmergency: false,
    distanceKm: 0.5,
    postedTimeAgo: '5 hrs ago',
    status: 'assigned',
    assignedWorkerName: 'Suresh Gowda',
    assignedWorkerPhone: '+91 98450 12891',
    assignedFee: 249,
    photos: [],
  },
  {
    id: 'job-4',
    customerName: 'M. Ravi Teja',
    customerPhone: '+91 98234 56711',
    locality: 'Danavaipeta',
    ward: 'Ward 14',
    addressFull: 'Door #8-9-1, Danavaipeta Ward 14, Rajahmundry',
    trade: 'Carpenter',
    title: 'Wooden Door Alignment & Lock Repair',
    description: 'Teak main entrance door rubbing on bottom tiles and Godrej mortise latch stuck.',
    slot: 'Friday, 11:00 AM',
    budgetMin: 350,
    budgetMax: 450,
    isEmergency: false,
    distanceKm: 1.1,
    postedTimeAgo: '1 day ago',
    status: 'assigned',
    assignedWorkerName: 'Ariave Godfrey',
    assignedWorkerPhone: '+91 98234 56711',
    assignedFee: 450,
    photos: [],
  },
];

export const INITIAL_QUOTES: ServiceQuote[] = [
  {
    id: 'q-1',
    jobId: 'job-1',
    artisanName: 'Ramesh Kumar',
    trade: 'Master Electrician',
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 184,
    distanceKm: 0.6,
    quoteAmount: 299,
    note: 'I am at Danavaipeta junction with 32A Schneider breakers and digital clamp meter. Can diagnose & fix immediately.',
    isTopRated: true,
  },
  {
    id: 'q-2',
    jobId: 'job-1',
    artisanName: 'Vikram Rao',
    trade: 'Electrician',
    experienceYears: 6,
    rating: 4.7,
    reviewsCount: 88,
    distanceKm: 0.9,
    quoteAmount: 350,
    note: 'Available at 4:30 PM with digital multi-meter and wire continuity tester.',
    isTopRated: false,
  },
  {
    id: 'q-3',
    jobId: 'job-1',
    artisanName: 'Suresh Electricals',
    trade: 'Registered Workshop',
    experienceYears: 15,
    rating: 4.8,
    reviewsCount: 120,
    distanceKm: 1.2,
    quoteAmount: 400,
    note: 'Includes visit, neutral link check and 30 days RMC artisan guarantee.',
    isTopRated: false,
  },
];

export interface ChatMessage {
  id: string;
  sender: 'resident' | 'worker';
  senderName: string;
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  residentName: string;
  residentAddress: string;
  residentInitials: string;
  workerName: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'ananya',
    residentName: 'Ananya Sharma',
    residentAddress: 'Krishna Residency, Flat #402, Danavaipeta • Gate Pass #0402',
    residentInitials: 'AS',
    workerName: 'Ramesh Kumar',
    lastMessage: 'Hello Ramesh ji, can you arrive 15 minutes early for the MCB tripping issue?',
    lastTime: '10m ago',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: 'worker',
        senderName: 'Ramesh Kumar',
        text: 'Namaskaram Ananya garu! I reviewed your MCB trip photo. I carry spare 32A Schneider breakers and a clamp meter. Can I arrive tomorrow at 10:30 AM?',
        time: '09:12 AM',
      },
      {
        id: 'm2',
        sender: 'resident',
        senderName: 'Ananya Sharma',
        text: 'Yes please Ramesh garu. Our gate security is pre-cleared for flat #402.',
        time: '09:15 AM',
      },
      {
        id: 'm3',
        sender: 'resident',
        senderName: 'Ananya Sharma',
        text: 'Hello Ramesh ji, can you arrive 15 minutes early for the MCB tripping issue? Gate security is already informed.',
        time: '10m ago',
      },
    ],
  },
  {
    id: 'venkatesh',
    residentName: 'K. Venkatesh',
    residentAddress: 'Prakash Nagar, Near RTC Complex • Ward 21',
    residentInitials: 'KV',
    workerName: 'Ramesh Kumar',
    lastMessage: 'Regarding the ceiling fan and LED wiring slot tomorrow morning, is 11 AM confirmed?',
    lastTime: '1h ago',
    unreadCount: 0,
    messages: [
      {
        id: 'mv1',
        sender: 'resident',
        senderName: 'K. Venkatesh',
        text: 'Regarding the ceiling fan and LED wiring slot tomorrow morning, is 11 AM confirmed?',
        time: '1h ago',
      },
      {
        id: 'mv2',
        sender: 'worker',
        senderName: 'Ramesh Kumar',
        text: 'Yes Venkatesh garu, I will be there by 11:00 AM sharp with aluminum ladder and wiring tools.',
        time: '45m ago',
      },
    ],
  },
  {
    id: 'ratnam',
    residentName: 'S. Ratnam',
    residentAddress: 'Aryapuram, Devichowk Area • Ward 9',
    residentInitials: 'SR',
    workerName: 'Ramesh Kumar',
    lastMessage: 'Need quote for 16A water heater power point installation in bathroom.',
    lastTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'mr1',
        sender: 'resident',
        senderName: 'S. Ratnam',
        text: 'Need quote for 16A water heater power point installation in bathroom.',
        time: 'Yesterday',
      },
    ],
  },
];
