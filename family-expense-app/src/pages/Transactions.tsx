import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function Transactions() {
  const { transactions, categories, members, addTransaction, updateTransaction, deleteTransaction } = useAppStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [type, setType] = useState<'EXPENSE'|'INCOME'>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredTx = transactions.filter(t => t.name.includes(searchTerm));

  const startAdd = () => {
    setType('EXPENSE');
    setAmount('');
    setName('');
    setCategoryId(categories[0]?.id || '');
    setMemberId(members[0]?.id || '');
    setDate(new Date().toISOString().split('T')[0]);
    setEditingTxId(null);
    setIsModalOpen(true);
  };

  const startEdit = (tx: any) => {
    setType(tx.type);
    setAmount(Math.abs(tx.amount).toString());
    setName(tx.name);
    setCategoryId(tx.categoryId);
    setMemberId(tx.memberId);
    setDate(tx.date.split('T')[0]);
    setEditingTxId(tx.id);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount) * (type === 'EXPENSE' ? -1 : 1);
    
    const payload = {
      date: new Date(date).toISOString(),
      name,
      amount: numAmount,
      type,
      categoryId,
      memberId
    };

    if (editingTxId) {
      updateTransaction(editingTxId, payload);
    } else {
      addTransaction(payload);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!editingTxId) return;
    if (confirm('確定要刪除這筆交易記錄嗎？此動作無法復原。')) {
      deleteTransaction(editingTxId);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">交易記錄</h2>
        <button 
          onClick={startAdd}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + 新增交易
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
        <input 
          type="text" 
          placeholder="搜尋項目名稱..." 
          className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
              <th className="p-4 font-medium">日期</th>
              <th className="p-4 font-medium">項目名稱</th>
              <th className="p-4 font-medium">分類</th>
              <th className="p-4 font-medium">成員</th>
              <th className="p-4 font-medium text-right">金額</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTx.map(tx => {
              const cat = categories.find(c => c.id === tx.categoryId);
              const mem = members.find(m => m.id === tx.memberId);
              return (
                <tr 
                  key={tx.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => startEdit(tx)}
                >
                  <td className="p-4 text-gray-600 text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="p-4 font-medium text-gray-900">{tx.name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: cat?.lightColor, color: cat?.color }}>
                      {cat?.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: mem?.lightColor, color: mem?.color }}>
                        {mem?.name[0]}
                      </div>
                      <span className="text-sm text-gray-600">{mem?.name}</span>
                    </div>
                  </td>
                  <td className={`p-4 text-right font-bold ${tx.type === 'INCOME' ? 'text-income' : 'text-gray-900'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                  </td>
                </tr>
              );
            })}
            {filteredTx.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-gray-600">找不到交易記錄</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">{editingTxId ? '編輯交易' : '新增交易'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <button type="button" onClick={() => setType('EXPENSE')} className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${type === 'EXPENSE' ? 'bg-white shadow-sm text-expense' : 'text-gray-600'}`}>支出</button>
                <button type="button" onClick={() => setType('INCOME')} className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${type === 'INCOME' ? 'bg-white shadow-sm text-income' : 'text-gray-600'}`}>收入</button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">金額</label>
                  <input type="number" required min="1" step="any" className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">日期</label>
                  <input type="date" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary" value={date} onChange={e => setDate(e.target.value)} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">項目名稱</label>
                <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary" value={name} onChange={e => setName(e.target.value)} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">分類</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">成員</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary" value={memberId} onChange={e => setMemberId(e.target.value)}>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                {editingTxId && (
                  <button type="button" onClick={handleDelete} className="py-2 px-4 text-expense font-medium hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-expense">
                    刪除
                  </button>
                )}
                <div className="flex-1 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">取消</button>
                  <button type="submit" className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors">儲存</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
