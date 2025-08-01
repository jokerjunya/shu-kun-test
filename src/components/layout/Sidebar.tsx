import React from 'react';

interface SidebarProps {
  activeSection?: string;
}

export function Sidebar({ activeSection = 'dashboard' }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: '全体ダッシュボード',
      icon: '📊',
      description: '全CSリスク状況'
    },
    {
      id: 'personal',
      label: 'マイビュー',
      icon: '👤',
      description: 'パーソナライズ表示'
    },
    {
      id: 'alerts',
      label: 'アラート管理',
      icon: '🚨',
      description: 'リスクアラート設定'
    },
    {
      id: 'analysis',
      label: '要因分析',
      icon: '🔍',
      description: 'SHAP + RAG分析'
    },
    {
      id: 'reports',
      label: 'レポート',
      icon: '📈',
      description: 'トレンド・予測'
    }
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full">
      {/* ナビゲーションメニュー */}
      <nav className="p-4 space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          メニュー
        </h2>
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === item.id
                ? 'bg-blue-100 text-blue-900 border-blue-200 border'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{item.icon}</span>
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* フィルタセクション */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          フィルタ
        </h3>
        
        {/* CS選択 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CS選択
          </label>
          <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
            <option>全てのCS</option>
            <option>CS-A チーム</option>
            <option>CS-B チーム</option>
            <option>CS-C チーム</option>
          </select>
        </div>

        {/* 期間選択 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            期間
          </label>
          <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
            <option>過去7日</option>
            <option>過去30日</option>
            <option>過去90日</option>
            <option>カスタム</option>
          </select>
        </div>

        {/* リスクレベル */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            リスクレベル
          </label>
          <div className="space-y-2">
            {['高', '中', '低'].map((level) => (
              <label key={level} className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}