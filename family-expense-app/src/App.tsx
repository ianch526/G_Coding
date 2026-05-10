import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import AnalyticsLayout from './pages/AnalyticsLayout';
import CategoryStats from './pages/Analytics/CategoryStats';
import MemberStats from './pages/Analytics/MemberStats';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/analytics" element={<AnalyticsLayout />}>
              <Route index element={<Navigate to="category" replace />} />
              <Route path="category" element={<CategoryStats />} />
              <Route path="member" element={<MemberStats />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
