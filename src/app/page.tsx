'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { CSRiskGrid } from '@/components/dashboard/CSRiskGrid';
import { mockKPIData, getStatusFromValue } from '@/lib/mockData';

export default function Home() {
  return (
    <MainLayout activeSection="dashboard">
      <div className="space-y-6">
        {/* ページヘッダー */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CSリスク ダッシュボード
          </h2>
          <p className="text-gray-600">
            全体のCSリスク状況をリアルタイムで監視します（最終更新: 2025-08-01 15:30）
          </p>
        </div>

        {/* KPIサマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="総CS数"
            value={mockKPIData.totalCS}
            trend={mockKPIData.trends.totalCS}
            status="normal"
            isClickable={true}
            onClick={() => console.log('総CS数をクリック')}
          />
          
          <KPICard
            title="平均不適合率"
            value={mockKPIData.avgNonComplianceRate}
            unit="%"
            trend={mockKPIData.trends.nonComplianceRate}
            status={getStatusFromValue(mockKPIData.avgNonComplianceRate, { warning: 7, critical: 10 })}
            isClickable={true}
            onClick={() => console.log('不適合率をクリック')}
          />
          
          <KPICard
            title="アクティブアラート"
            value={mockKPIData.activeAlertsCount}
            subtitle={mockKPIData.trends.activeAlerts.value}
            status={getStatusFromValue(mockKPIData.activeAlertsCount, { warning: 8, critical: 15 })}
            isClickable={true}
            onClick={() => console.log('アラートをクリック')}
          />
          
          <KPICard
            title="対応時間（平均）"
            value={mockKPIData.avgResponseTime}
            unit="分"
            trend={mockKPIData.trends.responseTime}
            status={getStatusFromValue(mockKPIData.avgResponseTime, { warning: 60, critical: 90 })}
            subtitle="目標: 60分以内"
            isClickable={true}
            onClick={() => console.log('対応時間をクリック')}
          />
        </div>

        {/* メインコンテンツエリア */}
        <div className="grid grid-cols-1 gap-6">
          {/* CSリスクグリッド */}
          <CSRiskGrid />
          
          {/* チャートエリア（2カラム） */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* トレンドチャートプレースホルダー */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                不適合率トレンド（30日間）
              </h3>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">📊 Looker Studio埋込予定エリア</p>
                  <p className="text-sm text-gray-400">トレンド分析・予測区間表示</p>
                </div>
              </div>
            </div>
            
            {/* 要因分析プレースホルダー */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                要因分析 + RAG提案
              </h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">🔍 SHAP + Vertex AI</p>
                  <p className="text-sm text-gray-500">要因寄与度＋自動提案表示</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
