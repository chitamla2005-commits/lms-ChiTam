"use client";
import { Form, Input, Button, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default function CourseForm({ onFinish, initialValues, loading }: any) {
  const router = useRouter();
  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Form.Item label="Tên khóa học" name="title" rules={[{ required: true }]}>
        <Input placeholder="Nhập tên khóa học" />
      </Form.Item>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Danh mục" name="category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Cấp độ" name="level" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </div>
      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Thumbnail URL" name="thumbnail">
        <Input />
      </Form.Item>
      <Space className="w-full justify-end">
        <Button onClick={() => router.back()}>Hủy</Button>
        <Button type="primary" htmlType="submit" loading={loading}>Lưu thông tin</Button>
      </Space>
    </Form>
  );
}