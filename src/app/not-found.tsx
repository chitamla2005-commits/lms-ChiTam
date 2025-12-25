"use client";
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={<Button type="primary" onClick={() => router.push('/courses')}>Quay lại trang chủ</Button>}
    />
  );
}