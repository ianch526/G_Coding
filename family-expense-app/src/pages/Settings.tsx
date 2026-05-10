import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const COLOR_PALETTE = [
  '#1D9E75', '#378ADD', '#D85A30', '#EF9F27', '#E24B4A',
  '#7F77DD', '#888780', '#D4537E', '#639922', '#BA7517'
];

export default function Settings() {
  const { categories, members, transactions, addCategory, updateCategory, deleteCategory, addMember, updateMember, deleteMember } = useAppStore();

  // Category State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');
  const [catColor, setCatColor] = useState(COLOR_PALETTE[0]);

  // Member State
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memName, setMemName] = useState('');
  const [memColor, setMemColor] = useState(COLOR_PALETTE[1]);

  // --- Category Handlers ---
  const startAddCategory = () => {
    setCatName('');
    setCatColor(COLOR_PALETTE[0]);
    setIsAddingCategory(true);
    setEditingCategoryId(null);
  };

  const startEditCategory = (c: any) => {
    setCatName(c.name);
    setCatColor(c.color);
    setEditingCategoryId(c.id);
    setIsAddingCategory(false);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) return;
    
    const payload = {
      name: catName,
      color: catColor,
      lightColor: catColor + '20',
      isActive: true,
    };

    if (editingCategoryId) {
      updateCategory(editingCategoryId, payload);
      setEditingCategoryId(null);
    } else {
      addCategory(payload);
      setIsAddingCategory(false);
    }
  };

  const handleDeleteCategory = (id: string) => {
    const hasTx = transactions.some(t => t.categoryId === id);
    if (categories.length <= 1) {
      alert('至少需保留一個分類！');
      return;
    }
    if (hasTx) {
      if (!confirm('此分類有關聯的交易記錄，若強制刪除未來可能顯示異常（目前為 MVP 版本），確定要刪除？')) return;
    }
    deleteCategory(id);
  };

  // --- Member Handlers ---
  const startAddMember = () => {
    setMemName('');
    setMemColor(COLOR_PALETTE[1]);
    setIsAddingMember(true);
    setEditingMemberId(null);
  };

  const startEditMember = (m: any) => {
    setMemName(m.name);
    setMemColor(m.color);
    setEditingMemberId(m.id);
    setIsAddingMember(false);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memName) return;
    
    const payload = {
      name: memName,
      color: memColor,
      lightColor: memColor + '20',
      isActive: true,
    };

    if (editingMemberId) {
      updateMember(editingMemberId, payload);
      setEditingMemberId(null);
    } else {
      addMember(payload);
      setIsAddingMember(false);
    }
  };

  const handleDeleteMember = (id: string) => {
    const hasTx = transactions.some(t => t.memberId === id);
    if (members.length <= 1) {
      alert('至少需保留一位成員！');
      return;
    }
    if (hasTx) {
      if (!confirm('此成員有關聯的交易記錄，確定要刪除？')) return;
    }
    deleteMember(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">設定與管理</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Management */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">分類管理</h3>
          <div className="space-y-3">
            {categories.map(c => (
              <div key={c.id}>
                {editingCategoryId === c.id ? (
                  <form onSubmit={handleSaveCategory} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">分類名稱</label>
                      <input type="text" required value={catName} onChange={e => setCatName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded focus:border-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">選擇顏色</label>
                      <div className="flex gap-2 flex-wrap">
                        {COLOR_PALETTE.map(color => (
                          <button type="button" key={color} onClick={() => setCatColor(color)} className={`w-6 h-6 rounded-full border-2 ${catColor === color ? 'border-gray-900' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="button" onClick={() => setEditingCategoryId(null)} className="flex-1 py-1 text-gray-600 border border-gray-200 rounded">取消</button>
                      <button type="submit" className="flex-1 py-1 bg-primary text-white rounded">儲存</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }}></div>
                      <span className="font-medium text-gray-900">{c.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditCategory(c)} className="text-sm text-info hover:underline">編輯</button>
                      <button onClick={() => handleDeleteCategory(c.id)} className="text-sm text-expense hover:underline">刪除</button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {!editingCategoryId && (
              isAddingCategory ? (
                <form onSubmit={handleSaveCategory} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">分類名稱</label>
                    <input type="text" required value={catName} onChange={e => setCatName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">選擇顏色</label>
                    <div className="flex gap-2 flex-wrap">
                      {COLOR_PALETTE.map(color => (
                        <button type="button" key={color} onClick={() => setCatColor(color)} className={`w-6 h-6 rounded-full border-2 ${catColor === color ? 'border-gray-900' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setIsAddingCategory(false)} className="flex-1 py-1 text-gray-600 border border-gray-200 rounded">取消</button>
                    <button type="submit" className="flex-1 py-1 bg-primary text-white rounded">新增</button>
                  </div>
                </form>
              ) : (
                <button onClick={startAddCategory} className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium">
                  + 新增分類
                </button>
              )
            )}
          </div>
        </div>

        {/* Member Management */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">成員管理</h3>
          <div className="space-y-3">
            {members.map(m => (
              <div key={m.id}>
                {editingMemberId === m.id ? (
                  <form onSubmit={handleSaveMember} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">成員名稱</label>
                      <input type="text" required value={memName} onChange={e => setMemName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded focus:border-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">選擇顏色</label>
                      <div className="flex gap-2 flex-wrap">
                        {COLOR_PALETTE.map(color => (
                          <button type="button" key={color} onClick={() => setMemColor(color)} className={`w-6 h-6 rounded-full border-2 ${memColor === color ? 'border-gray-900' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="button" onClick={() => setEditingMemberId(null)} className="flex-1 py-1 text-gray-600 border border-gray-200 rounded">取消</button>
                      <button type="submit" className="flex-1 py-1 bg-primary text-white rounded">儲存</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: m.lightColor, color: m.color }}>
                        {m.name[0]}
                      </div>
                      <span className="font-medium text-gray-900">{m.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditMember(m)} className="text-sm text-info hover:underline">編輯</button>
                      <button onClick={() => handleDeleteMember(m.id)} className="text-sm text-expense hover:underline">刪除</button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {!editingMemberId && (
              isAddingMember ? (
                <form onSubmit={handleSaveMember} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">成員名稱</label>
                    <input type="text" required value={memName} onChange={e => setMemName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">選擇顏色</label>
                    <div className="flex gap-2 flex-wrap">
                      {COLOR_PALETTE.map(color => (
                        <button type="button" key={color} onClick={() => setMemColor(color)} className={`w-6 h-6 rounded-full border-2 ${memColor === color ? 'border-gray-900' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setIsAddingMember(false)} className="flex-1 py-1 text-gray-600 border border-gray-200 rounded">取消</button>
                    <button type="submit" className="flex-1 py-1 bg-primary text-white rounded">新增</button>
                  </div>
                </form>
              ) : (
                <button onClick={startAddMember} className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium">
                  + 新增成員
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
