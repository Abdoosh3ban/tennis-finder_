import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Calendar,
  DollarSign,
  Filter,
  Plus,
  Search,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface Booking {
  id: string;
  courtId: number;
  startTime: number;
  endTime: number;
  playerName: string;
  type: 'private' | 'tournament' | 'member' | 'hold' | 'maintenance';
  status: 'confirmed' | 'pending' | 'cancelled';
  cost?: number;
}

const courts = [
  { id: 1, name: 'Grass Prime' },
  { id: 2, name: 'Clay Elite' },
  { id: 3, name: 'Hard Pro' },
  { id: 4, name: 'Indoor Ace' },
];

const timeSlots = Array.from({ length: 10 }, (_, i) => 8 + i);

export function CourtAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      courtId: 1,
      startTime: 8,
      endTime: 10,
      playerName: 'S. Williams',
      type: 'private',
      status: 'confirmed',
      cost: 90,
    },
    {
      id: '2',
      courtId: 2,
      startTime: 9,
      endTime: 11,
      playerName: 'R. Federer',
      type: 'tournament',
      status: 'confirmed',
      cost: 100,
    },
    {
      id: '3',
      courtId: 3,
      startTime: 10,
      endTime: 12,
      playerName: 'C. Gauff',
      type: 'member',
      status: 'confirmed',
      cost: 80,
    },
    {
      id: '4',
      courtId: 1,
      startTime: 13,
      endTime: 14,
      playerName: 'M. Djokovic (Hold)',
      type: 'hold',
      status: 'pending',
    },
    {
      id: '5',
      courtId: 2,
      startTime: 12,
      endTime: 17,
      playerName: 'RESURFACING',
      type: 'maintenance',
      status: 'confirmed',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    playerName: '',
    date: '2026-10-16',
    courtId: 1,
    startTime: 9,
    duration: 60,
    type: 'private' as 'private' | 'tournament',
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) =>
        booking.playerName.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [bookings, searchQuery],
  );

  const handleNewBooking = () => {
    setEditingBooking(null);
    setFormData({
      playerName: '',
      date: '2026-10-16',
      courtId: 1,
      startTime: 9,
      duration: 60,
      type: 'private',
    });
    setIsPanelOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({
      playerName: booking.playerName,
      date: '2026-10-16',
      courtId: booking.courtId,
      startTime: booking.startTime,
      duration: (booking.endTime - booking.startTime) * 60,
      type: booking.type === 'tournament' ? 'tournament' : 'private',
    });
    setIsPanelOpen(true);
  };

  const handleConfirmBooking = () => {
    const cost = formData.duration === 60 ? 45 : formData.duration === 120 ? 85 : 120;
    const nextBooking: Booking = {
      id: editingBooking?.id || `B${Date.now()}`,
      courtId: formData.courtId,
      startTime: formData.startTime,
      endTime: formData.startTime + Math.floor(formData.duration / 60),
      playerName: formData.playerName,
      type: formData.type,
      status: 'confirmed',
      cost,
    };

    if (editingBooking) {
      setBookings(bookings.map((booking) => (booking.id === editingBooking.id ? nextBooking : booking)));
    } else {
      setBookings([...bookings, nextBooking]);
    }

    setIsPanelOpen(false);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter((booking) => booking.id !== id));
      setIsPanelOpen(false);
    }
  };

  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    if (hours < 8 || hours >= 17) return null;
    return ((hours - 8) * 60 + minutes) / 60;
  };

  const getBookingTypeLabel = (type: Booking['type']) => {
    switch (type) {
      case 'private':
        return 'PRIVATE LESSON';
      case 'tournament':
        return 'TOURNAMENT PRACTICE';
      case 'member':
        return 'CLUB MEMBER';
      case 'hold':
        return 'ON HOLD';
      default:
        return '';
    }
  };

  const getBookingColor = (type: Booking['type']) => {
    switch (type) {
      case 'maintenance':
        return 'bg-[#f4f8ef] border-[#d7e6bf] text-[#35533a]';
      case 'hold':
        return 'bg-[#f5f8f2] border-dashed border-[#cfe0d0] text-[#4f6b52]';
      default:
        return 'bg-[#163E1B] border-[#93c86a]/25 text-white hover:border-[#9CCC65]/50';
    }
  };

  const currentTimePos = getCurrentTimePosition();
  const estimatedCost = formData.duration === 60 ? 45 : formData.duration === 120 ? 85 : 120;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#f8fbf6] via-white to-[#eef6ea] shadow-[0_30px_80px_rgba(22,62,27,0.08)]">
      <div className="grid min-h-[820px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <div className="sticky top-0 z-10 rounded-tl-3xl border-b border-[#e3ece0] bg-white px-6 py-5 xl:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b927d]" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search bookings or players..."
                  className="h-12 rounded-2xl border-[#dbe6dc] bg-[#fbfdf9] pl-10 text-[#27482d] placeholder:text-[#7b927d] focus-visible:ring-[#2E7D32]"
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="relative rounded-full p-2 text-[#6d866f] transition-colors hover:text-[#163E1B]">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#9CCC65]" />
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#9CCC65] to-[#2E7D32] text-sm font-bold text-white">
                  JD
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-6 xl:p-8">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#2E7D32]">Management Hub</p>
              <h2 className="text-4xl font-bold tracking-tight text-[#163E1B]">Court Schedule</h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#dbe6dc] bg-white px-4 py-3 shadow-sm">
                <Calendar className="h-4 w-4 text-[#2E7D32]" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[#7b927d]">Select Date</div>
                  <div className="text-sm font-medium text-[#163E1B]">Oct 14 - Oct 20</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#dbe6dc] bg-white px-4 py-3 shadow-sm">
                <Users className="h-4 w-4 text-[#2E7D32]" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[#7b927d]">Court Selection</div>
                  <div className="text-sm font-medium text-[#163E1B]">All Courts (4)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#dbe6dc] bg-white px-4 py-3 shadow-sm">
                <Filter className="h-4 w-4 text-[#2E7D32]" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[#7b927d]">Status Filter</div>
                  <div className="text-sm font-medium text-[#163E1B]">Confirmed</div>
                </div>
              </div>

              <Button
                onClick={handleNewBooking}
                className="ml-auto rounded-2xl bg-[#163E1B] px-6 text-sm font-bold text-white hover:bg-[#1F5A24]"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </div>

            <Card className="overflow-hidden rounded-[28px] border-[#dbe6dc] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <div className="min-w-[820px]">
                  <div className="grid grid-cols-5 border-b border-[#e3ece0] bg-[#fbfdf9]">
                    <div className="border-r border-[#e3ece0] p-4">
                      <div className="text-xs uppercase tracking-[0.28em] text-[#7b927d]">Time</div>
                    </div>
                    {courts.map((court) => (
                      <div key={court.id} className="border-r border-[#e3ece0] p-4 last:border-r-0">
                        <div className="font-bold text-[#163E1B]">Court {court.id}</div>
                        <div className="mt-1 text-xs text-[#6d866f]">{court.name}</div>
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    {timeSlots.map((hour) => (
                      <div key={hour} className="grid grid-cols-5 border-b border-[#eef4ec] last:border-b-0" style={{ height: '88px' }}>
                        <div className="flex items-start border-r border-[#e3ece0] bg-[#fbfdf9] p-4">
                          <div className="text-sm font-medium text-[#6d866f]">{String(hour).padStart(2, '0')}:00</div>
                        </div>
                        {courts.map((court) => (
                          <div key={court.id} className="border-r border-[#eef4ec] bg-white/90 last:border-r-0" />
                        ))}
                      </div>
                    ))}

                    {filteredBookings.map((booking) => {
                      const top = (booking.startTime - 8) * 88;
                      const height = (booking.endTime - booking.startTime) * 88;
                      const left = `${booking.courtId * 20}%`;

                      return (
                        <div
                          key={booking.id}
                          onClick={() => booking.type !== 'maintenance' && handleEditBooking(booking)}
                          className={`absolute rounded-xl border-2 p-3 transition-all ${getBookingColor(booking.type)} ${
                            booking.type !== 'maintenance' ? 'cursor-pointer' : ''
                          }`}
                          style={{
                            top: `${top + 4}px`,
                            left,
                            width: '20%',
                            height: `${height - 8}px`,
                          }}
                        >
                          {booking.type === 'maintenance' ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                              <Wrench className="mb-2 h-6 w-6 text-[#35533a]" />
                              <div className="text-sm font-bold text-[#163E1B]">{booking.playerName}</div>
                              <div className="mt-1 text-xs text-[#6d866f]">UNAVAILABLE UNTIL 17:00</div>
                            </div>
                          ) : (
                            <>
                              <div className="text-sm font-bold">{booking.playerName}</div>
                              {booking.type !== 'hold' ? (
                                <div className="mt-2 inline-block rounded-full bg-[#9CCC65]/18 px-2 py-1 text-[10px] font-bold text-[#9CCC65]">
                                  {getBookingTypeLabel(booking.type)}
                                </div>
                              ) : null}
                              <div className="mt-3 text-xs text-white/82">
                                {String(booking.startTime).padStart(2, '0')}:00 - {String(booking.endTime).padStart(2, '0')}:00
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}

                    {currentTimePos !== null ? (
                      <div
                        className="absolute left-0 right-0 z-20 h-0.5 bg-green-500"
                        style={{
                          top: `${currentTimePos * 88}px`,
                        }}
                      >
                        <div className="absolute -top-3 left-0 rounded-r bg-[#2E7D32] px-2 py-1 text-[10px] font-bold text-white">
                          LIVE
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {isPanelOpen ? (
          <aside className="border-l border-[#e3ece0] bg-white shadow-[-20px_0_40px_rgba(22,62,27,0.04)]">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#163E1B]">
                  {editingBooking ? 'Edit Booking' : 'New Booking'}
                </h3>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="text-[#6d866f] transition-colors hover:text-[#163E1B]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="mb-2 text-xs uppercase tracking-[0.28em] text-[#6d866f]">Customer Name</Label>
                  <Input
                    value={formData.playerName}
                    onChange={(event) => setFormData({ ...formData, playerName: event.target.value })}
                    placeholder="Search or enter name"
                    className="h-12 rounded-2xl border-[#dbe6dc] text-[#163E1B]"
                  />
                </div>

                <div>
                  <Label className="mb-2 text-xs uppercase tracking-[0.28em] text-[#6d866f]">Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(event) => setFormData({ ...formData, date: event.target.value })}
                    className="h-12 rounded-2xl border-[#dbe6dc] text-[#163E1B]"
                  />
                </div>

                <div>
                  <Label className="mb-2 text-xs uppercase tracking-[0.28em] text-[#6d866f]">Court</Label>
                  <Select
                    value={formData.courtId.toString()}
                    onValueChange={(value) => setFormData({ ...formData, courtId: parseInt(value, 10) })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl border-[#dbe6dc] text-[#163E1B]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {courts.map((court) => (
                        <SelectItem key={court.id} value={court.id.toString()}>
                          Court {court.id} - {court.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-xs uppercase tracking-[0.28em] text-[#6d866f]">Start Time</Label>
                  <Select
                    value={formData.startTime.toString()}
                    onValueChange={(value) => setFormData({ ...formData, startTime: parseInt(value, 10) })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl border-[#dbe6dc] text-[#163E1B]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {String(hour).padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-xs uppercase tracking-[0.28em] text-[#6d866f]">Duration</Label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value, 10) })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl border-[#dbe6dc] text-[#163E1B]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 Minutes</SelectItem>
                      <SelectItem value="120">120 Minutes</SelectItem>
                      <SelectItem value="180">180 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-xs uppercase tracking-[0.28em] text-[#6d866f]">Booking Type</Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'private' })}
                      className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
                        formData.type === 'private'
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#f5f8f2] text-[#4f6b52] hover:bg-[#edf4ea]'
                      }`}
                    >
                      PRIVATE
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'tournament' })}
                      className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
                        formData.type === 'tournament'
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#f5f8f2] text-[#4f6b52] hover:bg-[#edf4ea]'
                      }`}
                    >
                      TOURNAMENT
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#d7e6bf] bg-[#f6fbef] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#4f6b52]">
                      <DollarSign className="h-4 w-4 text-[#2E7D32]" />
                      <span className="text-xs uppercase tracking-[0.28em]">Estimated Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-[#163E1B]">${estimatedCost}.00</div>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={!formData.playerName}
                  className="w-full rounded-2xl bg-[#98a894] py-3 font-bold text-white hover:bg-[#84967f] disabled:opacity-70"
                >
                  Confirm Reservation
                </Button>

                {editingBooking ? (
                  <Button
                    onClick={() => handleDeleteBooking(editingBooking.id)}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Delete Booking
                  </Button>
                ) : null}
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
