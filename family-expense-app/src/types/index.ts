export interface Category {
  id: string;
  name: string;
  color: string;
  lightColor: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Member {
  id: string;
  name: string;
  color: string;
  lightColor: string;
  isActive: boolean;
}

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  date: string; // ISO 8601
  name: string;
  amount: number; // 正=收入, 負=支出 (Spec定義)
  type: TransactionType;
  note?: string;
  categoryId: string;
  memberId: string;
}

export interface Budget {
  id: string;
  yearMonth: string; // "2026-05" 格式
  amount: number;
  categoryId: string;
}

export interface MonthlySummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  budgetUsageRate: number;
}
