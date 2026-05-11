import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Send, Users, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
}

export default function DemoChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey! Welcome to ChatConnect. This is a demo of our real-time messaging platform.',
      sender: 'Demo User',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      content: 'This looks great! How fast is the message delivery?',
      sender: 'You',
      timestamp: new Date(Date.now() - 240000),
      isOwn: true,
      status: 'read'
    },
    {
      id: '3',
      content: 'Our infrastructure is built on SignalR and WebSockets, delivering messages in under 50ms on average!',
      sender: 'Demo User',
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
      status: 'read'
    },
    {
      id: '4',
      content: 'We also support message history, read receipts, and typing indicators.',
      sender: 'Demo User',
      timestamp: new Date(Date.now() - 120000),
      isOwn: false,
      status: 'read'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers] = useState(324);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'You',
      timestamp: new Date(),
      isOwn: true,
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate status updates
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: 'delivered' } : m
      ));
    }, 500);

    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: 'read' } : m
      ));
    }, 1500);

    // Simulate response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Thanks for trying out our demo! You can integrate this into your app with just a few lines of code.',
          sender: 'Demo User',
          timestamp: new Date(),
          isOwn: false,
          status: 'delivered'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
      
      <div className="pt-20 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-4">Live Demo</Badge>
            <h1 className="text-4xl text-gray-900 mb-4">
              Experience Real-Time Chat
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Try our chat interface powered by ChatConnect. This is what you can build with our APIs and SDKs.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-600 text-white">DU</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-gray-900">Demo User</div>
                      <div className="text-sm text-green-600">Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{onlineUsers} online</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="h-[500px] bg-gray-50 p-6" ref={scrollRef as any}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[70%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                        {!message.isOwn && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                              DU
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              message.isOwn
                                ? 'bg-blue-600 text-white rounded-br-sm'
                                : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                            <span>{formatTime(message.timestamp)}</span>
                            {message.isOwn && (
                              <span>
                                {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-600" />}
                                {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                                {message.status === 'sent' && <Check className="w-3 h-3" />}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-end gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          DU
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-200 px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 text-center">
                <div className="text-2xl text-blue-600 mb-2">&lt;50ms</div>
                <div className="text-sm text-gray-600">Average Latency</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl text-blue-600 mb-2">WebSocket</div>
                <div className="text-sm text-gray-600">Real-Time Protocol</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl text-blue-600 mb-2">SignalR</div>
                <div className="text-sm text-gray-600">Powered By</div>
              </Card>
            </div>

            {/* Code Example */}
            <Card className="p-6 mt-6 bg-gray-900 text-gray-100">
              <h3 className="text-white mb-4">Integrate in Minutes</h3>
              <pre className="overflow-x-auto text-sm">
               
              </pre>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
