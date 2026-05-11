import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { mockBookings, revenueData, mockCustomers } from '../data/mockData';

export function Overview() {
  // Calculate metrics
  const today = new Date('2026-03-22').toISOString().split('T')[0];
  const todayBookings = mockBookings.filter(b => b.date === today && b.status === 'confirmed').length;
  
  const thisWeekStart = new Date('2026-03-17');
  const thisWeekEnd = new Date('2026-03-23');
  const weekBookings = mockBookings.filter(b => {
    const bookingDate = new Date(b.date);
    return bookingDate >= thisWeekStart && bookingDate <= thisWeekEnd;
  }).length;

  const monthBookings = mockBookings.filter(b => b.date.startsWith('2026-03')).length;

  const todayRevenue = mockBookings
    .filter(b => b.date === today && b.status === 'confirmed')
    .reduce((sum, b) => sum + b.amount, 0);

  const totalCourts = 4;
  const bookedCourts = 2;
  const occupancyRate = Math.round((bookedCourts / totalCourts) * 100);

  const newCustomers = mockCustomers.filter(c => {
    const joinedDate = new Date(c.joinedDate);
    return joinedDate >= new Date('2026-03-01');
  }).length;

  const stats = [
    {
      title: 'Today Bookings',
      value: todayBookings.toString(),
      subtitle: `${weekBookings} this week`,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Court Occupancy',
      value: `${occupancyRate}%`,
      subtitle: `${bookedCourts}/${totalCourts} courts`,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Daily Revenue',
      value: `$${todayRevenue}`,
      subtitle: '+12% from yesterday',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'New Customers',
      value: newCustomers.toString(),
      subtitle: 'This month',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to Tennis Finder Management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Court</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Time</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockBookings.slice(0, 6).map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{booking.customerName}</td>
                    <td className="py-3 px-4">Court {booking.courtNumber}</td>
                    <td className="py-3 px-4">{booking.date}</td>
                    <td className="py-3 px-4">{booking.timeSlot}</td>
                    <td className="py-3 px-4">
                      <span className={`
                        px-2 py-1 rounded-full text-xs
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''}
                        ${booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                        ${booking.status === 'completed' ? 'bg-blue-100 text-blue-700' : ''}
                      `}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">${booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
