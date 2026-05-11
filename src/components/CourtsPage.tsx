import { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackendCourt, fetchApi } from '../lib/api';
import {
  MapPin,
  Search,
  Star,
  Clock,
  DollarSign,
  Calendar,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const fallbackCourtImage =
  'https://images.unsplash.com/photo-1594112584631-517ac803fa03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

export default function CourtsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSurface, setSelectedSurface] = useState('all');
  const [courts, setCourts] = useState<BackendCourt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadCourts = async () => {
      try {
        setLoading(true);
        const data = await fetchApi<BackendCourt[]>('/api/courts');

        if (!active) {
          return;
        }

        setCourts(data);
        setError(null);
      } catch (err) {
        if (!active) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Failed to load courts');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCourts();

    return () => {
      active = false;
    };
  }, []);

  const filteredCourts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return courts.filter((court) => {
      const matchesQuery =
        !normalizedQuery ||
        court.name.toLowerCase().includes(normalizedQuery) ||
        court.address.toLowerCase().includes(normalizedQuery);

      const matchesCity =
        selectedCity === 'all' || court.address.toLowerCase().includes(selectedCity.toLowerCase());

      const matchesSurface =
        selectedSurface === 'all' ||
        court.surfaceType.toLowerCase().includes(selectedSurface.toLowerCase());

      return matchesQuery && matchesCity && matchesSurface;
    });
  }, [courts, searchQuery, selectedCity, selectedSurface]);

  const handleBookCourt = (courtName: string) => {
    toast.info(`Backend connected for ${courtName}. Booking still needs Clerk-authenticated login.`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Find Tennis Courts Near You
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse live court records from the Tennis Finder backend and explore real pricing and court details.
            </p>
          </div>

          <Card className="p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search courts by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="cairo">Cairo</SelectItem>
                  <SelectItem value="alexandria">Alexandria</SelectItem>
                  <SelectItem value="giza">Giza</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSurface} onValueChange={setSelectedSurface}>
                <SelectTrigger>
                  <SelectValue placeholder="Surface Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Surfaces</SelectItem>
                  <SelectItem value="hard">Hard Court</SelectItem>
                  <SelectItem value="clay">Clay Court</SelectItem>
                  <SelectItem value="grass">Grass Court</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">Available Courts</h2>
              <p className="text-gray-600">
                {loading ? 'Loading courts...' : `${filteredCourts.length} courts found`}
              </p>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {error ? (
            <Card className="p-6 text-center text-red-600">{error}</Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourts.map((court, index) => (
                <Card key={court.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={fallbackCourtImage}
                      alt={court.name}
                      className="w-full h-full object-cover"
                    />
                    {index < 3 && (
                      <Badge className="absolute top-3 right-3 bg-green-600">
                        Featured
                      </Badge>
                    )}
                    <Badge className="absolute bottom-3 left-3 bg-white text-gray-900">
                      {court.surfaceType}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl text-gray-900">{court.name}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{court.address}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{court.rating?.toFixed(1) ?? 'New'}</span>
                        <span className="text-sm text-gray-500">
                          ({court.rating ? 'Live rating' : 'No reviews yet'})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Check live slots after login</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {(court.amenities ?? []).map((amenity, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-2xl text-gray-900">{court.pricePerHour}</span>
                        <span className="text-sm text-gray-600">/hour</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleBookCourt(court.name)}
                      >
                        Book Now
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">
            Can&apos;t Find the Perfect Court?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Use the real backend court catalog now, then unlock booking once Clerk authentication is connected.
          </p>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Calendar className="w-5 h-5 mr-2" />
            Get AI Recommendations
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
