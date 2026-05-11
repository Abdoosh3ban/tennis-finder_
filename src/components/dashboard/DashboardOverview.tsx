import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  Users, 
  Trophy,
  Clock,
  ArrowRight,
  MapPin,
  ShoppingBag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardOverview() {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Court Bookings',
      value: '12',
      change: 'This Month',
      icon: Calendar,
      color: 'blue'
    },
    {
      label: 'Matches Played',
      value: '28',
      change: 'Total',
      icon: Trophy,
      color: 'green'
    },
    {
      label: 'Active Partners',
      value: '8',
      change: 'Connected',
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Hours Played',
      value: '45',
      change: 'This Month',
      icon: Clock,
      color: 'orange'
    }
  ];

  const upcomingBookings = [
    {
      id: 1,
      court: 'Maadi Tennis Academy',
      location: 'Maadi, Cairo',
      date: 'Today',
      time: '6:00 PM - 7:00 PM',
      type: 'Singles Match',
      partner: 'Sara Mohamed'
    },
    {
      id: 2,
      court: 'Cairo Tennis Club',
      location: 'Zamalek, Cairo',
      date: 'Tomorrow',
      time: '10:00 AM - 11:00 AM',
      type: 'Practice Session',
      partner: null
    },
    {
      id: 3,
      court: 'Heliopolis Tennis Club',
      location: 'Heliopolis, Cairo',
      date: 'Dec 7',
      time: '5:00 PM - 6:30 PM',
      type: 'Doubles Match',
      partner: 'Omar K. + 2 others'
    }
  ];

  const recentActivity = [
    { event: 'Booked court at Maadi Tennis Academy', time: '2 hours ago' },
    { event: 'Match request accepted by Sara Mohamed', time: '5 hours ago' },
    { event: 'Purchased Wilson Pro Staff RF97', time: '1 day ago' },
    { event: 'Joined Cairo Weekend Warriors group', time: '2 days ago' },
    { event: 'Completed match with Omar Khaled', time: '3 days ago' }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your tennis activity overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.change}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-900">Upcoming Bookings</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/bookings')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-4 border border-gray-200 rounded-lg hover:border-green-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{booking.court}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">{booking.date}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                  <span>•</span>
                  <span>{booking.type}</span>
                </div>
                {booking.partner && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">With {booking.partner}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => navigate('/courts')}>
            Book Another Court
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900 mb-1">{activity.event}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Card className="p-6 bg-gradient-to-br from-green-600 to-emerald-700 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/courts')}>
          <Calendar className="w-8 h-8 mb-3" />
          <h3 className="text-xl mb-2">Book a Court</h3>
          <p className="text-green-100 text-sm">Find and reserve courts near you</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/matchmaking')}>
          <Users className="w-8 h-8 mb-3" />
          <h3 className="text-xl mb-2">Find Partners</h3>
          <p className="text-blue-100 text-sm">Connect with players to match</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/marketplace')}>
          <ShoppingBag className="w-8 h-8 mb-3" />
          <h3 className="text-xl mb-2">Shop Equipment</h3>
          <p className="text-purple-100 text-sm">Browse tennis gear and apparel</p>
        </Card>
      </div>
    </div>
  );
}
