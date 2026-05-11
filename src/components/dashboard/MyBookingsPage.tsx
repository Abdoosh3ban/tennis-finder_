import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MapPin, Clock, Calendar, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function MyBookingsPage() {
  const upcomingBookings = [
    {
      id: 1,
      court: 'Maadi Tennis Academy',
      location: 'Maadi, Cairo',
      date: 'Dec 5, 2025',
      time: '6:00 PM - 7:00 PM',
      price: 250,
      status: 'Confirmed'
    },
    {
      id: 2,
      court: 'Cairo Tennis Club',
      location: 'Zamalek, Cairo',
      date: 'Dec 6, 2025',
      time: '10:00 AM - 11:00 AM',
      price: 200,
      status: 'Confirmed'
    },
    {
      id: 3,
      court: 'Heliopolis Tennis Club',
      location: 'Heliopolis, Cairo',
      date: 'Dec 7, 2025',
      time: '5:00 PM - 6:30 PM',
      price: 330,
      status: 'Pending'
    }
  ];

  const pastBookings = [
    {
      id: 4,
      court: 'Nasr City Sports Center',
      location: 'Nasr City, Cairo',
      date: 'Dec 1, 2025',
      time: '7:00 PM - 8:00 PM',
      price: 180,
      status: 'Completed'
    },
    {
      id: 5,
      court: 'Maadi Tennis Academy',
      location: 'Maadi, Cairo',
      date: 'Nov 28, 2025',
      time: '6:00 PM - 7:00 PM',
      price: 250,
      status: 'Completed'
    }
  ];

  const handleCancelBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      toast.success('Booking cancelled successfully');
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your court reservations</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl text-gray-900">{booking.court}</h3>
                      <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-gray-900 mb-4">EGP {booking.price}</div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="p-6 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl text-gray-900">{booking.court}</h3>
                      <Badge variant="secondary">{booking.status}</Badge>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-gray-900 mb-4">EGP {booking.price}</div>
                    <Button variant="outline" size="sm">
                      Book Again
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
