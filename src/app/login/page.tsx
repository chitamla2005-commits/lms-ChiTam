"use client";
import { Form, Input, Button, Card, App, ConfigProvider, theme, Typography, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { LockOutlined, UserOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  };

  if (isDark === null) return <div className="min-h-screen bg-gray-100 dark:bg-slate-950" />;

  return (
    <ConfigProvider theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <App>
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-500">
          <div className="absolute top-6 right-6">
            <Tooltip title={isDark ? "Chế độ sáng" : "Chế độ tối"}>
              <Button 
                shape="circle" 
                size="large" 
                icon={isDark ? <SunOutlined /> : <MoonOutlined />} 
                onClick={toggleTheme} 
              />
            </Tooltip>
          </div>
          {/* Không cần khai báo form ở đây */}
          <LoginContent router={router} />
        </div>
      </App>
    </ConfigProvider>
  );
}

function LoginContent({ router }: { router: any }) {
  const { message } = App.useApp();
  // KHAI BÁO FORM Ở ĐÂY
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setCookie('access_token', 'true', { maxAge: 60 * 60 * 24 });
    message.success('Đăng nhập thành công!');
    router.push('/courses');
  };

  return (
    <Card className="w-full max-w-[420px] shadow-2xl border-none rounded-2xl overflow-hidden transition-all duration-500">
      <div className="text-center mb-10">
        <Title level={2} className="mb-2 dark:text-white">HỆ THỐNG LMS</Title>
        <Text type="secondary" className="dark:text-gray-400">Quản lý đào tạo - <b>ChiTam</b></Text>
      </div>
      
      <Form 
        form={form} // GÁN INSTANCE FORM VÀO ĐÂY
        layout="vertical" 
        onFinish={onFinish} 
        requiredMark={false}
      >
        <Form.Item 
          label={<Text strong className="dark:text-gray-300">Tài khoản</Text>} 
          name="email" 
          rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email!' }]}
        >
          <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="admin@lms.com" size="large" className="h-12" />
        </Form.Item>
        
        <Form.Item 
          label={<Text strong className="dark:text-gray-300">Mật khẩu</Text>} 
          name="password" 
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]} 
          className="mb-8"
        >
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="••••••••" size="large" className="h-12" />
        </Form.Item>
        
        <Button type="primary" htmlType="submit" block size="large" className="h-12 font-bold shadow-lg">
          ĐĂNG NHẬP
        </Button>
      </Form>
    </Card>
  );
}