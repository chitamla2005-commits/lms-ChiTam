"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Button, Card, App, Spin, Space, Typography, Divider } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import axiosInstance from '@/utils/axiosInstance';

const { Title } = Typography;

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Lấy dữ liệu chi tiết khóa học từ API
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axiosInstance.get(`/course/${id}`);
        form.setFieldsValue(res.data);
      } catch (err) {
        message.error("Không tìm thấy thông tin khóa học!");
        router.push('/courses');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourseDetail();
  }, [id, form, router, message]);

  // Xử lý cập nhật thông tin
  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      await axiosInstance.put(`/course/${id}`, values);
      message.success("Cập nhật thông tin thành công!");
      router.push('/courses');
    } catch (err) {
      message.error("Lỗi khi cập nhật dữ liệu!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Spin size="large" />
        <p className="mt-4 text-gray-500">Đang tải dữ liệu khóa học...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <Space className="mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push('/courses')}
        >
          Quay lại danh sách
        </Button>
      </Space>

      <Card className="shadow-lg border-none">
        <Title level={3} className="dark:text-white">Chi tiết khóa học #{id}</Title>
        <Divider />
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Form.Item
              label="Tên khóa học"
              name="title"
              rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
            >
              <Input size="large" placeholder="Nhập tên khóa học" />
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name="category"
              rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}
            >
              <Input size="large" placeholder="Ví dụ: Công nghệ thông tin" />
            </Form.Item>

            <Form.Item
              label="Cấp độ"
              name="level"
              rules={[{ required: true, message: 'Vui lòng chọn/nhập cấp độ!' }]}
            >
              <Input size="large" placeholder="Ví dụ: Cơ bản, Nâng cao" />
            </Form.Item>
            
            <Form.Item
              label="Giảng viên"
              name="instructor"
            >
              <Input size="large" placeholder="Tên giảng viên" />
            </Form.Item>
          </div>

          <Form.Item
            label="Mô tả khóa học"
            name="description"
          >
            <Input.TextArea rows={5} placeholder="Nhập mô tả chi tiết về nội dung khóa học..." />
          </Form.Item>

          <Divider />
          
          <div className="flex justify-end gap-4">
            <Button size="large" onClick={() => router.push('/courses')}>
              Hủy bỏ
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              icon={<SaveOutlined />}
              loading={submitting}
            >
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}