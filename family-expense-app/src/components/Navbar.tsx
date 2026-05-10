import { Link, useLocation } from 'react-router-dom';
import { Home, List, PieChart, Settings, Wallet } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: '首頁總覽', icon: Home },
    { path: '/transactions', label: '交易記錄', icon: List },
    { path: '/budget', label: '預算管理', icon: Wallet },
    { path: '/analytics', label: '統計報表', icon: PieChart },
    { path: '/settings', label: '設定與管理', icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col py-8 px-4">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
          FA
        </div>
        <h1 className="text-xl font-bold text-gray-900">Family App</h1>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path) || (item.path === '/dashboard' && location.pathname === '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive 
                  ? 'bg-primary-light text-primary' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
