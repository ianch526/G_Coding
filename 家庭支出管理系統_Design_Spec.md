# 家庭支出管理系統 — 產品設計規格書

**文件版本：** v1.0  
**建立日期：** 2026-05-10  
**文件狀態：** Draft for Review  
**負責人：** Product Manager  
**目標讀者：** DevOps / Frontend / Backend 工程團隊

---

## 目錄

1. [產品概覽](#1-產品概覽)
2. [使用者故事與需求範圍](#2-使用者故事與需求範圍)
3. [系統架構](#3-系統架構)
4. [技術選型](#4-技術選型)
5. [前端架構設計](#5-前端架構設計)
6. [資料模型](#6-資料模型)
7. [API 設計規範](#7-api-設計規範)
8. [頁面與功能規格](#8-頁面與功能規格)
9. [UI/UX 設計系統](#9-uiux-設計系統)
10. [響應式設計 (RWD)](#10-響應式設計-rwd)
11. [狀態管理設計](#11-狀態管理設計)
12. [非功能性需求](#12-非功能性需求)
13. [安全性需求](#13-安全性需求)
14. [測試策略](#14-測試策略)
15. [部署與 CI/CD](#15-部署與-cicd)
16. [專案里程碑](#16-專案里程碑)

---

## 1. 產品概覽

### 1.1 產品定位

家庭支出管理系統是一套以家庭為單位的財務管理 Web 應用程式，協助家庭成員共同記錄、分析及管理日常收入與支出，達成家庭財務目標。

### 1.2 核心價值主張

| 面向 | 說明 |
|------|------|
| 共同管理 | 多成員協作記帳，各自記錄個人消費 |
| 即時洞察 | Dashboard 即時呈現家庭財務健康度 |
| 彈性設定 | 自訂分類、成員、預算上限 |
| 視覺化分析 | 圖表化呈現消費趨勢與結構 |

### 1.3 目標用戶

- **主要用戶：** 家庭財務管理者（通常為父母）
- **次要用戶：** 家庭成員（子女、長輩）
- **使用情境：** 日常記帳（行動裝置）、月底財務檢視（桌機）

### 1.4 版本範圍（v1.0）

本規格書涵蓋 v1.0 MVP 版本，包含以下核心模組：

- 總覽 Dashboard
- 交易記錄管理
- 預算管理
- 統計分析（分類 / 成員）
- 管理設定（分類管理 / 成員管理）

---

## 2. 使用者故事與需求範圍

### 2.1 Epic 清單

#### Epic 1：交易管理

```
US-101  身為家庭成員，我可以快速新增一筆支出或收入，
        以便隨時記錄消費行為。
        接受條件：
        - 必填欄位：金額、項目名稱、分類、成員、日期
        - 類型可切換（支出 / 收入）
        - 提交後即時更新 Dashboard 數字
        - 錯誤驗證：金額必須 > 0、日期格式正確

US-102  身為用戶，我可以查詢與篩選所有歷史交易記錄，
        以便追蹤特定消費。
        接受條件：
        - 可依分類、成員、日期區間篩選
        - 關鍵字搜尋（項目名稱、備註）
        - 結果依日期降冪排列
        - 顯示筆數統計

US-103  身為用戶，我可以編輯或刪除一筆已記錄的交易，
        以便修正錯誤。
        接受條件：
        - 點擊交易列可進入編輯模式
        - 刪除前顯示確認 Dialog
        - 操作後畫面即時更新
```

#### Epic 2：預算管理

```
US-201  身為家庭管理者，我可以為每個分類設定月度預算上限，
        以便控制各類別消費。
        接受條件：
        - 可設定每個分類的預算金額
        - 以進度條視覺化呈現使用率
        - 達 70% 顯示橘色警示，達 90% 顯示紅色警示

US-202  身為用戶，我希望在預算即將超支時收到提醒，
        以便及時調整消費習慣。
        接受條件：
        - 當分類消費達預算 90% 時，Dashboard 顯示警示卡片
        - 支援瀏覽器推播通知（需用戶授權）
```

#### Epic 3：統計分析

```
US-301  身為用戶，我可以查看各分類的消費統計，
        以便了解家庭主要支出結構。
        接受條件：
        - 顯示各分類金額、佔比、進度條
        - 圓餅圖呈現分類佔比
        - 折線圖呈現近 6 個月分類趨勢

US-302  身為用戶，我可以查看各成員的消費統計，
        以便了解每位家庭成員的消費習慣。
        接受條件：
        - 顯示各成員總支出及佔比
        - 堆疊柱狀圖呈現成員的分類消費明細
        - 圓餅圖呈現成員消費佔比
```

#### Epic 4：管理設定

```
US-401  身為管理者，我可以自訂消費分類（新增 / 刪除），
        以便符合家庭的實際消費結構。
        接受條件：
        - 可新增分類並指定顏色
        - 刪除時若有關聯交易，需顯示警告
        - 至少保留一個分類

US-402  身為管理者，我可以管理家庭成員（新增 / 刪除），
        以便記錄誰花了哪筆費用。
        接受條件：
        - 可新增成員並指定代表顏色
        - 刪除時若有關聯交易，需顯示警告
        - 至少保留一個成員
```

### 2.2 Out of Scope（v1.0 不包含）

- 多家庭帳號 / 家庭邀請機制
- 銀行帳戶串接（Open Banking）
- 發票掃描 OCR
- 資產管理（股票、房產）
- 財務目標設定

---

## 3. 系統架構

### 3.1 整體架構圖

```
┌─────────────────────────────────────────────────────┐
│                   Client Layer                      │
│         React SPA (Vite + TypeScript)               │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│  │  Pages   │ │Components│ │  State (Zustand)      │ │
│  └──────────┘ └──────────┘ └──────────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS / REST API
┌──────────────────────▼──────────────────────────────┐
│                  API Gateway Layer                  │
│              Nginx Reverse Proxy / CDN              │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                 Application Layer                   │
│           Node.js + Express (TypeScript)            │
│  ┌──────────────┐          ┌───────────────────┐    │
│  │  REST API    │          │  Auth Middleware   │    │
│  │  Controllers │          │  (JWT + bcrypt)    │    │
│  └──────────────┘          └───────────────────┘    │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                  Data Layer                         │
│  ┌──────────────────┐   ┌──────────────────────┐    │
│  │  PostgreSQL       │   │  Redis (Session /    │    │
│  │  (Primary DB)     │   │   Cache)             │    │
│  └──────────────────┘   └──────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### 3.2 部署架構

```
Internet → CloudFlare CDN
                ↓
         Load Balancer (Nginx)
          ↙            ↘
  Web Server 1     Web Server 2   (Node.js, 水平擴展)
          ↘            ↙
       PostgreSQL Primary
              ↓
       PostgreSQL Replica  (讀取分流)
```

### 3.3 環境規劃

| 環境 | 用途 | Branch |
|------|------|--------|
| Development | 本地開發 | `feature/*` |
| Staging | QA 測試 / UAT | `develop` |
| Production | 正式上線 | `main` |

---

## 4. 技術選型

### 4.1 前端技術棧

| 項目 | 技術 | 版本 | 說明 |
|------|------|------|------|
| 框架 | React | 18.x | Functional Components + Hooks |
| 建置工具 | Vite | 5.x | 快速 HMR、優化打包 |
| 語言 | TypeScript | 5.x | 強型別、提升可維護性 |
| 狀態管理 | Zustand | 4.x | 輕量、無 boilerplate |
| 路由 | React Router | 6.x | SPA 路由管理 |
| UI 元件庫 | shadcn/ui | latest | 基於 Radix UI，高度可客製化 |
| 樣式 | Tailwind CSS | 3.x | Utility-first，RWD 友善 |
| 圖表 | Recharts | 2.x | React-native 圖表庫 |
| HTTP Client | Axios | 1.x | 攔截器、型別支援 |
| 表單驗證 | React Hook Form + Zod | latest | 高效能表單 + schema 驗證 |
| 日期處理 | date-fns | 3.x | 輕量日期工具 |
| 測試 | Vitest + Testing Library | latest | 單元與整合測試 |

### 4.2 後端技術棧

| 項目 | 技術 | 版本 |
|------|------|------|
| 執行環境 | Node.js | 20 LTS |
| 框架 | Express.js | 4.x |
| 語言 | TypeScript | 5.x |
| ORM | Prisma | 5.x |
| 資料庫 | PostgreSQL | 16.x |
| 快取 | Redis | 7.x |
| 認證 | JWT + bcryptjs | - |
| 文件 | Swagger / OpenAPI 3.0 | - |
| 測試 | Jest + Supertest | - |

### 4.3 DevOps 工具鏈

| 項目 | 技術 |
|------|------|
| 容器化 | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| 容器編排 | Kubernetes (生產) / Docker Compose (開發) |
| 監控 | Prometheus + Grafana |
| 日誌 | Winston + ELK Stack |
| 版控 | Git (GitHub) |
| 程式碼品質 | ESLint + Prettier + Husky |

---

## 5. 前端架構設計

### 5.1 專案目錄結構

```
src/
├── assets/                  # 靜態資源（圖示、圖片）
├── components/              # 共用元件
│   ├── ui/                  # shadcn/ui 基礎元件
│   ├── charts/              # 圖表元件
│   │   ├── TrendLineChart.tsx
│   │   ├── CategoryDonut.tsx
│   │   ├── MemberStackBar.tsx
│   │   └── InOutBarChart.tsx
│   ├── layout/              # 版面元件
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileNav.tsx
│   └── shared/              # 跨頁共用
│       ├── SummaryCard.tsx
│       ├── TransactionModal.tsx
│       ├── CategoryBadge.tsx
│       ├── MemberAvatar.tsx
│       ├── BudgetProgressBar.tsx
│       └── ConfirmDialog.tsx
├── pages/                   # 頁面元件（對應路由）
│   ├── Dashboard/
│   │   └── index.tsx
│   ├── Transactions/
│   │   └── index.tsx
│   ├── Budget/
│   │   └── index.tsx
│   ├── Analytics/
│   │   ├── index.tsx
│   │   ├── CategoryStats.tsx
│   │   └── MemberStats.tsx
│   └── Settings/
│       ├── index.tsx
│       ├── CategoryManage.tsx
│       └── MemberManage.tsx
├── store/                   # Zustand 狀態
│   ├── useTransactionStore.ts
│   ├── useBudgetStore.ts
│   ├── useCategoryStore.ts
│   ├── useMemberStore.ts
│   └── useUIStore.ts
├── hooks/                   # Custom Hooks
│   ├── useTransactions.ts
│   ├── useMonthlySummary.ts
│   ├── useCategoryStats.ts
│   └── useMemberStats.ts
├── services/                # API 呼叫層
│   ├── api.ts               # Axios instance
│   ├── transactionService.ts
│   ├── budgetService.ts
│   ├── categoryService.ts
│   └── memberService.ts
├── types/                   # TypeScript 型別定義
│   └── index.ts
├── utils/                   # 工具函式
│   ├── formatCurrency.ts
│   ├── formatDate.ts
│   └── calcStats.ts
├── constants/               # 常數定義
│   └── index.ts
├── router/                  # 路由設定
│   └── index.tsx
└── main.tsx                 # 應用程式入口
```

### 5.2 路由設計

```typescript
// router/index.tsx
const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'budget', element: <Budget /> },
      {
        path: 'analytics',
        element: <Analytics />,
        children: [
          { index: true, element: <Navigate to="category" /> },
          { path: 'category', element: <CategoryStats /> },
          { path: 'member', element: <MemberStats /> },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          { index: true, element: <Navigate to="categories" /> },
          { path: 'categories', element: <CategoryManage /> },
          { path: 'members', element: <MemberManage /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '*', element: <NotFound /> },
];
```

### 5.3 元件設計規範

#### 元件命名規則

- **頁面元件：** PascalCase，置於 `pages/` 目錄，每頁獨立資料夾
- **共用元件：** PascalCase，置於 `components/` 目錄
- **Hook：** camelCase，以 `use` 開頭

#### 元件結構模板

```typescript
// components/shared/TransactionModal.tsx
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionSchema, TransactionFormData } from '@/types'
import { useTransactionStore } from '@/store/useTransactionStore'

interface TransactionModalProps {
  open: boolean
  onClose: () => void
  editTarget?: Transaction | null
}

const TransactionModal: FC<TransactionModalProps> = ({ open, onClose, editTarget }) => {
  // 1. Hooks（固定順序：store → form → local state → effects）
  const { addTransaction, updateTransaction } = useTransactionStore()
  const form = useForm<TransactionFormData>({ resolver: zodResolver(transactionSchema) })

  // 2. Event Handlers
  const handleSubmit = async (data: TransactionFormData) => { ... }

  // 3. Render
  return ( ... )
}

export default TransactionModal
```

---

## 6. 資料模型

### 6.1 資料庫 Schema（PostgreSQL + Prisma）

```prisma
// schema.prisma

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  displayName  String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  family       Family?  @relation(fields: [familyId], references: [id])
  familyId     String?
}

model Family {
  id           String       @id @default(cuid())
  name         String
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  members      Member[]
  categories   Category[]
  transactions Transaction[]
  budgets      Budget[]
  users        User[]
}

model Member {
  id           String        @id @default(cuid())
  name         String
  color        String        // HEX 色碼
  lightColor   String        // 淡色版（badge 背景）
  isActive     Boolean       @default(true)
  family       Family        @relation(fields: [familyId], references: [id])
  familyId     String
  transactions Transaction[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Category {
  id           String        @id @default(cuid())
  name         String
  color        String
  lightColor   String
  icon         String?       // Tabler icon name
  isActive     Boolean       @default(true)
  sortOrder    Int           @default(0)
  family       Family        @relation(fields: [familyId], references: [id])
  familyId     String
  transactions Transaction[]
  budgets      Budget[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Transaction {
  id         String           @id @default(cuid())
  date       DateTime
  name       String
  amount     Decimal          @db.Decimal(12, 2)  // 正=收入, 負=支出
  type       TransactionType  // INCOME | EXPENSE
  note       String?
  family     Family           @relation(fields: [familyId], references: [id])
  familyId   String
  category   Category         @relation(fields: [categoryId], references: [id])
  categoryId String
  member     Member           @relation(fields: [memberId], references: [id])
  memberId   String
  createdAt  DateTime         @default(now())
  updatedAt  DateTime         @updatedAt

  @@index([familyId, date])
  @@index([familyId, categoryId])
  @@index([familyId, memberId])
}

model Budget {
  id         String   @id @default(cuid())
  yearMonth  String   // "2026-05" 格式
  amount     Decimal  @db.Decimal(12, 2)
  family     Family   @relation(fields: [familyId], references: [id])
  familyId   String
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([familyId, categoryId, yearMonth])
}

enum TransactionType {
  INCOME
  EXPENSE
}
```

### 6.2 前端型別定義

```typescript
// types/index.ts

export interface Transaction {
  id: string
  date: string           // ISO 8601
  name: string
  amount: number         // 正=收入, 負=支出
  type: 'INCOME' | 'EXPENSE'
  note?: string
  categoryId: string
  memberId: string
  category: Category
  member: Member
  createdAt: string
}

export interface Category {
  id: string
  name: string
  color: string
  lightColor: string
  icon?: string
  isActive: boolean
  sortOrder: number
}

export interface Member {
  id: string
  name: string
  color: string
  lightColor: string
  isActive: boolean
}

export interface Budget {
  id: string
  yearMonth: string
  amount: number
  categoryId: string
  category: Category
  spent: number          // 計算欄位（非資料庫儲存）
}

export interface MonthlySummary {
  totalIncome: number
  totalExpense: number
  balance: number
  budgetUsageRate: number
}

export interface CategoryStat {
  category: Category
  amount: number
  percentage: number
  transactionCount: number
}

export interface MemberStat {
  member: Member
  amount: number
  percentage: number
  byCategory: { category: Category; amount: number }[]
}
```

---

## 7. API 設計規範

### 7.1 Base URL 與版本

```
Production:  https://api.family-expense.app/v1
Staging:     https://staging-api.family-expense.app/v1
Development: http://localhost:3001/v1
```

### 7.2 通用規則

- 使用 RESTful 設計原則
- 所有請求 / 回應使用 JSON
- 使用 JWT Bearer Token 認證
- 時間格式統一使用 ISO 8601（UTC）
- 金額以整數（分）傳輸，前端做格式化

### 7.3 回應結構

```json
// 成功回應
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 150
  }
}

// 錯誤回應
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "金額必須大於 0",
    "details": [
      { "field": "amount", "message": "必須為正數" }
    ]
  }
}
```

### 7.4 API Endpoints

#### 認證

| Method | Endpoint | 說明 |
|--------|----------|------|
| POST | `/auth/register` | 用戶註冊 |
| POST | `/auth/login` | 用戶登入，回傳 JWT |
| POST | `/auth/refresh` | 刷新 Token |
| POST | `/auth/logout` | 登出（黑名單 Token） |

#### 交易記錄

| Method | Endpoint | 說明 |
|--------|----------|------|
| GET | `/transactions` | 取得交易列表（支援篩選、分頁） |
| POST | `/transactions` | 新增交易 |
| GET | `/transactions/:id` | 取得單筆交易 |
| PUT | `/transactions/:id` | 更新交易 |
| DELETE | `/transactions/:id` | 刪除交易 |
| GET | `/transactions/summary` | 取得月份彙總（收支合計） |

**GET /transactions Query Parameters：**

```
date_from    string    起始日期（YYYY-MM-DD）
date_to      string    結束日期（YYYY-MM-DD）
category_id  string    分類 ID
member_id    string    成員 ID
type         string    INCOME | EXPENSE
keyword      string    關鍵字搜尋
page         integer   頁碼（預設 1）
page_size    integer   每頁筆數（預設 20，最大 100）
sort         string    date_desc | date_asc | amount_desc（預設 date_desc）
```

#### 預算

| Method | Endpoint | 說明 |
|--------|----------|------|
| GET | `/budgets` | 取得指定月份預算列表 |
| PUT | `/budgets` | 批次更新月份預算 |
| GET | `/budgets/:yearMonth/overview` | 取得月份預算使用概況 |

#### 統計分析

| Method | Endpoint | 說明 |
|--------|----------|------|
| GET | `/analytics/category` | 分類消費統計 |
| GET | `/analytics/member` | 成員消費統計 |
| GET | `/analytics/trend` | 月度收支趨勢（近 N 個月） |
| GET | `/analytics/member-category` | 成員 × 分類交叉分析 |

**GET /analytics/category Query Parameters：**

```
year_month   string    查詢月份（YYYY-MM，預設本月）
```

#### 分類管理

| Method | Endpoint | 說明 |
|--------|----------|------|
| GET | `/categories` | 取得所有分類 |
| POST | `/categories` | 新增分類 |
| PUT | `/categories/:id` | 更新分類 |
| DELETE | `/categories/:id` | 刪除分類 |
| PATCH | `/categories/reorder` | 更新分類排序 |

#### 成員管理

| Method | Endpoint | 說明 |
|--------|----------|------|
| GET | `/members` | 取得所有成員 |
| POST | `/members` | 新增成員 |
| PUT | `/members/:id` | 更新成員 |
| DELETE | `/members/:id` | 刪除成員（軟刪除） |

---

## 8. 頁面與功能規格

### 8.1 頁面清單

| 路由 | 頁面名稱 | 說明 |
|------|----------|------|
| `/` | Dashboard 總覽 | 核心數字卡片、趨勢圖、最近交易 |
| `/transactions` | 交易記錄 | 完整交易清單、篩選、搜尋 |
| `/budget` | 預算管理 | 各分類預算設定與進度 |
| `/analytics/category` | 分類統計 | 分類消費排行、佔比、趨勢 |
| `/analytics/member` | 成員統計 | 成員消費排行、佔比、交叉分析 |
| `/settings/categories` | 分類管理 | 新增／刪除分類及顏色設定 |
| `/settings/members` | 成員管理 | 新增／刪除成員及顏色設定 |

### 8.2 Dashboard 總覽規格

**摘要卡片區（4欄 → 行動版 2欄）**

| 卡片 | 計算邏輯 | 警示條件 |
|------|----------|----------|
| 本月支出 | 當月所有 EXPENSE 金額總和 | 超過預算 90% 顯示紅色 |
| 本月收入 | 當月所有 INCOME 金額總和 | 無 |
| 本月結餘 | 收入 - 支出 | 結餘為負顯示紅色 |
| 預算使用率 | 支出 / 總預算 × 100% | 70%+ 橘色、90%+ 紅色 |

**圖表區**

- 左側：每月收支趨勢折線圖（近 6 個月，收入虛線 / 支出實線）
- 右側：本月支出分類圓餅圖（含動態圖例）

**列表區**

- 左側：最近 5 筆交易（含分類 badge、成員頭像、金額顏色）
- 右側：預算進度條（依使用率排序，紅色優先）

### 8.3 交易記錄規格

**篩選工具列**

- 關鍵字搜尋（debounce 300ms）
- 分類下拉選單（多選）
- 成員下拉選單（多選）
- 日期區間選擇器（DateRangePicker）
- 類型切換（全部 / 收入 / 支出）
- 結果筆數顯示

**交易列表**

| 欄位 | 說明 |
|------|------|
| 日期 | MM/DD 格式，同日交易合併顯示日期列 |
| 項目名稱 | 最多 20 字，超出省略 |
| 分類 | 色彩 Badge |
| 成員 | 彩色頭像（取名稱首字） |
| 備註 | 最多 30 字，可選 |
| 金額 | 支出紅色含負號、收入綠色含正號 |
| 操作 | 編輯 / 刪除 Icon（hover 顯示） |

**分頁：** 每頁 20 筆，Infinite scroll（行動版）/ 頁碼（桌機版）

### 8.4 新增 / 編輯交易 Modal 規格

**欄位規格**

| 欄位 | 類型 | 驗證規則 | 必填 |
|------|------|----------|------|
| 類型 | 切換按鈕 | - | ✅ |
| 金額 | 數字輸入 | > 0，最多 2 位小數 | ✅ |
| 項目名稱 | 文字輸入 | 1~50 字元 | ✅ |
| 分類 | 下拉選單 | 必須為有效分類 | ✅ |
| 成員 | 下拉選單 | 必須為有效成員 | ✅ |
| 日期 | 日期選擇 | 不可超過今日 | ✅ |
| 備註 | 文字輸入 | 最多 100 字元 | ❌ |

**互動行為**
- 送出前執行 client-side 驗證
- 送出中顯示 loading 狀態，禁用送出按鈕
- 成功後關閉 Modal 並顯示 Toast 通知
- 失敗時顯示錯誤訊息於欄位下方

### 8.5 統計分析規格

#### 分類統計頁

- **統計橫條列表：** 分類名稱、進度條（相對最大值）、佔比百分比、金額
- **圓餅圖：** 互動式，hover 顯示金額與百分比
- **月度趨勢折線圖：** 近 6 個月，前 4 大分類顯示折線，其餘歸入「其他」
- **篩選：** 月份選擇器（預設本月）

#### 成員統計頁

- **成員消費排行：** 頭像、姓名、進度條、佔比、金額
- **圓餅圖：** 成員消費佔比
- **堆疊柱狀圖：** X 軸為成員，各分類作為堆疊層，hover 顯示明細
- **成員詳細展開：** 點擊成員可展開其分類明細列表

### 8.6 管理設定規格

#### 分類管理

**分類卡片包含：** 顏色圓點、名稱、刪除按鈕

**新增分類流程：**
1. 輸入分類名稱（1~10 字元，不可重複）
2. 從色盤選擇主色（10 種預設色）
3. 點擊「新增」→ 即時更新列表

**刪除分類規則：**
- 無關聯交易：直接刪除
- 有關聯交易：顯示警告 Dialog「此分類有 N 筆交易，刪除後交易將歸類為『其他』，確定繼續？」
- 最少保留 1 個分類

#### 成員管理

規格同分類管理，名稱上限 6 字元。

---

## 9. UI/UX 設計系統

### 9.1 色彩系統

```css
:root {
  /* Brand Colors */
  --color-primary:         #0F6E56;  /* 主要品牌綠 */
  --color-primary-light:   #E1F5EE;
  --color-primary-hover:   #085041;

  /* Semantic Colors */
  --color-income:          #1D9E75;  /* 收入綠 */
  --color-expense:         #E24B4A;  /* 支出紅 */
  --color-warning:         #EF9F27;  /* 警告橘 */
  --color-info:            #378ADD;  /* 資訊藍 */

  /* Budget Alert */
  --color-budget-safe:     #1D9E75;  /* < 70% */
  --color-budget-warn:     #EF9F27;  /* 70-89% */
  --color-budget-danger:   #E24B4A;  /* ≥ 90% */

  /* Neutral */
  --color-gray-50:  #F8F9FA;
  --color-gray-100: #F1F3F5;
  --color-gray-200: #E9ECEF;
  --color-gray-600: #868E96;
  --color-gray-900: #212529;

  /* Chart Palette（10色，支援深色模式）*/
  --chart-1: #1D9E75;
  --chart-2: #378ADD;
  --chart-3: #D85A30;
  --chart-4: #EF9F27;
  --chart-5: #E24B4A;
  --chart-6: #7F77DD;
  --chart-7: #888780;
  --chart-8: #D4537E;
  --chart-9: #639922;
  --chart-10: #BA7517;
}
```

### 9.2 Typography

```css
/* 使用 Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap');

:root {
  --font-sans: 'Noto Sans TC', sans-serif;

  /* Scale */
  --text-xs:   12px;  /* 標籤、輔助說明 */
  --text-sm:   13px;  /* 表格內文、Badge */
  --text-base: 15px;  /* 正文 */
  --text-lg:   17px;  /* 小標題 */
  --text-xl:   20px;  /* 頁面標題 */
  --text-2xl:  24px;  /* 數字卡片數值 */
  --text-3xl:  32px;  /* 大數字展示 */

  /* Weight */
  --weight-normal:  400;
  --weight-medium:  500;
  --weight-bold:    700;
}
```

### 9.3 間距系統

使用 Tailwind CSS 4 的間距比例，以 4px 為基礎單位。

```
2  →  8px    （元件內部 padding）
3  →  12px   （欄位間距）
4  →  16px   （元件間距）
5  →  20px   （區塊內部）
6  →  24px   （區塊間距）
8  →  32px   （頁面區段間距）
```

### 9.4 陰影與圓角

```css
:root {
  --radius-sm:  6px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  16px;
  --radius-full: 9999px;  /* Badge、Avatar */

  --shadow-sm:  0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg:  0 8px 24px rgba(0,0,0,0.12);
}
```

### 9.5 元件規格

#### SummaryCard 摘要卡片

```
背景：var(--color-gray-50)
圓角：--radius-lg
Padding：16px 20px
Label：12px / medium / gray-600
Value：24px / bold / gray-900
Sub：12px / normal / 語意色彩
```

#### CategoryBadge 分類標籤

```
背景：category.lightColor
字色：category.color
Padding：2px 10px
圓角：--radius-full
字體：12px / medium
```

#### MemberAvatar 成員頭像

```
尺寸：32×32px（列表）/ 40×40px（詳情）
形狀：圓形
背景：member.lightColor
字色：member.color
字體：取名稱首字，12px / medium
```

#### BudgetProgressBar 預算進度條

```
高度：8px
背景：gray-100
填充色：動態（safe / warn / danger）
圓角：--radius-full
動畫：width transition 0.4s ease
```

---

## 10. 響應式設計 (RWD)

### 10.1 斷點定義

| 斷點名稱 | 寬度 | 目標裝置 |
|----------|------|----------|
| `xs` | < 480px | 小螢幕手機 |
| `sm` | 480px+ | 一般手機 |
| `md` | 768px+ | 平板 / 折疊手機 |
| `lg` | 1024px+ | 小型桌機 / 大平板 |
| `xl` | 1280px+ | 一般桌機 |
| `2xl` | 1536px+ | 大型桌機 |

### 10.2 版面自適應規格

#### 導航列

| 裝置 | 呈現方式 |
|------|----------|
| Desktop (lg+) | 左側 Sidebar（固定寬度 240px） |
| Tablet (md) | 左側 Sidebar（可收合，icon-only 模式） |
| Mobile (< md) | 底部 Tab Bar（最多 5 個 Tab） |

#### Dashboard 卡片區

| 裝置 | 欄數 |
|------|------|
| Desktop | 4 欄 |
| Tablet | 2 欄 |
| Mobile | 2 欄（數字縮小） |

#### 圖表區

| 裝置 | 佈局 |
|------|------|
| Desktop | 左右 2 欄 |
| Tablet | 左右 2 欄（縮小） |
| Mobile | 上下堆疊 1 欄 |

#### 交易列表

| 裝置 | 呈現方式 |
|------|----------|
| Desktop | 完整 6 欄表格 |
| Tablet | 5 欄（隱藏備註欄） |
| Mobile | 卡片式列表（2 列：名稱+分類 / 成員+金額） |

#### 新增交易 Modal

| 裝置 | 呈現方式 |
|------|----------|
| Desktop / Tablet | 置中 Modal（寬 400px） |
| Mobile | 底部 Sheet（100% 寬，上滑展開） |

### 10.3 觸控優化

- 所有可點擊元素最小觸控區域：44×44px
- 行動版列表項目支援左滑出現「刪除」快捷鍵
- 圖表在觸控裝置支援 tap 觸發 tooltip
- 日期選擇器在行動版使用 native `<input type="date">`

---

## 11. 狀態管理設計

### 11.1 Store 架構

```typescript
// store/useTransactionStore.ts
interface TransactionState {
  transactions: Transaction[]
  filters: TransactionFilters
  pagination: PaginationState
  isLoading: boolean
  error: string | null
  // Actions
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>
  addTransaction: (data: CreateTransactionDto) => Promise<void>
  updateTransaction: (id: string, data: UpdateTransactionDto) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  setFilters: (filters: Partial<TransactionFilters>) => void
  resetFilters: () => void
}

// store/useCategoryStore.ts
interface CategoryState {
  categories: Category[]
  isLoading: boolean
  fetchCategories: () => Promise<void>
  addCategory: (data: CreateCategoryDto) => Promise<void>
  updateCategory: (id: string, data: UpdateCategoryDto) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  reorderCategories: (ids: string[]) => Promise<void>
}

// store/useUIStore.ts
interface UIState {
  transactionModalOpen: boolean
  editingTransaction: Transaction | null
  sidebarCollapsed: boolean
  // Actions
  openTransactionModal: (target?: Transaction) => void
  closeTransactionModal: () => void
  toggleSidebar: () => void
}
```

### 11.2 資料流

```
User Action
    ↓
Component calls Store Action
    ↓
Store Action calls API Service
    ↓
API Service sends HTTP Request
    ↓
Response updates Store State
    ↓
Component re-renders via Zustand subscription
```

### 11.3 快取策略

- 分類列表 / 成員列表：應用程式啟動時載入，變更時重新拉取
- 交易列表：依篩選條件快取，頁籤切換時保留
- Dashboard 摘要：每次進入頁面重新拉取（最新數據優先）
- 統計分析：月份變更時重新拉取

---

## 12. 非功能性需求

### 12.1 效能目標

| 指標 | 目標值 |
|------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI) | < 3s |
| API Response Time (P95) | < 300ms |
| API Response Time (P99) | < 1s |
| 頁面 Bundle Size（gzip） | < 300KB |

### 12.2 無障礙設計 (Accessibility)

- 符合 WCAG 2.1 Level AA 標準
- 色彩對比度 ≥ 4.5:1（正文）/ 3:1（大型文字）
- 所有互動元件支援鍵盤操作（Tab / Enter / Esc）
- 表單欄位具備明確的 `label` 與 `aria-describedby`
- 圖表提供 `aria-label` 及文字摘要
- 動態內容更新使用 `aria-live` 區域

### 12.3 瀏覽器相容性

| 瀏覽器 | 最低版本 |
|--------|----------|
| Chrome | 100+ |
| Safari | 15+ |
| Firefox | 100+ |
| Edge | 100+ |
| iOS Safari | 15+ |
| Android Chrome | 100+ |

### 12.4 資料保留政策

- 交易記錄：永久保留（不自動刪除）
- 系統日誌：保留 90 天
- 備份頻率：每日增量備份、每週完整備份

---

## 13. 安全性需求

### 13.1 認證與授權

- 使用 JWT（Access Token 15 分鐘有效期）+ Refresh Token（30 天）
- Refresh Token 儲存於 HttpOnly Cookie
- 支援 Token Rotation（每次 Refresh 換發新 Token）
- 實作 Token Blacklist（使用 Redis）

### 13.2 API 安全

- 所有 API 需 JWT 認證（除 `/auth/*`）
- 實作 Rate Limiting（每 IP 每分鐘 100 次請求）
- 輸入值驗證使用 Zod（前端）/ Joi 或 class-validator（後端）
- 防止 SQL Injection：使用 Prisma ORM Prepared Statements
- CORS 白名單設定
- HTTPS 強制（HSTS Header）

### 13.3 資料隔離

- 每個 Family 的資料完全隔離
- API 層強制驗證請求者的 familyId 與資源 familyId 一致
- 刪除操作使用軟刪除（`isActive: false`），保留稽核軌跡

### 13.4 敏感資料處理

- 密碼使用 bcrypt（cost factor: 12）雜湊儲存
- 不在 API 回應中包含密碼 Hash
- 日誌中不記錄金融數據

---

## 14. 測試策略

### 14.1 測試層級

```
E2E Tests (Playwright)
    ↑ 核心用戶流程
Integration Tests (Vitest + MSW)
    ↑ API 整合、Store 流程
Unit Tests (Vitest + Testing Library)
    ↑ 元件、Hook、工具函式
```

### 14.2 測試覆蓋率目標

| 層級 | 目標覆蓋率 |
|------|----------|
| 工具函式 (utils) | ≥ 90% |
| Store / Hook | ≥ 80% |
| UI 元件 | ≥ 70% |
| E2E 核心流程 | 100% |

### 14.3 E2E 核心測試情境

1. 用戶登入 → 進入 Dashboard
2. 新增支出交易 → 確認 Dashboard 數字更新
3. 篩選交易記錄 → 確認結果正確
4. 設定預算 → 確認進度條顯示
5. 新增自訂分類 → 確認出現在交易新增下拉選單
6. 新增成員 → 確認出現在成員統計

### 14.4 測試執行時機

- `pre-push` Git Hook：單元測試 + Lint
- PR Merge 到 `develop`：完整測試套件
- 部署到 Staging 後：E2E 測試
- 部署到 Production 後：Smoke Test

---

## 15. 部署與 CI/CD

### 15.1 CI/CD 流程

```
Push to Branch
    ↓
GitHub Actions Trigger
    ↓
┌─────────────────────┐
│  CI Pipeline        │
│  1. Install deps    │
│  2. Type check      │
│  3. Lint            │
│  4. Unit tests      │
│  5. Build           │
└─────────┬───────────┘
          │ (develop branch only)
          ↓
┌─────────────────────┐
│  Deploy to Staging  │
│  1. Build Docker    │
│  2. Push to Registry│
│  3. K8s rolling     │
│     update          │
│  4. Run E2E tests   │
└─────────┬───────────┘
          │ (manual approval)
          ↓
┌─────────────────────┐
│  Deploy to Prod     │
│  1. Tag release     │
│  2. K8s rolling     │
│     update          │
│  3. Smoke test      │
│  4. Notify team     │
└─────────────────────┘
```

### 15.2 Docker 設定

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### 15.3 環境變數管理

| 變數 | 說明 | 儲存位置 |
|------|------|----------|
| `VITE_API_BASE_URL` | API Base URL | GitHub Actions Secret |
| `DATABASE_URL` | PostgreSQL 連線字串 | K8s Secret |
| `REDIS_URL` | Redis 連線字串 | K8s Secret |
| `JWT_SECRET` | JWT 簽名密鑰 | K8s Secret |
| `JWT_REFRESH_SECRET` | Refresh Token 密鑰 | K8s Secret |

### 15.4 監控與告警

- **APM：** 使用 Prometheus 收集 API 延遲、錯誤率、吞吐量
- **前端監控：** Sentry 捕捉 JS 錯誤與 Performance 指標
- **告警規則：**
  - API P99 延遲 > 2s 持續 5 分鐘 → PagerDuty
  - 錯誤率 > 5% 持續 2 分鐘 → Slack 告警
  - 磁碟使用率 > 80% → Email 告警

---

## 16. 專案里程碑

### Sprint 規劃（2 週一個 Sprint）

| Sprint | 目標 | 預計交付物 |
|--------|------|------------|
| Sprint 1 | 基礎建設 | 專案骨架、CI/CD、DB Schema、Auth API |
| Sprint 2 | 核心功能一 | 分類 / 成員 CRUD、新增交易 API |
| Sprint 3 | 核心功能二 | Dashboard UI、交易列表 UI |
| Sprint 4 | 進階功能一 | 預算管理、統計分析 API |
| Sprint 5 | 進階功能二 | 統計分析 UI、設定頁面 UI |
| Sprint 6 | 品質衝刺 | E2E 測試、效能優化、Bug fix |
| Sprint 7 | UAT & 上線 | Staging 驗收、生產部署、文件整理 |

**預計總工期：14 週（3.5 個月）**

### 驗收標準（Definition of Done）

- [ ] 功能符合規格書描述
- [ ] 單元測試覆蓋率達目標
- [ ] Lighthouse Performance 分數 ≥ 85
- [ ] 無 WCAG AA 嚴重違規
- [ ] Code Review 通過（至少 1 位 Reviewer）
- [ ] Staging 環境 E2E 測試全通過
- [ ] API 文件（Swagger）完整更新

---

*文件結束。如有疑問請聯繫 Product Manager。*
