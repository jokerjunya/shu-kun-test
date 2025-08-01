'use client';

import React, { useState } from 'react';

interface CSRiskData {
  id: string;
  name: string;
  manager: string;
  nonComplianceRate: number;
  complaintsCount: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  trend: 'up' | 'down' | 'neutral';
}

const mockCSData: CSRiskData[] = [
  {
    id: 'cs-001',
    name: 'CS-Alpha',
    manager: '田中 太郎',
    nonComplianceRate: 12.4,
    complaintsCount: 8,
    riskLevel: 'high',
    lastUpdated: '2025-08-01 15:30',
    trend: 'up'
  },
  {
    id: 'cs-002',
    name: 'CS-Beta',
    manager: '佐藤 花子',
    nonComplianceRate: 13.7,
    complaintsCount: 12,
    riskLevel: 'critical',
    lastUpdated: '2025-08-01 15:25',
    trend: 'up'
  },
  {
    id: 'cs-003',
    name: 'CS-Gamma',
    manager: '鈴木 次郎',
    nonComplianceRate: 14.1,
    complaintsCount: 15,
    riskLevel: 'critical',
    lastUpdated: '2025-08-01 15:20',
    trend: 'down'
  },
  {
    id: 'cs-004',
    name: 'CS-Delta',
    manager: '高橋 美咲',
    nonComplianceRate: 6.8,
    complaintsCount: 3,
    riskLevel: 'medium',
    lastUpdated: '2025-08-01 15:15',
    trend: 'neutral'
  },
  {
    id: 'cs-005',
    name: 'CS-Echo',
    manager: '山田 和子',
    nonComplianceRate: 3.2,
    complaintsCount: 1,
    riskLevel: 'low',
    lastUpdated: '2025-08-01 15:10',
    trend: 'down'
  }
];

export function CSRiskGrid() {
  const [sortBy, setSortBy] = useState<keyof CSRiskData>('nonComplianceRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (column: keyof CSRiskData) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...mockCSData].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const getRiskBadge = (level: CSRiskData['riskLevel']) => {
    const styles = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      low: '低',
      medium: '中',
      high: '高',
      critical: '緊急'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[level]}`}>
        {labels[level]}
      </span>
    );
  };

  const getTrendIcon = (trend: CSRiskData['trend']) => {
    const icons = {
      up: '↗',
      down: '↘',
      neutral: '→'
    };
    
    const colors = {
      up: 'text-red-500',
      down: 'text-green-500',
      neutral: 'text-gray-500'
    };
    
    return <span className={colors[trend]}>{icons[trend]}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          CSリスク一覧
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          各CSのリスク状況を一覧で確認できます。項目をクリックして詳細表示可能。
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                CS名 {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('manager')}
              >
                担当者 {sortBy === 'manager' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('nonComplianceRate')}
              >
                不適合率 {sortBy === 'nonComplianceRate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('complaintsCount')}
              >
                クレーム件数 {sortBy === 'complaintsCount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                リスクレベル
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                トレンド
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最終更新
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((cs) => (
              <tr key={cs.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{cs.name}</div>
                  <div className="text-sm text-gray-500">ID: {cs.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cs.manager}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {cs.nonComplianceRate}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cs.complaintsCount}件
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRiskBadge(cs.riskLevel)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getTrendIcon(cs.trend)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cs.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    詳細
                  </button>
                  <button className="text-orange-600 hover:text-orange-900">
                    分析
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}