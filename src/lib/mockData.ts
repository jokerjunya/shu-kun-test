// Mock data for dashboard components

export interface KPIData {
  totalCS: number;
  avgNonComplianceRate: number;
  activeAlertsCount: number;
  avgResponseTime: number;
  trends: {
    totalCS: { value: string; direction: 'up' | 'down' | 'neutral'; label: string };
    nonComplianceRate: { value: string; direction: 'up' | 'down' | 'neutral'; label: string };
    activeAlerts: { value: string; direction: 'up' | 'down' | 'neutral'; label: string };
    responseTime: { value: string; direction: 'up' | 'down' | 'neutral'; label: string };
  };
}

export interface AlertData {
  id: string;
  type: 'rule' | 'ml' | 'recurrence';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  csName: string;
  triggeredAt: string;
  isActive: boolean;
  assignee?: string;
}

export interface TrendData {
  date: string;
  nonComplianceRate: number;
  complaintsCount: number;
  responseTime: number;
}

// Mock KPI data
export const mockKPIData: KPIData = {
  totalCS: 45,
  avgNonComplianceRate: 8.2,
  activeAlertsCount: 12,
  avgResponseTime: 47,
  trends: {
    totalCS: { value: '+3', direction: 'up', label: '前月比' },
    nonComplianceRate: { value: '+1.1%', direction: 'up', label: '前月比' },
    activeAlerts: { value: '8件要対応', direction: 'neutral', label: '' },
    responseTime: { value: '-13分', direction: 'down', label: '目標まで' }
  }
};

// Mock alert data
export const mockAlerts: AlertData[] = [
  {
    id: 'alert-001',
    type: 'rule',
    severity: 'critical',
    title: '不適合率閾値超過',
    description: 'CS-Alpha の不適合率が12.4%に達しました（閾値：10%）',
    csName: 'CS-Alpha',
    triggeredAt: '2025-08-01 15:30',
    isActive: true,
    assignee: '田中 太郎'
  },
  {
    id: 'alert-002',
    type: 'ml',
    severity: 'high',
    title: 'ML異常検知',
    description: 'IsolationForest スコア 0.97 でCS-Beta に異常パターンを検出',
    csName: 'CS-Beta',
    triggeredAt: '2025-08-01 14:45',
    isActive: true,
    assignee: '佐藤 花子'
  },
  {
    id: 'alert-003',
    type: 'recurrence',
    severity: 'high',
    title: '再発アラート',
    description: '仕様変更通知プロセスに関する指摘が3回発生（GMエスカレーション）',
    csName: 'CS-Gamma',
    triggeredAt: '2025-08-01 13:20',
    isActive: true,
    assignee: '鈴木 次郎'
  }
];

// Mock trend data (last 30 days)
export const mockTrendData: TrendData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  return {
    date: date.toISOString().split('T')[0],
    nonComplianceRate: 6 + Math.random() * 8 + Math.sin(i / 5) * 2,
    complaintsCount: Math.floor(3 + Math.random() * 12 + Math.sin(i / 3) * 3),
    responseTime: Math.floor(35 + Math.random() * 25 + Math.cos(i / 4) * 10)
  };
});

// Utility functions for data processing
export const getStatusFromValue = (
  value: number, 
  thresholds: { warning: number; critical: number },
  invert: boolean = false
): 'normal' | 'warning' | 'critical' => {
  if (invert) {
    if (value <= thresholds.critical) return 'critical';
    if (value <= thresholds.warning) return 'warning';
    return 'normal';
  } else {
    if (value >= thresholds.critical) return 'critical';
    if (value >= thresholds.warning) return 'warning';
    return 'normal';
  }
};

export const formatTrend = (current: number, previous: number, isPercentage: boolean = false): {
  direction: 'up' | 'down' | 'neutral';
  value: string;
} => {
  const diff = current - previous;
  const direction = diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
  
  const value = isPercentage 
    ? `${Math.abs(diff).toFixed(1)}%`
    : Math.abs(diff).toString();
    
  return { direction, value: direction === 'up' ? `+${value}` : direction === 'down' ? `-${value}` : value };
};