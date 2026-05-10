import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Member, Category, Transaction, Budget } from '../types';

interface AppState {
  members: Member[];
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  
  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (cat: Omit<Category, 'id' | 'sortOrder'>) => void;
  updateCategory: (id: string, cat: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addMember: (mem: Omit<Member, 'id'>) => void;
  updateMember: (id: string, mem: Partial<Member>) => void;
  deleteMember: (id: string) => void;
}

const mockMembers: Member[] = [
  { id: 'm1', name: '爸爸', color: '#1D9E75', lightColor: '#E1F5EE', isActive: true },
  { id: 'm2', name: '媽媽', color: '#E24B4A', lightColor: '#FCECEC', isActive: true },
  { id: 'm3', name: '大寶', color: '#378ADD', lightColor: '#E6F0FA', isActive: true },
];

const mockCategories: Category[] = [
  { id: 'c1', name: '餐飲', color: '#D85A30', lightColor: '#FBEBE5', isActive: true, sortOrder: 1 },
  { id: 'c2', name: '交通', color: '#378ADD', lightColor: '#E6F0FA', isActive: true, sortOrder: 2 },
  { id: 'c3', name: '水電瓦斯', color: '#EF9F27', lightColor: '#FDF4E6', isActive: true, sortOrder: 3 },
  { id: 'c4', name: '薪資', color: '#1D9E75', lightColor: '#E1F5EE', isActive: true, sortOrder: 4 },
];

const mockTransactions: Transaction[] = [
  { id: 't1', date: new Date().toISOString(), name: '全聯採買', amount: -1500, type: 'EXPENSE', categoryId: 'c1', memberId: 'm1' },
  { id: 't2', date: new Date().toISOString(), name: '五月薪水', amount: 80000, type: 'INCOME', categoryId: 'c4', memberId: 'm1' },
  { id: 't3', date: new Date(Date.now() - 86400000).toISOString(), name: '加油', amount: -1000, type: 'EXPENSE', categoryId: 'c2', memberId: 'm2' },
];

const mockBudgets: Budget[] = [
  { id: 'b1', yearMonth: '2026-05', amount: 15000, categoryId: 'c1' },
];

export const useAppStore = create<AppState>((set) => ({
  members: mockMembers,
  categories: mockCategories,
  transactions: mockTransactions,
  budgets: mockBudgets,

  addTransaction: (tx) => set((state) => ({
    transactions: [{ ...tx, id: uuidv4() }, ...state.transactions]
  })),

  updateTransaction: (id, updatedTx) => set((state) => ({
    transactions: state.transactions.map(t => t.id === id ? { ...t, ...updatedTx } : t)
  })),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),

  addCategory: (cat) => set((state) => ({
    categories: [...state.categories, { ...cat, id: uuidv4(), sortOrder: state.categories.length + 1 }]
  })),
  
  updateCategory: (id, updatedCat) => set((state) => ({
    categories: state.categories.map(c => c.id === id ? { ...c, ...updatedCat } : c)
  })),

  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter(c => c.id !== id)
  })),

  addMember: (mem) => set((state) => ({
    members: [...state.members, { ...mem, id: uuidv4() }]
  })),

  updateMember: (id, updatedMem) => set((state) => ({
    members: state.members.map(m => m.id === id ? { ...m, ...updatedMem } : m)
  })),

  deleteMember: (id) => set((state) => ({
    members: state.members.filter(m => m.id !== id)
  })),
}));
