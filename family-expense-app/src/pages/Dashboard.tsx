import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
  const { transactions, categories, budgets, members } = useAppStore();

  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const currentMonthTx = useMemo(() => {
    return transactions.filter(t => t.date.startsWith(currentMonthStr));
  }, [transactions, currentMonthStr]);

  const totalIncome = currentMonthTx.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = currentMonthTx.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const totalBudget = budgets.filter(b => b.yearMonth === currentMonthStr).reduce((acc, b) => acc + b.amount, 0) || 1; // avoid div by 0
  const budgetUsageRate = (totalExpense / totalBudget) * 100;

  // Pie chart data
  const pieData = useMemo(() => {
    const sums: Record<string, number> = {};
    currentMonthTx.filter(t => t.type === 'EXPENSE').forEach(t => {
      sums[t.categoryId] = (sums[t.categoryId] || 0) + Math.abs(t.amount);
    });
    return Object.entries(sums).map(([catId, value]) => {
      const cat = categories.find(c => c.id === catId);
      return { name: cat?.name || '其他', value, color: cat?.color || '#ccc' };
    });
  }, [currentMonthTx, categories]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">本月總覽</h2>
      
      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-600 font-medium">本月收入</div>
          <div className="text-2xl font-bold text-income mt-1">${totalIncome.toLocaleString()}</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-600 font-medium">本月支出</div>
          <div className="text-2xl font-bold text-expense mt-1">${totalExpense.toLocaleString()}</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-600 font-medium">本月結餘</div>
          <div className={`text-2xl font-bold mt-1 ${balance < 0 ? 'text-expense' : 'text-gray-900'}`}>
            ${balance.toLocaleString()}
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-600 font-medium">預算使用率</div>
          <div className={`text-2xl font-bold mt-1 ${budgetUsageRate > 90 ? 'text-budget-danger' : budgetUsageRate > 70 ? 'text-budget-warn' : 'text-budget-safe'}`}>
            {budgetUsageRate.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">本月支出佔比</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">最近交易</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map(tx => {
              const cat = categories.find(c => c.id === tx.categoryId);
              const mem = members.find(m => m.id === tx.memberId);
              return (
                <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: cat?.lightColor, color: cat?.color }}>
                      {cat?.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{tx.name}</div>
                      <div className="text-xs text-gray-600">{new Date(tx.date).toLocaleDateString()} • {mem?.name}</div>
                    </div>
                  </div>
                  <div className={`font-bold ${tx.type === 'INCOME' ? 'text-income' : 'text-gray-900'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
