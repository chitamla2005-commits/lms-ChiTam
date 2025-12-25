"use client";
import { Form, Input, Button, Card, App, Space, Typography, Divider } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import axiosInstance from '@/utils/axiosInstance';
import { useState } from 'react';

const { Title } = Typography;

export default function CreateCoursePage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axiosInstance.post('/course', values);
      message.success("Tạo khóa học mới thành công!");
      router.push('/courses');
    } catch (err) {
      message.error("Lỗi khi tạo khóa học. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => router.push('/courses')}
        className="mb-4"
      >
        Quay lại
      </Button>

      <Card className="shadow-lg border-none rounded-xl">
        <Title level={3} className="dark:text-white">Thêm khóa học mới</Title>
        <Divider />
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Form.Item
              label={<span className="font-medium dark:text-gray-300">Tên khóa học</span>}
              name="title"
              rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
            >
              <Input size="large" placeholder="Ví dụ: React NextJS Pro" />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium dark:text-gray-300">Danh mục</span>}
              name="category"
              rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
            >
              <Input size="large" placeholder="Ví dụ: Frontend Development" />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium dark:text-gray-300">Cấp độ</span>}
              name="level"
              rules={[{ required: true, message: 'Vui lòng nhập cấp độ!' }]}
            >
              <Input size="large" placeholder="Ví dụ: Beginner / Intermediate" />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="font-medium dark:text-gray-300">Mô tả chi tiết</span>}
            name="description"
          >
            <Input.TextArea rows={4} placeholder="Nội dung tóm tắt khóa học..." />
          </Form.Item>

          <Divider />
          
          <div className="flex justify-end gap-4">
            <Button size="large" onClick={() => router.push('/courses')}>Hủy</Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              icon={<PlusOutlined />}
              loading={loading}
            >
              Xác nhận tạo mới
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}