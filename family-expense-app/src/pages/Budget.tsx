import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function Budget() {
  const { categories, budgets } = useAppStore();
  const [yearMonth, setYearMonth] = useState('2026-05'); // Hardcoded for demo, should be dynamic

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">預算管理</h2>
        <input 
          type="month" 
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6">各分類預算設定 ({yearMonth})</h3>
        
        <div className="space-y-6">
          {categories.map(cat => {
            const budget = budgets.find(b => b.categoryId === cat.id && b.yearMonth === yearMonth);
            // In a real app we'd calculate actual spent from transactions, mocking 0 for UI demo if no transactions
            const spent = 0; // Mock 
            const amount = budget?.amount || 0;
            const progress = amount > 0 ? Math.min((spent / amount) * 100, 100) : 0;
            
            return (
              <div key={cat.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="font-medium text-gray-900">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">已用 $0</span>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">/</span>
                      <input 
                        type="number" 
                        defaultValue={amount} 
                        placeholder="設定預算"
                        className="w-24 px-2 py-1 border border-gray-200 rounded text-right focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${progress > 90 ? 'bg-expense' : progress > 70 ? 'bg-warning' : 'bg-primary'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium transition-colors">
            儲存設定
          </button>
        </div>
      </div>
    </div>
  );
}
