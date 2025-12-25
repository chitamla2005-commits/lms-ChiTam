"use client";
import { Layout, ConfigProvider, theme, App as AntdApp } from 'antd';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

const { Content, Footer } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  if (isDark === null) return null; // Tránh nháy sáng

  return (
    <ConfigProvider theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <AntdApp>
        <Layout className="min-h-screen">
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <Content className="bg-[#f0f2f5] dark:bg-[#0f172a]">
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            LMS System ©2025 Created by <b>ChiTam</b>
          </Footer>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
}