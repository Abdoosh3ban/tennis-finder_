import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Search,
  Download,
  Calendar,
  MapPin,
  User,
  Clock,
  DollarSign,
  Eye,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { BackendBooking, BackendCourt, fetchApi } from '../../lib/api';

type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export default function ManageBookings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<BackendBooking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [bookings, setBookings] = useState<BackendBooking[]>([]);
  const [courts, setCourts] = useState<BackendCourt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const [bookingData, courtData] = await Promise.all([
          fetchApi<BackendBooking[]>('/api/bookings', { auth: true }),
          fetchApi<BackendCourt[]>('/api/courts'),
        ]);

        if (!active) return;
        setBookings(bookingData);
        setCourts(courtData);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const priceByCourtId = useMemo(() => new Map(courts.map((court) => [court.id, court.pricePerHour])), [courts]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const playerName = booking.player ? `${booking.player.firstName} ${booking.player.lastName}` : '';
      const courtName = booking.court?.name ?? '';
      const matchesSearch =
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, booking) => {
      const courtPrice = booking.court?.id ? priceByCourtId.get(booking.court.id) ?? 0 : 0;
      const start = new Date(booking.startTime).getTime();
      const end = new Date(booking.endTime).getTime();
      const hours = Math.max((end - start) / 3_600_000, 0);
      return sum + courtPrice * hours;
    }, 0);

    return {
      total: bookings.length,
      confirmed: bookings.filter((booking) => booking.status === 'CONFIRMED').length,
      completed: bookings.filter((booking) => booking.status === 'COMPLETED').length,
      pending: bookings.filter((booking) => booking.status === 'PENDING').length,
      totalRevenue,
    };
  }, [bookings, priceByCourtId]);

  const handleViewDetails = (booking: BackendBooking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const handleExportBookings = () => {
    toast.success('Backend bookings loaded. Export action can be added next.');
  };

  const handleStatusUpdate = async (bookingId: string, status: BookingStatus) => {
    try {
      const payload =
        status === 'CANCELLED'
          ? { status, cancellationReason: 'Cancelled from admin panel preview' }
          : { status };

      const updated = await fetchApi<BackendBooking>(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        auth: true,
        body: JSON.stringify(payload),
      });

      setBookings((current) => current.map((booking) => (booking.id === bookingId ? updated : booking)));
      toast.success(`Booking updated to ${status}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update booking');
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-[#eaf6ea] text-[#163E1B]';
      case 'COMPLETED':
        return 'bg-[#dff1df] text-[#1F5A24]';
      case 'CANCELLED':
        return 'bg-[#edf6e7] text-[#35533a]';
      case 'PENDING':
        return 'bg-[#f3f8e8] text-[#2E7D32]';
      default:
        return 'bg-[#f1f7f1] text-[#35533a]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Bookings from Backend</h1>
          <p className="text-[#4f6b52]">
            This screen now reads live booking data for the authenticated owner or test user from `/api/bookings`.
          </p>
        </div>
        <Button onClick={handleExportBookings} variant="outline" className="border-[#cfe0d0] text-[#163E1B] hover:bg-[#eaf6ea] hover:text-[#163E1B]">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-sm text-[#4f6b52] mb-1">Total Bookings</div>
          <div className="text-2xl font-semibold text-gray-900">{loading ? '...' : stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-[#4f6b52] mb-1">Confirmed</div>
          <div className="text-2xl font-semibold text-[#163E1B]">{loading ? '...' : stats.confirmed}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-[#4f6b52] mb-1">Completed</div>
          <div className="text-2xl font-semibold text-[#1F5A24]">{loading ? '...' : stats.completed}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-[#4f6b52] mb-1">Pending</div>
          <div className="text-2xl font-semibold text-[#2E7D32]">{loading ? '...' : stats.pending}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-[#4f6b52] mb-1">Estimated Revenue</div>
          <div className="text-2xl font-semibold text-[#163E1B]">EGP {Math.round(stats.totalRevenue).toLocaleString()}</div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7b927d]" />
              <Input
                placeholder="Search by booking ID, court, or player..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {error ? (
          <div className="p-6 text-sm text-red-600">
            {error}. Add `VITE_BACKEND_BEARER_TOKEN` or `VITE_TEST_USER_ID` to connect protected admin screens.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f5fbf5] border-b border-[#dbe6dc]">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Booking ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Court</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Player</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Schedule</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#eef4ec] hover:bg-[#f8fbf6]">
                    <td className="py-3 px-4 text-sm text-gray-900">{booking.id}</td>
                    <td className="py-3 px-4 text-sm text-[#4f6b52]">{booking.court?.name ?? 'Unknown court'}</td>
                    <td className="py-3 px-4 text-sm text-[#4f6b52]">
                      {booking.player ? `${booking.player.firstName} ${booking.player.lastName}` : 'Protected user'}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#4f6b52]">
                      {new Date(booking.startTime).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(booking)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}>
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}>
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Live data returned by the backend for this booking.</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4f6b52]" />
                <span>{new Date(selectedBooking.startTime).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4f6b52]" />
                <span>{new Date(selectedBooking.endTime).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4f6b52]" />
                <span>{selectedBooking.court?.name ?? 'Unknown court'}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#4f6b52]" />
                <span>
                  {selectedBooking.player
                    ? `${selectedBooking.player.firstName} ${selectedBooking.player.lastName} (${selectedBooking.player.email})`
                    : 'Protected user'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#4f6b52]" />
                <span>Status: {selectedBooking.status}</span>
              </div>
              {selectedBooking.cancellationReason && (
                <p className="text-[#4f6b52]">Cancellation reason: {selectedBooking.cancellationReason}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
