import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MemberStats() {
  const { transactions, members } = useAppStore();

  const memberData = useMemo(() => {
    const sums: Record<string, number> = {};
    members.forEach(m => sums[m.id] = 0);
    transactions.filter(t => t.type === 'EXPENSE').forEach(tx => {
      if (sums[tx.memberId] !== undefined) {
        sums[tx.memberId] += Math.abs(tx.amount);
      }
    });
    return Object.entries(sums).map(([id, amount]) => {
      const mem = members.find(m => m.id === id);
      return { name: mem?.name, amount, fill: mem?.color };
    }).sort((a, b) => b.amount - a.amount);
  }, [transactions, members]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">成員消費排行榜</h3>
        <div className="space-y-4">
          {memberData.map((d, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }}></div>
                <span className="font-medium text-gray-900">{d.name}</span>
              </div>
              <span className="font-bold text-gray-900">${d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">成員消費長條圖</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={memberData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" stroke="var(--color-gray-600)" />
              <Tooltip formatter={(value: any) => `$${Number(value).toLocaleString()}`} />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
