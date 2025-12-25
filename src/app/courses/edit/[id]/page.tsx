"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import axiosInstance from '@/utils/axiosInstance';

export default function CourseDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu chi tiết khóa học khi vào trang
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await axiosInstance.get(`/course/${id}`);
        form.setFieldsValue(res.data);
      } catch (error) {
        message.error("Không tìm thấy khóa học!");
      } finally {
        setLoading(false);
      }
    };
    if (id) getDetail();
  }, [id, form]);

  const onUpdate = async (values: any) => {
    try {
      await axiosInstance.put(`/course/${id}`, values);
      message.success("Cập nhật thành công!");
      router.push('/courses');
    } catch (error) {
      message.error("Lỗi khi cập nhật!");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Spin size="large" /></div>;

  return (
    <div className="p-8 flex justify-center">
      <Card title={`Chỉnh sửa khóa học ID: ${id}`} className="w-full max-w-2xl shadow-lg">
        <Form form={form} layout="vertical" onFinish={onUpdate}>
          <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Danh mục" name="category" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Mô tả" name="description"><Input.TextArea rows={4} /></Form.Item>
          <div className="flex justify-end gap-3">
            <Button onClick={() => router.back()}>Quay lại</Button>
            <Button type="primary" htmlType="submit">Cập nhật</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}