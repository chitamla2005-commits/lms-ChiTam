"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter, useParams } from "next/navigation";

export default function EditCourse() {
  const router = useRouter();
  const { id } = useParams(); // Lấy ID từ URL
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourseDetail = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        form.setFieldsValue(res.data); // Đổ dữ liệu cũ vào form
      } catch (error) {
        message.error("Không tìm thấy thông tin khóa học!");
      } finally {
        setLoading(false);
      }
    };
    getCourseDetail();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      // Dùng PUT để cập nhật và gọi đúng đường dẫn /courses/id
      await axiosInstance.put(`/courses/${id}`, values);
      message.success("Cập nhật thành công!");
      router.push("/courses");
    } catch (error) {
      message.error("Lỗi khi cập nhật!");
    }
  };

  if (loading) return <Spin className="flex justify-center mt-20" />;

  return (
    <div className="p-10 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl mb-5">Chỉnh sửa khóa học</h1>
      <Form form={form} layout="vertical" onFinish={onFinish} className="max-w-lg">
        <Form.Item name="name" label={<span className="text-white">Tên khóa học</span>} rules={[{ required: true }]}>
          <Input className="bg-slate-800 text-white border-slate-700" />
        </Form.Item>
        <Form.Item name="description" label={<span className="text-white">Mô tả</span>}>
          <Input.TextArea className="bg-slate-800 text-white border-slate-700" rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit">Cập nhật ngay</Button>
      </Form>
    </div>
  );
}