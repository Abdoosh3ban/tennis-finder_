import { useState } from 'react';
import { Users, Star, TrendingUp, Phone, Mail, Calendar, DollarSign, Plus, Edit, Trash2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { mockCustomers, mockBookings, type Customer, type Booking } from '../data/mockData';

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isAddBookingDialogOpen, setIsAddBookingDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || customer.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const vipCount = customers.filter(c => c.category === 'VIP').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgBookings = Math.round(customers.reduce((sum, c) => sum + c.totalBookings, 0) / customers.length);

  // Get customer bookings
  const getCustomerBookings = (customerName: string) => {
    return bookings.filter(b => b.customerName === customerName);
  };

  // Handle booking actions
  const handleAddBooking = (customerName: string, newBooking: Omit<Booking, 'id' | 'customerName' | 'phone'>) => {
    const customer = customers.find(c => c.name === customerName);
    if (!customer) return;

    const booking: Booking = {
      id: `B${String(bookings.length + 1).padStart(3, '0')}`,
      customerName: customer.name,
      phone: customer.phone,
      ...newBooking
    };
    setBookings([...bookings, booking]);
    setIsAddBookingDialogOpen(false);
  };

  const handleEditBooking = (bookingId: string, updates: Partial<Booking>) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, ...updates } : b
    ));
    setEditingBooking(null);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      ));
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== bookingId));
    }
  };

  const timeSlots = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
    '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
        <p className="text-gray-600 mt-1">Manage customer profiles and loyalty</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold mt-1">{customers.length}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP Customers</p>
                <p className="text-2xl font-bold mt-1">{vipCount}</p>
              </div>
              <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Bookings</p>
                <p className="text-2xl font-bold mt-1">{avgBookings}</p>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search customers by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="VIP">VIP Only</SelectItem>
                  <SelectItem value="Regular">Regular Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.id}</p>
                  </div>
                </div>
                <Badge variant={customer.category === 'VIP' ? 'default' : 'secondary'} className={customer.category === 'VIP' ? 'bg-yellow-500' : ''}>
                  {customer.category === 'VIP' && <Star className="w-3 h-3 mr-1" />}
                  {customer.category}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Joined: {customer.joinedDate}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Bookings</p>
                    <p className="text-xl font-bold text-green-600">{customer.totalBookings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Spent</p>
                    <p className="text-xl font-bold text-green-600">${customer.totalSpent}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setIsHistoryDialogOpen(true);
                  }}
                >
                  View Booking History
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setIsAddBookingDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No customers found</p>
          </CardContent>
        </Card>
      )}

      {/* Booking History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Booking History - {selectedCustomer?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Total Bookings</p>
                  <p className="text-lg font-bold">{getCustomerBookings(selectedCustomer.name).length}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Spent</p>
                  <p className="text-lg font-bold">${selectedCustomer.totalSpent}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <Badge className={selectedCustomer.category === 'VIP' ? 'bg-yellow-500' : ''}>
                    {selectedCustomer.category}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                {getCustomerBookings(selectedCustomer.name).map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">Booking #{booking.id}</p>
                        <span className={`
                          inline-block mt-1 px-2 py-1 rounded-full text-xs
                          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''}
                          ${booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                          ${booking.status === 'completed' ? 'bg-blue-100 text-blue-700' : ''}
                        `}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'confirmed' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingBooking(booking)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Date
                        </p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Time
                        </p>
                        <p className="font-medium">{booking.timeSlot}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Court</p>
                        <p className="font-medium">Court {booking.courtNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-medium">${booking.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {getCustomerBookings(selectedCustomer.name).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No booking history found
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Booking Dialog */}
      <Dialog open={isAddBookingDialogOpen} onOpenChange={setIsAddBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Booking - {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            if (!selectedCustomer) return;
            
            const formData = new FormData(e.currentTarget);
            handleAddBooking(selectedCustomer.name, {
              courtNumber: parseInt(formData.get('court') as string),
              date: formData.get('date') as string,
              timeSlot: formData.get('timeSlot') as string,
              status: 'confirmed',
              paymentMethod: formData.get('payment') as 'cash' | 'online',
              amount: parseInt(formData.get('amount') as string)
            });
          }}>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-medium">{selectedCustomer?.name}</p>
              <p className="text-sm text-gray-500">{selectedCustomer?.phone}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div>
                <Label htmlFor="court">Court</Label>
                <Select name="court" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Court 1</SelectItem>
                    <SelectItem value="2">Court 2</SelectItem>
                    <SelectItem value="3">Court 3</SelectItem>
                    <SelectItem value="4">Court 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Select name="timeSlot" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(slot => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payment">Payment</Label>
                <Select name="payment" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" name="amount" type="number" required />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Create Booking
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={!!editingBooking} onOpenChange={(open) => !open && setEditingBooking(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Booking - {editingBooking?.id}</DialogTitle>
          </DialogHeader>
          {editingBooking && (
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleEditBooking(editingBooking.id, {
                courtNumber: parseInt(formData.get('court') as string),
                date: formData.get('date') as string,
                timeSlot: formData.get('timeSlot') as string,
                paymentMethod: formData.get('payment') as 'cash' | 'online',
                amount: parseInt(formData.get('amount') as string)
              });
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-date">Date</Label>
                  <Input 
                    id="edit-date" 
                    name="date" 
                    type="date" 
                    defaultValue={editingBooking.date}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-court">Court</Label>
                  <Select name="court" defaultValue={editingBooking.courtNumber.toString()} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Court 1</SelectItem>
                      <SelectItem value="2">Court 2</SelectItem>
                      <SelectItem value="3">Court 3</SelectItem>
                      <SelectItem value="4">Court 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-timeSlot">Time Slot</Label>
                <Select name="timeSlot" defaultValue={editingBooking.timeSlot} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-payment">Payment</Label>
                  <Select name="payment" defaultValue={editingBooking.paymentMethod} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-amount">Amount ($)</Label>
                  <Input 
                    id="edit-amount" 
                    name="amount" 
                    type="number" 
                    defaultValue={editingBooking.amount}
                    required 
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Save Changes
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
