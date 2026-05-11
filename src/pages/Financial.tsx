import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { mockTransactions, monthlyRevenueData } from '../data/mockData';

export function Financial() {
  const totalRevenue = mockTransactions
    .filter((t) => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpenses;

  const cashPayments = mockTransactions
    .filter((t) => t.paymentMethod === 'cash')
    .reduce((sum, t) => sum + t.amount, 0);

  const onlinePayments = mockTransactions
    .filter((t) => t.paymentMethod === 'online')
    .reduce((sum, t) => sum + t.amount, 0);

  const paymentData = [
    { name: 'Cash', value: cashPayments, color: '#2E7D32' },
    { name: 'Online', value: onlinePayments, color: '#A6CE6A' },
  ];

  const expenseData = Object.entries(
    mockTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>),
  ).map(([name, value]) => ({ name, value }));

  const expenseColors = ['#163E1B', '#2E7D32', '#4D8E41', '#9CCC65'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#163E1B]">Financial Management</h1>
        <p className="mt-1 text-[#4f6b52]">
          Track revenue, expenses, and profit with a cleaner executive view.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-[#dbe6dc] shadow-sm">
          <CardContent className="p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#4f6b52]">Total Revenue</p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-[#163E1B]">${totalRevenue}</p>
                <p className="mt-3 flex items-center gap-1 text-sm font-medium text-[#2E7D32]">
                  <TrendingUp className="h-4 w-4" />
                  +12% vs last month
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#163E1B] text-white shadow-[0_12px_24px_rgba(22,62,27,0.18)]">
                <ArrowUpRight className="h-7 w-7" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#dbe6dc] shadow-sm">
          <CardContent className="p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#4f6b52]">Total Expenses</p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-[#163E1B]">${totalExpenses}</p>
                <p className="mt-3 flex items-center gap-1 text-sm font-medium text-[#ef4444]">
                  <TrendingDown className="h-4 w-4" />
                  -5% vs last month
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b8d98c] bg-[#f6fbef] text-[#2E7D32]">
                <ArrowDownRight className="h-7 w-7" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#dbe6dc] shadow-sm">
          <CardContent className="p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#4f6b52]">Net Profit</p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-[#163E1B]">${netProfit}</p>
                <p className="mt-3 text-sm text-[#6d866f]">
                  {((netProfit / totalRevenue) * 100).toFixed(1)}% margin
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b8d98c] bg-[#f6fbef] text-[#2E7D32]">
                <DollarSign className="h-7 w-7" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#dbe6dc] shadow-sm">
          <CardContent className="p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#4f6b52]">Cash Payments</p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-[#163E1B]">${cashPayments}</p>
                <p className="mt-3 text-sm text-[#6d866f]">
                  {((cashPayments / totalRevenue) * 100).toFixed(0)}% of revenue
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b8d98c] bg-[#f6fbef] text-[#2E7D32]">
                <Wallet className="h-7 w-7" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-[#dbe6dc] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#163E1B]">Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlyRevenueData}>
                <defs>
                  <linearGradient id="financialRevenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E7D32" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#2E7D32" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#dbe6dc" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#6d866f', fontSize: 14 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6d866f', fontSize: 14 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 18,
                    border: '1px solid #b8d98c',
                    boxShadow: '0 18px 45px rgba(22, 62, 27, 0.12)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2E7D32"
                  strokeWidth={4}
                  fill="url(#financialRevenueFill)"
                  dot={{ r: 5, fill: '#2E7D32', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#dbe6dc] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#163E1B]">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="48%"
                  innerRadius={0}
                  outerRadius={112}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {paymentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="square" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#dbe6dc] shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#163E1B]">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={expenseData}>
                <CartesianGrid stroke="#dbe6dc" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#6d866f', fontSize: 14 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6d866f', fontSize: 14 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                  {expenseData.map((entry, index) => (
                    <Cell key={entry.name} fill={expenseColors[index % expenseColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#dbe6dc] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#163E1B]">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e3ece0]">
                  <th className="px-4 py-3 text-left text-sm text-[#6d866f]">Date</th>
                  <th className="px-4 py-3 text-left text-sm text-[#6d866f]">Type</th>
                  <th className="px-4 py-3 text-left text-sm text-[#6d866f]">Category</th>
                  <th className="px-4 py-3 text-left text-sm text-[#6d866f]">Description</th>
                  <th className="px-4 py-3 text-left text-sm text-[#6d866f]">Payment</th>
                  <th className="px-4 py-3 text-right text-sm text-[#6d866f]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-[#eef4ec] hover:bg-[#f8fbf6]">
                    <td className="px-4 py-3 text-sm text-[#163E1B]">{transaction.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          transaction.type === 'revenue'
                            ? 'bg-[#eaf6ea] text-[#2E7D32]'
                            : 'bg-[#f7efe9] text-[#c2410c]'
                        }`}
                      >
                        {transaction.type === 'revenue' ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#163E1B]">{transaction.category}</td>
                    <td className="px-4 py-3 text-sm text-[#4f6b52]">{transaction.description}</td>
                    <td className="px-4 py-3 text-sm text-[#4f6b52]">
                      {transaction.paymentMethod ? (
                        <span className="inline-flex items-center gap-1">
                          {transaction.paymentMethod === 'cash' ? (
                            <Wallet className="h-4 w-4 text-[#7b927d]" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-[#7b927d]" />
                          )}
                          {transaction.paymentMethod}
                        </span>
                      ) : null}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        transaction.type === 'revenue' ? 'text-[#2E7D32]' : 'text-[#c2410c]'
                      }`}
                    >
                      {transaction.type === 'revenue' ? '+' : '-'}${transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
