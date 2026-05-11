import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  CreditCard, 
  Download, 
  TrendingUp,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function BillingPage() {
  const currentPlan = {
    name: 'Professional',
    price: 49,
    period: 'month',
    renewal: 'November 15, 2025'
  };

  const usage = {
    messages: { current: 45231, limit: 100000 },
    connections: { current: 328, limit: 1000 },
    workspaces: { current: 2, limit: 5 }
  };

  const invoices = [
    {
      id: 'INV-2025-11',
      date: 'November 1, 2025',
      amount: 49.00,
      status: 'Paid',
      description: 'Professional Plan - Monthly'
    },
    {
      id: 'INV-2025-10',
      date: 'October 1, 2025',
      amount: 49.00,
      status: 'Paid',
      description: 'Professional Plan - Monthly'
    },
    {
      id: 'INV-2025-09',
      date: 'September 1, 2025',
      amount: 49.00,
      status: 'Paid',
      description: 'Professional Plan - Monthly'
    },
    {
      id: 'INV-2025-08',
      date: 'August 1, 2025',
      amount: 49.00,
      status: 'Paid',
      description: 'Professional Plan - Monthly'
    }
  ];

  const paymentMethod = {
    type: 'Visa',
    last4: '4242',
    expires: '12/2026'
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return (current / limit) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-amber-600';
    return 'text-blue-600';
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Billing & Usage</h1>
        <p className="text-gray-600">
          Manage your subscription, view usage, and download invoices
        </p>
      </div>

      {/* Current Plan */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Badge className="mb-3">Current Plan</Badge>
              <h2 className="text-2xl text-gray-900 mb-2">{currentPlan.name}</h2>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl text-gray-900">${currentPlan.price}</span>
                <span className="text-gray-600">/ {currentPlan.period}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Renews on {currentPlan.renewal}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                Cancel Plan
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div>
              <div className="text-sm text-gray-600 mb-1">Messages/Month</div>
              <div className="text-2xl text-gray-900">100K</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Concurrent Connections</div>
              <div className="text-2xl text-gray-900">1,000</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Workspaces</div>
              <div className="text-2xl text-gray-900">5</div>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Payment Method</h3>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-gray-900">
                {paymentMethod.type} •••• {paymentMethod.last4}
              </div>
              <div className="text-sm text-gray-600">Expires {paymentMethod.expires}</div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Update Payment Method
          </Button>
        </Card>
      </div>

      {/* Usage Section */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Current Usage</h3>
          <Badge variant="outline">Billing Period: Nov 1-30</Badge>
        </div>

        <div className="space-y-6">
          {/* Messages Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-900">Messages</div>
              <div className={`${getUsageColor(getUsagePercentage(usage.messages.current, usage.messages.limit))}`}>
                {usage.messages.current.toLocaleString()} / {usage.messages.limit.toLocaleString()}
              </div>
            </div>
            <Progress value={getUsagePercentage(usage.messages.current, usage.messages.limit)} />
          </div>

          {/* Connections Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-900">Concurrent Connections</div>
              <div className={`${getUsageColor(getUsagePercentage(usage.connections.current, usage.connections.limit))}`}>
                {usage.connections.current.toLocaleString()} / {usage.connections.limit.toLocaleString()}
              </div>
            </div>
            <Progress value={getUsagePercentage(usage.connections.current, usage.connections.limit)} />
          </div>

          {/* Workspaces Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-900">Workspaces</div>
              <div className={`${getUsageColor(getUsagePercentage(usage.workspaces.current, usage.workspaces.limit))}`}>
                {usage.workspaces.current} / {usage.workspaces.limit}
              </div>
            </div>
            <Progress value={getUsagePercentage(usage.workspaces.current, usage.workspaces.limit)} />
          </div>
        </div>

        {getUsagePercentage(usage.messages.current, usage.messages.limit) >= 75 && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-900 mb-1">Usage Warning</h4>
              <p className="text-sm text-amber-700">
                You're approaching your message limit. Consider upgrading your plan to avoid service interruption.
              </p>
              <Button variant="link" className="text-amber-900 p-0 h-auto mt-2">
                Upgrade Now →
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Invoices */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Billing History</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">{invoice.description}</div>
                  <div className="text-sm text-gray-600">
                    {invoice.id} • {invoice.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>
                  {invoice.status}
                </Badge>
                <div className="text-gray-900 min-w-[80px] text-right">
                  ${invoice.amount.toFixed(2)}
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
