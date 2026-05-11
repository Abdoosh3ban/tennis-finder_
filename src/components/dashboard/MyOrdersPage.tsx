import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Package, Truck, CheckCircle } from 'lucide-react';

export default function MyOrdersPage() {
  const orders = [
    {
      id: 'ORD-2025-001',
      date: 'Dec 2, 2025',
      items: [
        { name: 'Wilson Pro Staff RF97', quantity: 1, price: 3500 }
      ],
      total: 3500,
      status: 'Shipped',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2025-002',
      date: 'Nov 28, 2025',
      items: [
        { name: 'Wilson US Open Tennis Balls (4-Can)', quantity: 2, price: 450 },
        { name: 'Nike Court Dri-FIT T-Shirt', quantity: 1, price: 650 }
      ],
      total: 1550,
      status: 'Delivered',
      deliveredDate: 'Nov 30, 2025'
    }
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your marketplace purchases</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-gray-900 mb-1">Order {order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  </div>
                  <Badge 
                    variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                    className={order.status === 'Shipped' ? 'bg-blue-600' : ''}
                  >
                    {order.status === 'Shipped' && <Truck className="w-3 h-3 mr-1" />}
                    {order.status === 'Delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-gray-900">EGP {item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    {order.status === 'Shipped' && (
                      <p className="text-sm text-gray-600">
                        Tracking: <span className="text-gray-900">{order.trackingNumber}</span>
                      </p>
                    )}
                    {order.status === 'Delivered' && (
                      <p className="text-sm text-gray-600">
                        Delivered on {order.deliveredDate}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Total</div>
                    <div className="text-2xl text-gray-900">EGP {order.total}</div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {order.status === 'Shipped' && (
                    <Button variant="outline" size="sm">
                      Track Order
                    </Button>
                  )}
                  {order.status === 'Delivered' && (
                    <Button variant="outline" size="sm">
                      Buy Again
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="processing">
          <p className="text-center text-gray-600 py-12">No processing orders</p>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="space-y-4">
            {orders.filter(o => o.status === 'Delivered').map((order) => (
              <Card key={order.id} className="p-6 opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-gray-900 mb-1">Order {order.id}</h3>
                    <p className="text-sm text-gray-600">Delivered on {order.deliveredDate}</p>
                  </div>
                  <Badge>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Delivered
                  </Badge>
                </div>
                <div className="text-2xl text-gray-900">EGP {order.total}</div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
