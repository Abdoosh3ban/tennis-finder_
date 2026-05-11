import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Users, 
  MapPin, 
  Calendar,
  Clock,
  Target,
  Send
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function MatchmakingPage() {
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');

  const players = [
    {
      id: 1,
      name: 'Ramy Tarek',
      skillLevel: 'Intermediate (3.5)',
      location: 'Maadi, Cairo',
      availability: 'Weekday Evenings',
      matchRate: 95,
      gamesPlayed: 124,
      preferredCourt: 'Maadi Tennis Academy',
      lookingFor: 'Singles & Doubles',
      initials: 'RT'
    },
    {
      id: 2,
      name: 'abdelrhman',
      skillLevel: 'Advanced (4.5)',
      location: 'Zamalek, Cairo',
      availability: 'Weekend Mornings',
      matchRate: 98,
      gamesPlayed: 89,
      preferredCourt: 'Cairo Tennis Club',
      lookingFor: 'Singles',
      initials: 'aa'
    },
    {
      id: 3,
      name: 'Omar Khaled',
      skillLevel: 'Beginner (2.0)',
      location: 'Nasr City, Cairo',
      availability: 'Anytime',
      matchRate: 92,
      gamesPlayed: 45,
      preferredCourt: 'Nasr City Sports Center',
      lookingFor: 'Practice Partner',
      initials: 'OK'
    },
    {
      id: 4,
      name: 'Layla Ibrahim',
      skillLevel: 'Intermediate (3.0)',
      location: 'Heliopolis, Cairo',
      availability: 'Weekend Afternoons',
      matchRate: 96,
      gamesPlayed: 67,
      preferredCourt: 'Heliopolis Tennis Club',
      lookingFor: 'Doubles',
      initials: 'LI'
    },
    {
      id: 5,
      name: 'Youssef Ali',
      skillLevel: 'Advanced (5.0)',
      location: 'New Cairo',
      availability: 'Weekday Mornings',
      matchRate: 99,
      gamesPlayed: 203,
      preferredCourt: 'Any',
      lookingFor: 'Competitive Singles',
      initials: 'YA'
    },
    {
      id: 6,
      name: 'Nour Sami',
      skillLevel: 'Intermediate (3.5)',
      location: 'Dokki, Giza',
      availability: 'Flexible',
      matchRate: 94,
      gamesPlayed: 78,
      preferredCourt: 'Any',
      lookingFor: 'Singles & Doubles',
      initials: 'NS'
    }
  ];

  const handleSendRequest = (playerName: string) => {
    toast.success(`Match request sent to ${playerName}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Find Your Perfect Tennis Partner
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with players of similar skill levels for matches, practice, or just fun
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skill Levels</SelectItem>
                  <SelectItem value="beginner">Beginner (1.0-2.5)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (3.0-4.0)</SelectItem>
                  <SelectItem value="advanced">Advanced (4.5-5.5)</SelectItem>
                  <SelectItem value="professional">Professional (6.0+)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="weekday-morning">Weekday Mornings</SelectItem>
                  <SelectItem value="weekday-evening">Weekday Evenings</SelectItem>
                  <SelectItem value="weekend-morning">Weekend Mornings</SelectItem>
                  <SelectItem value="weekend-afternoon">Weekend Afternoons</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-green-600 hover:bg-green-700">
                <Target className="w-4 h-4 mr-2" />
                Find Matches
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-1">AI-Powered Matchmaking</h3>
                <p className="text-blue-100">
                  Our ML.NET algorithm analyzes your skill level, location, and preferences to find the perfect partners
                </p>
              </div>
              <Button variant="secondary">
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Players List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl text-gray-900 mb-1">Available Players</h2>
            <p className="text-gray-600">{players.length} players match your criteria</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {players.map((player) => (
              <Card key={player.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-green-600 text-white text-xl">
                      {player.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{player.name}</h3>
                        <Badge variant="secondary">{player.skillLevel}</Badge>
                      </div>
                      <Badge className="bg-green-600">
                        {player.matchRate}% Match
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{player.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{player.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{player.gamesPlayed} games played</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Target className="w-4 h-4" />
                        <span className="text-sm">Looking for: {player.lookingFor}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleSendRequest(player.name)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Request
                      </Button>
                      <Button variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">How Matchmaking Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Set Your Preferences</h3>
              <p className="text-gray-600">
                Tell us your skill level, location, and when you like to play
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Get Smart Matches</h3>
              <p className="text-gray-600">
                Our AI recommends players who match your criteria and playing style
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Connect & Play</h3>
              <p className="text-gray-600">
                Send requests, book a court, and enjoy your match together
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
