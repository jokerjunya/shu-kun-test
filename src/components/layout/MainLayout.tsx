import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

export function MainLayout({ children, activeSection }: MainLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* ヘッダー */}
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* サイドバー */}
        <Sidebar activeSection={activeSection} />
        
        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}