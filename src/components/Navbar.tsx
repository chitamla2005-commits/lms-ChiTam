"use client";
import { Button, Layout, theme, Typography, Space, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { 
  LogoutOutlined, 
  HomeOutlined, 
  UserOutlined, 
  SunOutlined, 
  MoonOutlined 
} from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const router = useRouter();
  const { token } = theme.useToken();

  const handleLogout = () => {
    deleteCookie('access_token');
    router.push('/login');
  };

  return (
    <Header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      background: token.colorBgContainer,
      padding: '0 24px',
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%'
    }}>
      <Space className="cursor-pointer" onClick={() => router.push('/courses')}>
        <HomeOutlined style={{ fontSize: '20px', color: token.colorPrimary }} />
        <Text strong style={{ fontSize: '18px' }} className="dark:text-white">
          LMS ADMIN
        </Text>
      </Space>

      <Space size="large">
        {/* Nút chuyển đổi Dark/Light Mode */}
        <Tooltip title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}>
          <Button 
            type="text" 
            icon={isDark ? <SunOutlined /> : <MoonOutlined />} 
            onClick={toggleTheme}
            style={{ fontSize: '16px' }}
          />
        </Tooltip>

        <Space className="hidden md:flex">
          <UserOutlined />
          <Text className="dark:text-gray-300">ChiTam Admin</Text>
        </Space>
        
        <Button 
          type="primary" 
          danger 
          ghost
          icon={<LogoutOutlined />} 
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </Space>
    </Header>
  );
}