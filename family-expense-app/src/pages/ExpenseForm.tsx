import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { v4 as uuidv4 } from 'uuid';

export default function ExpenseForm() {
  const navigate = useNavigate();
  const { categories, users, currentUser, addExpense } = useAppStore();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [paidById, setPaidById] = useState(currentUser?.id || '');
  
  // Default to even split among all users
  const [splitMode, setSplitMode] = useState<'EVEN' | 'CUSTOM'>('EVEN');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title || !numAmount || !categoryId || !paidById) return;

    // Create splits
    const splits = users.map(u => {
      const splitAmt = splitMode === 'EVEN' ? numAmount / users.length : 0; // Simplified for MVP
      return {
        id: uuidv4(),
        userId: u.id,
        amount: splitAmt,
        isSettled: u.id === paidById // Payer's own share is auto-settled
      };
    });

    addExpense({
      title,
      amount: numAmount,
      categoryId,
      paidById,
      date: new Date().toISOString(),
      familyId: currentUser!.familyId,
      splits
    });

    navigate('/dashboard');
  };

  return (
    <div className="glass" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="text-2xl mb-6">新增記帳</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="input-group">
          <label>標題</label>
          <input 
            className="input" 
            placeholder="例：週末大潤發採買" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2">
          <div className="input-group">
            <label>金額</label>
            <input 
              type="number" 
              className="input" 
              placeholder="0" 
              value={amount} 
              onChange={e => setAmount(e.target.value)}
              required
              min="1"
            />
          </div>
          
          <div className="input-group">
            <label>分類</label>
            <select className="select" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>誰付款的？</label>
          <select className="select" value={paidById} onChange={e => setPaidById(e.target.value)}>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>分攤方式 (MVP: 目前預設為全員平分)</label>
          <select className="select" value={splitMode} onChange={e => setSplitMode(e.target.value as any)}>
            <option value="EVEN">全員平分</option>
            <option value="CUSTOM" disabled>自訂金額 (開發中)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          儲存記帳
        </button>
      </form>
    </div>
  );
}
