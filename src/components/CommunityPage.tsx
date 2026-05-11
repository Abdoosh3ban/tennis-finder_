import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { 
  MessageCircle, 
  Heart,
  Share2,
  Trophy,
  Users,
  TrendingUp,
  Plus
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function CommunityPage() {
  const [newPost, setNewPost] = useState('');

  const posts = [
    {
      id: 1,
      author: 'Ahmed Hassan',
      initials: 'AH',
      timeAgo: '2 hours ago',
      content: 'Just finished an amazing doubles match at Maadi Tennis Academy! Looking for more players to join our weekend group. We play every Saturday morning. Who\'s in? 🎾',
      likes: 24,
      comments: 8,
      category: 'Match Report'
    },
    {
      id: 2,
      author: 'Sara Mohamed',
      initials: 'SM',
      timeAgo: '5 hours ago',
      content: 'Quick tip: When playing on clay courts, remember to slide into your shots! It helps with balance and gives you better court coverage. Game changer for me! 💪',
      likes: 45,
      comments: 12,
      category: 'Tips & Tricks'
    },
    {
      id: 3,
      author: 'Omar Khaled',
      initials: 'OK',
      timeAgo: '1 day ago',
      content: 'Organizing a beginner-friendly tournament next month at Nasr City Sports Center. Open to all skill levels 2.0-3.0. Registration fee: 200 EGP. Limited spots available!',
      likes: 67,
      comments: 23,
      category: 'Tournament',
      isPinned: true
    },
    {
      id: 4,
      author: 'Layla Ibrahim',
      initials: 'LI',
      timeAgo: '1 day ago',
      content: 'Does anyone have recommendations for a good tennis coach in Heliopolis? Looking to improve my serve technique. Thanks in advance! 🙏',
      likes: 18,
      comments: 15,
      category: 'Question'
    },
    {
      id: 5,
      author: 'Youssef Ali',
      initials: 'YA',
      timeAgo: '2 days ago',
      content: 'Finally upgraded to the Wilson Pro Staff RF97! The control is incredible. Has anyone else tried it? Would love to hear your thoughts.',
      likes: 34,
      comments: 19,
      category: 'Equipment'
    }
  ];

  const groups = [
    {
      id: 1,
      name: 'Cairo Weekend Warriors',
      members: 156,
      description: 'Weekend tennis enthusiasts in Cairo',
      category: 'Local Group'
    },
    {
      id: 2,
      name: 'Beginners Club Egypt',
      members: 289,
      description: 'Support group for tennis beginners',
      category: 'Skill Level'
    },
    {
      id: 3,
      name: 'Doubles Lovers',
      members: 94,
      description: 'Dedicated to doubles play and strategy',
      category: 'Play Style'
    },
    {
      id: 4,
      name: 'Alexandria Tennis Community',
      members: 127,
      description: 'Connect with players in Alexandria',
      category: 'Local Group'
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast.error('Please write something to post');
      return;
    }
    toast.success('Post created successfully!');
    setNewPost('');
  };

  const handleLike = (postId: number) => {
    toast.success('Post liked!');
  };

  const handleJoinGroup = (groupName: string) => {
    toast.success(`Joined ${groupName}!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />



      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Tennis Community
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share experiences, get tips, organize tournaments, and connect with fellow tennis players
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl text-gray-900 mb-1">10,000+</div>
              <div className="text-sm text-gray-600">Community Members</div>
            </Card>
            <Card className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl text-gray-900 mb-1">5,000+</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </Card>
            <Card className="p-6 text-center">
              <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl text-gray-900 mb-1">150+</div>
              <div className="text-sm text-gray-600">Local Tournaments</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              {/* Create Post */}
              <Card className="p-6 mb-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-green-600 text-white">
                      ME
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share something with the community..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      rows={3}
                      className="mb-3"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="cursor-pointer">
                          💡 Tip
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer">
                          🎾 Match
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer">
                          ❓ Question
                        </Badge>
                      </div>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleCreatePost}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="popular">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="p-6">
                    {post.isPinned && (
                      <Badge className="mb-4 bg-green-600">
                        📌 Pinned
                      </Badge>
                    )}
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {post.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900">{post.author}</h3>
                            <p className="text-sm text-gray-500">{post.timeAgo}</p>
                          </div>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        <div className="flex items-center gap-6">
                          <button 
                            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Groups */}
              <Card className="p-6">
                <h3 className="text-xl text-gray-900 mb-4">Popular Groups</h3>
                <div className="space-y-4">
                  {groups.map((group) => (
                    <div key={group.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <h4 className="text-gray-900 mb-1">{group.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{group.members} members</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleJoinGroup(group.name)}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4 text-green-600">
                  View All Groups →
                </Button>
              </Card>

              {/* Trending Topics */}
              <Card className="p-6">
                <h3 className="text-xl text-gray-900 mb-4">Trending Topics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">#ClayCourtTips</span>
                    <Badge variant="secondary">234 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">#WeekendMatches</span>
                    <Badge variant="secondary">189 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">#EquipmentReviews</span>
                    <Badge variant="secondary">156 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">#BeginnerAdvice</span>
                    <Badge variant="secondary">142 posts</Badge>
                  </div>
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card className="p-6">
                <h3 className="text-xl text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <Badge className="mb-2 bg-green-600">Tournament</Badge>
                    <h4 className="text-gray-900 mb-1">Cairo Open 2025</h4>
                    <p className="text-sm text-gray-600">December 15-17, 2025</p>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <Badge className="mb-2" variant="secondary">Workshop</Badge>
                    <h4 className="text-gray-900 mb-1">Serve Technique Clinic</h4>
                    <p className="text-sm text-gray-600">December 10, 2025</p>
                  </div>
                  <div>
                    <Badge className="mb-2" variant="secondary">Social</Badge>
                    <h4 className="text-gray-900 mb-1">Weekend Mixer</h4>
                    <p className="text-sm text-gray-600">Every Saturday</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
