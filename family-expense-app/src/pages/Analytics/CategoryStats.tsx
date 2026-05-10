import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CategoryStats() {
  const { transactions, categories } = useAppStore();

  const pieData = useMemo(() => {
    const sums: Record<string, number> = {};
    transactions.filter(t => t.type === 'EXPENSE').forEach(t => {
      sums[t.categoryId] = (sums[t.categoryId] || 0) + Math.abs(t.amount);
    });
    return Object.entries(sums).map(([catId, value]) => {
      const cat = categories.find(c => c.id === catId);
      return { name: cat?.name || '其他', value, color: cat?.color || '#ccc' };
    }).sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">分類消費排行</h3>
        <div className="space-y-4">
          {pieData.map((d, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                <span className="font-medium text-gray-900">{d.name}</span>
              </div>
              <span className="font-bold text-gray-900">${d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">圓餅圖分析</h3>
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
    </div>
  );
}
