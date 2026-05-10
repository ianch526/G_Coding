import { NavLink, Outlet } from 'react-router-dom';

export default function AnalyticsLayout() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">統計報表</h2>
      
      <div className="flex gap-4 border-b border-gray-200">
        <NavLink 
          to="/analytics/category" 
          className={({ isActive }) => 
            `pb-3 px-2 font-medium transition-colors border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-900'}`
          }
        >
          分類統計
        </NavLink>
        <NavLink 
          to="/analytics/member" 
          className={({ isActive }) => 
            `pb-3 px-2 font-medium transition-colors border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-gray-900'}`
          }
        >
          成員統計
        </NavLink>
      </div>

      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
}
