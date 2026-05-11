import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { 
  Plus, 
  Copy, 
  Eye, 
  EyeOff, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'ck_live_4d3f2a1b9c8e7f6g5h4i3j2k1',
      created: '2025-10-15',
      lastUsed: '2 hours ago',
      environment: 'production'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'ck_test_9z8y7x6w5v4u3t2s1r0q',
      created: '2025-10-01',
      lastUsed: '5 minutes ago',
      environment: 'development'
    },
    {
      id: '3',
      name: 'Staging API Key',
      key: 'ck_test_1a2b3c4d5e6f7g8h9i0j',
      created: '2025-09-20',
      lastUsed: '1 day ago',
      environment: 'staging'
    }
  ]);

  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [newKeyName, setNewKeyName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleKeyVisibility = (keyId: string) => {
    const newSet = new Set(visibleKeys);
    if (newSet.has(keyId)) {
      newSet.delete(keyId);
    } else {
      newSet.add(keyId);
    }
    setVisibleKeys(newSet);
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const deleteKey = (keyId: string) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(k => k.id !== keyId));
      toast.success('API key deleted successfully');
    }
  };

  const createNewKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `ck_test_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      environment: 'development'
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setIsDialogOpen(false);
    toast.success('New API key created successfully');
  };

  const maskKey = (key: string) => {
    return key.substring(0, 10) + '•••••••••••••' + key.substring(key.length - 4);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl text-gray-900">API Keys</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Generate a new API key for your workspace. Make sure to copy it - you won't be able to see it again!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">Key Name</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Production API Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Choose a descriptive name to identify this key
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createNewKey}>
                  Create Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-gray-600">
          Manage your API keys to authenticate requests to the ChatConnect API
        </p>
      </div>

      {/* Warning Banner */}
      <Card className="p-4 mb-6 bg-amber-50 border-amber-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-amber-900 mb-1">Keep your API keys secure</h3>
            <p className="text-sm text-amber-700">
              Never share your API keys publicly or commit them to version control. 
              Treat them like passwords and rotate them regularly.
            </p>
          </div>
        </div>
      </Card>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-gray-900">{apiKey.name}</h3>
                  <Badge variant={apiKey.environment === 'production' ? 'default' : 'secondary'}>
                    {apiKey.environment}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Created {apiKey.created}</span>
                  <span>•</span>
                  <span>Last used {apiKey.lastUsed}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteKey(apiKey.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                <code className="text-sm text-gray-900">
                  {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                </code>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleKeyVisibility(apiKey.id)}
              >
                {visibleKeys.has(apiKey.id) ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(apiKey.key)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Documentation Card */}
      <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
        <h3 className="text-gray-900 mb-2">Using Your API Keys</h3>
        <p className="text-gray-700 mb-4">
          Include your API key in the Authorization header of your requests:
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code className="text-sm">
            {`curl https://api.chatconnect.com/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
          </code>
        </div>
        <Button variant="link" className="text-blue-600 mt-4 p-0 h-auto">
          View Full Documentation →
        </Button>
      </Card>
    </div>
  );
}
