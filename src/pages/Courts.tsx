import { useState } from 'react';
import { 
  Grid3x3, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Wrench,
  Plus,
  Edit,
  MapPin
} from 'lucide-react';
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
import { mockCourts, mockBookings, type Court } from '../data/mockData';

export function Courts() {
  const [courts, setCourts] = useState<Court[]>(mockCourts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const availableCourts = courts.filter(c => c.status === 'available').length;
  const bookedCourts = courts.filter(c => c.status === 'booked').length;
  const maintenanceCourts = courts.filter(c => c.status === 'maintenance').length;

  const handleStatusChange = (courtId: number, newStatus: Court['status']) => {
    setCourts(courts.map(c => 
      c.id === courtId ? { ...c, status: newStatus } : c
    ));
  };

  const handlePriceUpdate = (courtId: number, newPrice: number) => {
    setCourts(courts.map(c => 
      c.id === courtId ? { ...c, pricePerHour: newPrice } : c
    ));
  };

  const handleEditCourt = (courtId: number, name: string, location: string) => {
    setCourts(courts.map(c => 
      c.id === courtId ? { ...c, name, location } : c
    ));
    setIsEditDialogOpen(false);
    setEditingCourt(null);
  };

  // Get today's bookings per court
  const today = new Date('2026-03-22').toISOString().split('T')[0];
  const todayBookings = mockBookings.filter(b => b.date === today && b.status === 'confirmed');

  const getCourtBookings = (courtNumber: number) => {
    return todayBookings.filter(b => b.courtNumber === courtNumber);
  };

  const getStatusIcon = (status: Court['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5" />;
      case 'booked':
        return <XCircle className="w-5 h-5" />;
      case 'maintenance':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Court['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'booked':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Court Management</h1>
          <p className="text-gray-600 mt-1">Manage courts, pricing, and maintenance</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Court
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Court</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newCourt: Court = {
                id: courts.length + 1,
                name: formData.get('name') as string,
                location: formData.get('location') as string,
                status: 'available',
                pricePerHour: parseInt(formData.get('price') as string)
              };
              setCourts([...courts, newCourt]);
              setIsAddDialogOpen(false);
            }}>
              <div>
                <Label htmlFor="name">Court Name</Label>
                <Input id="name" name="name" placeholder="e.g., Court 5 - Premium" required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="e.g., Main Building - West Wing" required />
              </div>
              <div>
                <Label htmlFor="price">Price per Hour ($)</Label>
                <Input id="price" name="price" type="number" placeholder="50" required />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Add Court
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Courts</p>
                <p className="text-2xl font-bold mt-1">{courts.length}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Grid3x3 className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold mt-1">{availableCourts}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Booked</p>
                <p className="text-2xl font-bold mt-1">{bookedCourts}</p>
              </div>
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold mt-1">{maintenanceCourts}</p>
              </div>
              <div className="bg-orange-50 text-orange-600 p-3 rounded-lg">
                <Wrench className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courts.map((court) => {
          const bookings = getCourtBookings(court.id);
          
          return (
            <Card key={court.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className={`border-b-4 ${getStatusColor(court.status)}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{court.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {court.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(court.status)}
                    <Badge className={getStatusColor(court.status)}>
                      {court.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Edit Court Name and Location */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Court Information</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCourt(court);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Info
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Name:</strong> {court.name}</p>
                    <p><strong>Location:</strong> {court.location}</p>
                    <p><strong>Court ID:</strong> #{court.id}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Price per Hour</p>
                      <p className="text-xl font-bold">${court.pricePerHour}</p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Price
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Pricing - {court.name}</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handlePriceUpdate(court.id, parseInt(formData.get('price') as string));
                      }}>
                        <div>
                          <Label htmlFor={`price-${court.id}`}>Price per Hour ($)</Label>
                          <Input 
                            id={`price-${court.id}`}
                            name="price" 
                            type="number" 
                            defaultValue={court.pricePerHour}
                            required 
                          />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                          Update Price
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Status Management */}
                <div>
                  <Label>Court Status</Label>
                  <Select 
                    value={court.status} 
                    onValueChange={(value) => handleStatusChange(court.id, value as Court['status'])}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Available
                        </div>
                      </SelectItem>
                      <SelectItem value="booked">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          Booked
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          Under Maintenance
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Maintenance Schedule */}
                {court.status === 'maintenance' && court.maintenanceDate && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="w-4 h-4 text-orange-600" />
                      <p className="font-medium text-orange-900">Maintenance Scheduled</p>
                    </div>
                    <p className="text-sm text-orange-700">Until: {court.maintenanceDate}</p>
                  </div>
                )}

                {/* Today's Bookings */}
                <div>
                  <p className="font-medium mb-2">Today's Bookings ({bookings.length})</p>
                  {bookings.length > 0 ? (
                    <div className="space-y-2">
                      {bookings.map(booking => (
                        <div key={booking.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                          <p className="font-medium">{booking.timeSlot}</p>
                          <p className="text-gray-600">{booking.customerName}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 py-4 text-center bg-gray-50 rounded-lg">
                      No bookings today
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Court Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Court Information</DialogTitle>
          </DialogHeader>
          {editingCourt && (
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleEditCourt(
                editingCourt.id,
                formData.get('name') as string,
                formData.get('location') as string
              );
            }}>
              <div>
                <Label htmlFor="edit-name">Court Name</Label>
                <Input 
                  id="edit-name"
                  name="name" 
                  defaultValue={editingCourt.name}
                  placeholder="e.g., Court 1 - Premium"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input 
                  id="edit-location"
                  name="location" 
                  defaultValue={editingCourt.location}
                  placeholder="e.g., Main Building - North Wing"
                  required 
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingCourt(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
