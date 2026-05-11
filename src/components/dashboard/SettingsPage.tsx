import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Save, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@company.com',
    company: 'My Company'
  });

  const [workspace, setWorkspace] = useState({
    name: 'My Company',
    description: 'Our primary workspace for ChatConnect integration',
    webhookUrl: 'https://api.mycompany.com/webhooks/chatconnect'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    usageWarnings: true,
    securityAlerts: true,
    productUpdates: false,
    marketingEmails: false
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleSaveWorkspace = () => {
    toast.success('Workspace settings updated successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated');
  };

  const handleDeleteWorkspace = () => {
    if (confirm('Are you sure you want to delete this workspace? This action cannot be undone and all data will be permanently deleted.')) {
      toast.error('Workspace deletion cancelled for demo purposes');
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account, workspace, and notification preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <h2 className="text-xl text-gray-900 mb-6">Profile Settings</h2>
          
          <div className="flex items-start gap-6 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button variant="outline" size="sm" className="mb-2">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-sm text-gray-600">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveProfile}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Workspace Settings */}
        <Card className="p-6">
          <h2 className="text-xl text-gray-900 mb-6">Workspace Settings</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspaceName">Workspace Name</Label>
              <Input
                id="workspaceName"
                value={workspace.name}
                onChange={(e) => setWorkspace({ ...workspace, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workspaceDescription">Description</Label>
              <Textarea
                id="workspaceDescription"
                rows={3}
                value={workspace.description}
                onChange={(e) => setWorkspace({ ...workspace, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                type="url"
                placeholder="https://your-api.com/webhooks"
                value={workspace.webhookUrl}
                onChange={(e) => setWorkspace({ ...workspace, webhookUrl: e.target.value })}
              />
              <p className="text-sm text-gray-600">
                Receive real-time notifications about events in your workspace
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveWorkspace}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6">
          <h2 className="text-xl text-gray-900 mb-6">Notification Preferences</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900 mb-1">Email Alerts</div>
                <p className="text-sm text-gray-600">
                  Receive email notifications for important events
                </p>
              </div>
              <Switch
                checked={notifications.emailAlerts}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, emailAlerts: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900 mb-1">Usage Warnings</div>
                <p className="text-sm text-gray-600">
                  Get notified when approaching usage limits
                </p>
              </div>
              <Switch
                checked={notifications.usageWarnings}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, usageWarnings: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900 mb-1">Security Alerts</div>
                <p className="text-sm text-gray-600">
                  Important security and authentication updates
                </p>
              </div>
              <Switch
                checked={notifications.securityAlerts}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, securityAlerts: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900 mb-1">Product Updates</div>
                <p className="text-sm text-gray-600">
                  New features and product announcements
                </p>
              </div>
              <Switch
                checked={notifications.productUpdates}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, productUpdates: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900 mb-1">Marketing Emails</div>
                <p className="text-sm text-gray-600">
                  Tips, guides, and promotional content
                </p>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, marketingEmails: checked })
                }
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveNotifications}>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200 bg-red-50">
          <h2 className="text-xl text-red-900 mb-2">Danger Zone</h2>
          <p className="text-red-700 mb-6">
            Irreversible and destructive actions
          </p>

          <div className="flex items-center justify-between p-4 bg-white border border-red-200 rounded-lg">
            <div>
              <div className="text-gray-900 mb-1">Delete Workspace</div>
              <p className="text-sm text-gray-600">
                Permanently delete this workspace and all associated data
              </p>
            </div>
            <Button 
              variant="destructive"
              onClick={handleDeleteWorkspace}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Workspace
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
