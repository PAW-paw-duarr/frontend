import { Users, Layers, FileText, CheckCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { UserManagement } from './pages/user-management';

interface AdminLayoutProps {
  activeTab: 'user' | 'team' | 'title' | 'submission';
  setActiveTab: (tab: 'user' | 'team' | 'title' | 'submission') => void;
}

const menuItems = [
  { id: 'team', label: 'Tim Capstone', icon: Users },
  { id: 'title', label: 'Judul Capstone', icon: Layers },
  { id: 'submission', label: 'Pengajuan', icon: FileText },
  { id: 'user', label: 'User', icon: CheckCircle },
];

export function AdminLayout({ activeTab, setActiveTab }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">ReCapstone</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h2>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'user' && <UserManagement />}
          {activeTab === 'team' && (
            <div className="text-center py-8">
              <p className="text-gray-600">Fitur Tim Capstone sedang dalam pengembangan...</p>
            </div>
          )}
          {activeTab === 'title' && (
            <div className="text-center py-8">
              <p className="text-gray-600">Fitur Judul Capstone sedang dalam pengembangan...</p>
            </div>
          )}
          {activeTab === 'submission' && (
            <div className="text-center py-8">
              <p className="text-gray-600">Fitur Pengajuan sedang dalam pengembangan...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
