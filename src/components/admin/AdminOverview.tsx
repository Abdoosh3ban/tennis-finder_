import { useEffect, useMemo, useState } from 'react';
import { Card } from '../ui/card';
import {
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Activity,
} from 'lucide-react';
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
  Legend,
} from 'recharts';
import { BackendBooking, BackendCourt, fetchApi } from '../../lib/api';

type DailyChartRow = {
  name: string;
  bookings: number;
  revenue: number;
};

export default function AdminOverview() {
  const [courts, setCourts] = useState<BackendCourt[]>([]);
  const [bookings, setBookings] = useState<BackendBooking[]>([]);
  const [courtsError, setCourtsError] = useState<string | null>(null);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        setLoading(true);

        const courtsPromise = fetchApi<BackendCourt[]>('/api/courts');
        const bookingsPromise = fetchApi<BackendBooking[]>('/api/bookings', { auth: true });

        const [courtsResult, bookingsResult] = await Promise.allSettled([courtsPromise, bookingsPromise]);

        if (!active) {
          return;
        }

        if (courtsResult.status === 'fulfilled') {
          setCourts(courtsResult.value);
          setCourtsError(null);
        } else {
          setCourtsError(courtsResult.reason instanceof Error ? courtsResult.reason.message : 'Failed to load courts');
        }

        if (bookingsResult.status === 'fulfilled') {
          setBookings(bookingsResult.value);
          setBookingsError(null);
        } else {
          setBookingsError(
            bookingsResult.reason instanceof Error
              ? bookingsResult.reason.message
              : 'Failed to load bookings',
          );
        }
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

  const priceByCourtId = useMemo(() => {
    return new Map(courts.map((court) => [court.id, court.pricePerHour]));
  }, [courts]);

  const bookingRows = useMemo(() => {
    return bookings.map((booking) => {
      const start = new Date(booking.startTime);
      const end = new Date(booking.endTime);
      const durationHours = Math.max((end.getTime() - start.getTime()) / 3_600_000, 0);
      const amount = (booking.court?.id ? priceByCourtId.get(booking.court.id) ?? 0 : 0) * durationHours;

      return {
        ...booking,
        start,
        end,
        amount,
        dayLabel: start.toLocaleDateString('en-US', { weekday: 'short' }),
        timeLabel: start.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
      };
    });
  }, [bookings, priceByCourtId]);

  const chartData = useMemo<DailyChartRow[]>(() => {
    const grouped = new Map<string, DailyChartRow>();

    bookingRows.forEach((booking) => {
      const current = grouped.get(booking.dayLabel) ?? {
        name: booking.dayLabel,
        bookings: 0,
        revenue: 0,
      };

      current.bookings += 1;
      if (booking.status === 'CONFIRMED' || booking.status === 'COMPLETED') {
        current.revenue += booking.amount;
      }

      grouped.set(booking.dayLabel, current);
    });

    return Array.from(grouped.values());
  }, [bookingRows]);

  const stats = useMemo(() => {
    const confirmedOrCompleted = bookingRows.filter(
      (booking) => booking.status === 'CONFIRMED' || booking.status === 'COMPLETED',
    );

    const totalRevenue = confirmedOrCompleted.reduce((sum, booking) => sum + booking.amount, 0);

    return [
      {
        title: 'Live Courts',
        value: String(courts.length),
        change: courtsError ? courtsError : 'Loaded from /api/courts',
        icon: MapPin,
        color: 'bg-[#163E1B]',
      },
      {
        title: 'Linked Bookings',
        value: String(bookings.length),
        change: bookingsError ? bookingsError : 'Loaded from /api/bookings',
        icon: Calendar,
        color: 'bg-[#2E7D32]',
      },
      {
        title: 'Estimated Revenue',
        value: `EGP ${Math.round(totalRevenue).toLocaleString()}`,
        change: 'Calculated from booking duration x court price',
        icon: DollarSign,
        color: 'bg-[#1F5A24]',
      },
      {
        title: 'Protected API',
        value: bookingsError ? 'Needs Auth' : 'Connected',
        change: bookingsError ? 'Add Clerk token or VITE_TEST_USER_ID' : 'Backend auth bridge ready',
        icon: ShieldCheck,
        color: 'bg-[#9CCC65]',
      },
    ];
  }, [courts.length, bookings.length, bookingsError, courtsError, bookingRows]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-[#4f6b52]">Backend-linked overview for courts and protected booking activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#4f6b52] mb-1">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mb-2">{loading ? '...' : stat.value}</p>
                  <p className="text-sm text-[#2E7D32] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bookings and Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="bookings"
                stroke="#2E7D32"
                strokeWidth={2}
                name="Bookings"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#163E1B"
                strokeWidth={2}
                name="Revenue (EGP)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Court Pricing Snapshot</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courts.slice(0, 6).map((court) => ({ court: court.name, price: court.pricePerHour }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="court" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="price" fill="#2E7D32" name="Price / hour" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>

        {bookingsError ? (
          <p className="text-sm text-[#4f6b52]">
            Booking data could not be loaded yet. Set `VITE_BACKEND_BEARER_TOKEN` for Clerk auth or `VITE_TEST_USER_ID` for backend dev mode.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Booking ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Court</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Player</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Schedule</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4f6b52]">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingRows.slice(0, 6).map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-[#f5fbf5]">
                    <td className="py-3 px-4 text-sm text-gray-900">{booking.id}</td>
                    <td className="py-3 px-4 text-sm text-[#4f6b52]">{booking.court?.name ?? 'Unknown court'}</td>
                    <td className="py-3 px-4 text-sm text-[#4f6b52]">
                      {booking.player ? `${booking.player.firstName} ${booking.player.lastName}` : 'Protected user'}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#4f6b52]">{booking.timeLabel}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">EGP {Math.round(booking.amount)}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eaf6ea] text-[#163E1B]">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
