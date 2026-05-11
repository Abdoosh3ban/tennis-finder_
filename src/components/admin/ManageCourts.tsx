import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Star,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BackendCourt, BackendCourtPayload, fetchApi } from '../../lib/api';

const fallbackCourtImage =
  'https://images.unsplash.com/photo-1594112584631-517ac803fa03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const emptyForm = {
  name: '',
  address: '',
  surfaceType: '',
  pricePerHour: '',
  lat: '',
  lng: '',
  amenities: '',
};

export default function ManageCourts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurface, setSelectedSurface] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<BackendCourt | null>(null);
  const [courts, setCourts] = useState<BackendCourt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const loadCourts = async () => {
    try {
      setLoading(true);
      const data = await fetchApi<BackendCourt[]>('/api/courts');
      setCourts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourts();
  }, []);

  const filteredCourts = useMemo(() => {
    return courts.filter((court) => {
      const matchesSearch =
        court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSurface =
        selectedSurface === 'all' || court.surfaceType.toLowerCase().includes(selectedSurface.toLowerCase());

      return matchesSearch && matchesSurface;
    });
  }, [courts, searchQuery, selectedSurface]);

  const openCreateDialog = () => {
    setSelectedCourt(null);
    setFormData(emptyForm);
    setIsDialogOpen(true);
  };

  const openEditDialog = (court: BackendCourt) => {
    setSelectedCourt(court);
    setFormData({
      name: court.name,
      address: court.address,
      surfaceType: court.surfaceType,
      pricePerHour: String(court.pricePerHour),
      lat: String(court.lat),
      lng: String(court.lng),
      amenities: (court.amenities ?? []).join(', '),
    });
    setIsDialogOpen(true);
  };

  const buildPayload = (): BackendCourtPayload => ({
    name: formData.name,
    address: formData.address,
    surfaceType: formData.surfaceType,
    pricePerHour: Number(formData.pricePerHour),
    lat: Number(formData.lat),
    lng: Number(formData.lng),
    amenities: formData.amenities
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  });

  const handleSubmit = async () => {
    try {
      const payload = buildPayload();

      if (selectedCourt) {
        await fetchApi(`/api/courts/${selectedCourt.id}`, {
          method: 'PUT',
          auth: true,
          body: JSON.stringify(payload),
        });
        toast.success('Court updated from backend');
      } else {
        await fetchApi('/api/courts', {
          method: 'POST',
          auth: true,
          body: JSON.stringify(payload),
        });
        toast.success('Court created in backend');
      }

      setIsDialogOpen(false);
      setFormData(emptyForm);
      await loadCourts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save court');
    }
  };

  const handleDelete = async () => {
    if (!selectedCourt) return;

    try {
      await fetchApi(`/api/courts/${selectedCourt.id}`, {
        method: 'DELETE',
        auth: true,
      });
      toast.success('Court deleted from backend');
      setIsDeleteDialogOpen(false);
      setSelectedCourt(null);
      await loadCourts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete court');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Manage Courts</h1>
          <p className="text-[#4f6b52]">
            Court records are now read from the backend, and create, update, and delete actions call `/api/courts`.
          </p>
        </div>
        <Button onClick={openCreateDialog} className="bg-[#163E1B] hover:bg-[#1f5a24]">
          <Plus className="w-4 h-4 mr-2" />
          Add Court
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7b927d]" />
              <Input
                placeholder="Search courts by name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedSurface} onValueChange={setSelectedSurface}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Surface" />
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

      {error ? (
        <Card className="p-6 text-red-600">{error}</Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourts.map((court) => (
            <Card key={court.id} className="overflow-hidden">
              <div className="grid md:grid-cols-[180px,1fr]">
                <div className="h-full min-h-[180px]">
                  <ImageWithFallback src={fallbackCourtImage} alt={court.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{court.name}</h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-[#4f6b52]">
                        <MapPin className="w-4 h-4" />
                        <span>{court.address}</span>
                      </div>
                    </div>
                    <Badge className="bg-[#eaf6ea] text-[#163E1B]">{court.surfaceType}</Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(court.amenities ?? []).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[#4f6b52]">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>EGP {court.pricePerHour}/hour</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{court.rating?.toFixed(1) ?? 'New'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(court)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCourt(court);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCourt ? 'Edit Court' : 'Create Court'}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Court Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="surfaceType">Surface Type</Label>
              <Input id="surfaceType" value={formData.surfaceType} onChange={(e) => setFormData((current) => ({ ...current, surfaceType: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" value={formData.address} onChange={(e) => setFormData((current) => ({ ...current, address: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="pricePerHour">Price Per Hour</Label>
              <Input id="pricePerHour" type="number" value={formData.pricePerHour} onChange={(e) => setFormData((current) => ({ ...current, pricePerHour: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="amenities">Amenities</Label>
              <Input id="amenities" value={formData.amenities} onChange={(e) => setFormData((current) => ({ ...current, amenities: e.target.value }))} placeholder="Lighting, Parking, Locker Rooms" />
            </div>
            <div>
              <Label htmlFor="lat">Latitude</Label>
              <Input id="lat" type="number" value={formData.lat} onChange={(e) => setFormData((current) => ({ ...current, lat: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="lng">Longitude</Label>
              <Input id="lng" type="number" value={formData.lng} onChange={(e) => setFormData((current) => ({ ...current, lng: e.target.value }))} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-[#163E1B] hover:bg-[#1f5a24]">
              {selectedCourt ? 'Save Changes' : 'Create Court'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Court</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a real delete request to the backend for {selectedCourt?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
