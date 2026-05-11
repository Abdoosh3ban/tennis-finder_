export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  courtNumber: number;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  paymentMethod: 'cash' | 'online';
  amount: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: 'VIP' | 'Regular';
  totalBookings: number;
  totalSpent: number;
  joinedDate: string;
}

export interface Court {
  id: number;
  name: string;
  location: string;
  status: 'available' | 'booked' | 'maintenance';
  pricePerHour: number;
  maintenanceDate?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
  description: string;
  paymentMethod?: 'cash' | 'online';
}

// Mock Bookings Data
export const mockBookings: Booking[] = [
  {
    id: 'B001',
    customerName: 'John Smith',
    phone: '+1234567890',
    courtNumber: 1,
    date: '2026-03-22',
    timeSlot: '09:00 - 10:00',
    status: 'confirmed',
    paymentMethod: 'online',
    amount: 50
  },
  {
    id: 'B002',
    customerName: 'Sarah Johnson',
    phone: '+1234567891',
    courtNumber: 2,
    date: '2026-03-22',
    timeSlot: '10:00 - 11:00',
    status: 'confirmed',
    paymentMethod: 'cash',
    amount: 50
  },
  {
    id: 'B003',
    customerName: 'Michael Brown',
    phone: '+1234567892',
    courtNumber: 1,
    date: '2026-03-22',
    timeSlot: '14:00 - 15:00',
    status: 'confirmed',
    paymentMethod: 'online',
    amount: 50
  },
  {
    id: 'B004',
    customerName: 'Emily Davis',
    phone: '+1234567893',
    courtNumber: 3,
    date: '2026-03-22',
    timeSlot: '15:00 - 16:00',
    status: 'confirmed',
    paymentMethod: 'cash',
    amount: 60
  },
  {
    id: 'B005',
    customerName: 'David Wilson',
    phone: '+1234567894',
    courtNumber: 2,
    date: '2026-03-23',
    timeSlot: '09:00 - 10:00',
    status: 'confirmed',
    paymentMethod: 'online',
    amount: 50
  },
  {
    id: 'B006',
    customerName: 'Lisa Anderson',
    phone: '+1234567895',
    courtNumber: 1,
    date: '2026-03-23',
    timeSlot: '11:00 - 12:00',
    status: 'confirmed',
    paymentMethod: 'cash',
    amount: 50
  },
  {
    id: 'B007',
    customerName: 'Robert Taylor',
    phone: '+1234567896',
    courtNumber: 4,
    date: '2026-03-21',
    timeSlot: '16:00 - 17:00',
    status: 'completed',
    paymentMethod: 'online',
    amount: 70
  },
  {
    id: 'B008',
    customerName: 'Jennifer Martinez',
    phone: '+1234567897',
    courtNumber: 2,
    date: '2026-03-20',
    timeSlot: '10:00 - 11:00',
    status: 'completed',
    paymentMethod: 'cash',
    amount: 50
  }
];

// Mock Customers Data
export const mockCustomers: Customer[] = [
  {
    id: 'C001',
    name: 'John Smith',
    phone: '+1234567890',
    email: 'john.smith@email.com',
    category: 'VIP',
    totalBookings: 25,
    totalSpent: 1250,
    joinedDate: '2025-06-15'
  },
  {
    id: 'C002',
    name: 'Sarah Johnson',
    phone: '+1234567891',
    email: 'sarah.j@email.com',
    category: 'Regular',
    totalBookings: 12,
    totalSpent: 600,
    joinedDate: '2025-09-20'
  },
  {
    id: 'C003',
    name: 'Michael Brown',
    phone: '+1234567892',
    email: 'mbrown@email.com',
    category: 'VIP',
    totalBookings: 30,
    totalSpent: 1500,
    joinedDate: '2025-05-10'
  },
  {
    id: 'C004',
    name: 'Emily Davis',
    phone: '+1234567893',
    email: 'emily.d@email.com',
    category: 'Regular',
    totalBookings: 8,
    totalSpent: 480,
    joinedDate: '2025-11-05'
  },
  {
    id: 'C005',
    name: 'David Wilson',
    phone: '+1234567894',
    email: 'dwilson@email.com',
    category: 'VIP',
    totalBookings: 18,
    totalSpent: 900,
    joinedDate: '2025-07-22'
  },
  {
    id: 'C006',
    name: 'Lisa Anderson',
    phone: '+1234567895',
    email: 'lisa.a@email.com',
    category: 'Regular',
    totalBookings: 15,
    totalSpent: 750,
    joinedDate: '2025-08-14'
  }
];

// Mock Courts Data
export const mockCourts: Court[] = [
  {
    id: 1,
    name: 'Court 1 - Premium',
    location: 'Main Building - North Wing',
    status: 'booked',
    pricePerHour: 50
  },
  {
    id: 2,
    name: 'Court 2 - Standard',
    location: 'Main Building - South Wing',
    status: 'available',
    pricePerHour: 50
  },
  {
    id: 3,
    name: 'Court 3 - Standard',
    location: 'Outdoor Section - East',
    status: 'available',
    pricePerHour: 60
  },
  {
    id: 4,
    name: 'Court 4 - Premium',
    location: 'Indoor Arena - Center',
    status: 'maintenance',
    pricePerHour: 70,
    maintenanceDate: '2026-03-25'
  }
];

// Mock Transactions Data
export const mockTransactions: Transaction[] = [
  {
    id: 'T001',
    date: '2026-03-22',
    type: 'revenue',
    category: 'Court Booking',
    amount: 50,
    description: 'Booking B001 - Court 1',
    paymentMethod: 'online'
  },
  {
    id: 'T002',
    date: '2026-03-22',
    type: 'revenue',
    category: 'Court Booking',
    amount: 50,
    description: 'Booking B002 - Court 2',
    paymentMethod: 'cash'
  },
  {
    id: 'T003',
    date: '2026-03-22',
    type: 'expense',
    category: 'Maintenance',
    amount: 150,
    description: 'Court 4 - Net replacement'
  },
  {
    id: 'T004',
    date: '2026-03-22',
    type: 'expense',
    category: 'Utilities',
    amount: 80,
    description: 'Electricity bill - March'
  },
  {
    id: 'T005',
    date: '2026-03-21',
    type: 'revenue',
    category: 'Court Booking',
    amount: 70,
    description: 'Booking B007 - Court 4',
    paymentMethod: 'online'
  },
  {
    id: 'T006',
    date: '2026-03-21',
    type: 'expense',
    category: 'Staff',
    amount: 200,
    description: 'Daily staff wages'
  },
  {
    id: 'T007',
    date: '2026-03-20',
    type: 'revenue',
    category: 'Court Booking',
    amount: 50,
    description: 'Booking B008 - Court 2',
    paymentMethod: 'cash'
  }
];

// Revenue data for charts
export const revenueData = [
  { name: 'Mon', revenue: 450, bookings: 9 },
  { name: 'Tue', revenue: 380, bookings: 8 },
  { name: 'Wed', revenue: 520, bookings: 11 },
  { name: 'Thu', revenue: 490, bookings: 10 },
  { name: 'Fri', revenue: 650, bookings: 13 },
  { name: 'Sat', revenue: 820, bookings: 16 },
  { name: 'Sun', revenue: 740, bookings: 15 }
];

export const monthlyRevenueData = [
  { name: 'Jan', revenue: 12500 },
  { name: 'Feb', revenue: 14200 },
  { name: 'Mar', revenue: 8940 } // Current month (partial)
];