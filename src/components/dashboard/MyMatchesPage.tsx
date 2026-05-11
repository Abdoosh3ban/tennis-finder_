import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MapPin, Calendar, Trophy, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function MyMatchesPage() {
  const activeMatches = [
    {
      id: 1,
      player: 'Sara Mohamed',
      initials: 'SM',
      skillLevel: 'Advanced (4.5)',
      location: 'Zamalek, Cairo',
      scheduledDate: 'Tomorrow, 10:00 AM',
      court: 'Cairo Tennis Club',
      type: 'Singles',
      status: 'Confirmed'
    },
    {
      id: 2,
      player: 'Omar Khaled',
      initials: 'OK',
      skillLevel: 'Intermediate (3.5)',
      location: 'Heliopolis, Cairo',
      scheduledDate: 'Dec 7, 5:00 PM',
      court: 'Heliopolis Tennis Club',
      type: 'Doubles',
      status: 'Pending'
    }
  ];

  const matchHistory = [
    {
      id: 3,
      player: 'Layla Ibrahim',
      initials: 'LI',
      skillLevel: 'Intermediate (3.0)',
      date: 'Dec 1, 2025',
      result: 'Won 6-4, 6-2',
      type: 'Singles'
    },
    {
      id: 4,
      player: 'Youssef Ali',
      initials: 'YA',
      skillLevel: 'Advanced (5.0)',
      date: 'Nov 28, 2025',
      result: 'Lost 3-6, 4-6',
      type: 'Singles'
    },
    {
      id: 5,
      player: 'Nour Sami',
      initials: 'NS',
      skillLevel: 'Intermediate (3.5)',
      date: 'Nov 25, 2025',
      result: 'Won 7-5, 6-3',
      type: 'Doubles'
    }
  ];

  const handleMessage = (playerName: string) => {
    toast.success(`Opening chat with ${playerName}`);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">My Matches</h1>
        <p className="text-gray-600">View upcoming matches and your match history</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Matches</TabsTrigger>
          <TabsTrigger value="history">Match History</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-4">
            {activeMatches.map((match) => (
              <Card key={match.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-green-600 text-white text-xl">
                      {match.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{match.player}</h3>
                        <Badge variant="secondary">{match.skillLevel}</Badge>
                      </div>
                      <Badge variant={match.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {match.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{match.court}, {match.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{match.scheduledDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        <span>{match.type} Match</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => handleMessage(match.player)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
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
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {matchHistory.map((match) => (
              <Card key={match.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-xl">
                      {match.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{match.player}</h3>
                        <Badge variant="secondary">{match.skillLevel}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-600">{match.date}</div>
                        <div className={`${match.result.startsWith('Won') ? 'text-green-600' : 'text-red-600'}`}>
                          {match.result}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Trophy className="w-4 h-4" />
                      <span>{match.type} Match</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Stats Card */}
      <Card className="p-6 mt-8 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <h3 className="text-xl mb-4">Your Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-3xl mb-1">28</div>
            <div className="text-green-100 text-sm">Total Matches</div>
          </div>
          <div>
            <div className="text-3xl mb-1">18</div>
            <div className="text-green-100 text-sm">Wins</div>
          </div>
          <div>
            <div className="text-3xl mb-1">64%</div>
            <div className="text-green-100 text-sm">Win Rate</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
