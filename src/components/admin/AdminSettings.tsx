import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { 
  Save,
  Bell,
  Shield,
  Globe,
  DollarSign,
  Mail
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'TennisFinder',
    siteEmail: 'admin@tennisfinder.com',
    supportEmail: 'support@tennisfinder.com',
    currency: 'EGP',
    timezone: 'Africa/Cairo',
    
    // Notifications
    emailNotifications: true,
    bookingNotifications: true,
    paymentNotifications: true,
    
    // Booking Settings
    minBookingHours: '1',
    maxBookingHours: '4',
    cancellationHours: '24',
    
    // Payment Settings
    paymentGateway: 'stripe',
    commissionRate: '10',
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '30'
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleUpdateSetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Settings</h1>
        <p className="text-[#4f6b52]">Manage platform settings and configurations</p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleUpdateSetting('siteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siteEmail">Site Email</Label>
              <Input
                id="siteEmail"
                type="email"
                value={settings.siteEmail}
                onChange={(e) => handleUpdateSetting('siteEmail', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleUpdateSetting('supportEmail', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => handleUpdateSetting('currency', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleUpdateSetting('timezone', e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Email Notifications</div>
              <div className="text-sm text-[#6d866f]">Receive email notifications for important events</div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleUpdateSetting('emailNotifications', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Booking Notifications</div>
              <div className="text-sm text-[#6d866f]">Get notified when new bookings are made</div>
            </div>
            <Switch
              checked={settings.bookingNotifications}
              onCheckedChange={(checked) => handleUpdateSetting('bookingNotifications', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Payment Notifications</div>
              <div className="text-sm text-[#6d866f]">Receive alerts for payment transactions</div>
            </div>
            <Switch
              checked={settings.paymentNotifications}
              onCheckedChange={(checked) => handleUpdateSetting('paymentNotifications', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Booking Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="text-lg font-semibold text-gray-900">Booking Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="minBookingHours">Minimum Booking (hours)</Label>
              <Input
                id="minBookingHours"
                type="number"
                value={settings.minBookingHours}
                onChange={(e) => handleUpdateSetting('minBookingHours', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maxBookingHours">Maximum Booking (hours)</Label>
              <Input
                id="maxBookingHours"
                type="number"
                value={settings.maxBookingHours}
                onChange={(e) => handleUpdateSetting('maxBookingHours', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cancellationHours">Cancellation Notice (hours)</Label>
              <Input
                id="cancellationHours"
                type="number"
                value={settings.cancellationHours}
                onChange={(e) => handleUpdateSetting('cancellationHours', e.target.value)}
              />
            </div>
          </div>
          <p className="text-sm text-[#6d866f]">
            Set minimum and maximum booking durations and cancellation policy
          </p>
        </div>
      </Card>

      {/* Payment Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="text-lg font-semibold text-gray-900">Payment Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentGateway">Payment Gateway</Label>
              <Input
                id="paymentGateway"
                value={settings.paymentGateway}
                onChange={(e) => handleUpdateSetting('paymentGateway', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                value={settings.commissionRate}
                onChange={(e) => handleUpdateSetting('commissionRate', e.target.value)}
              />
            </div>
          </div>
          <p className="text-sm text-[#6d866f]">
            Configure payment processing and platform commission rates
          </p>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#2E7D32]" />
          <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-[#6d866f]">Require 2FA for admin accounts</div>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleUpdateSetting('twoFactorAuth', checked)}
            />
          </div>
          <Separator />
          <div>
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleUpdateSetting('sessionTimeout', e.target.value)}
              className="max-w-xs"
            />
            <p className="text-sm text-[#6d866f] mt-2">
              Auto-logout users after period of inactivity
            </p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-[#163E1B] hover:bg-[#1F5A24]">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
