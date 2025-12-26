"use client";
import { Form, Input, Button, message } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateCoursePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const onFinish = async (values: any) => {
    try {
      // SỬA QUAN TRỌNG: Dùng '/courses' (số nhiều) để khớp với MockAPI của bạn
      await axiosInstance.post("/courses", values);
      message.success("Thêm thành công!");
      router.push("/courses");
    } catch (error) {
      message.error("Lỗi: Hãy kiểm tra lại tên Resource trên MockAPI!");
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-10 bg-[#0f172a] min-h-screen text-white">
      {/* Đoạn CSS này sửa lỗi chữ đen trên nền tối trong ảnh của bạn */}
      <style jsx global>{`
        .ant-form-item-label > label { color: white !important; font-size: 16px !important; }
        .ant-input { background: #1e293b !important; color: white !important; border: 1px solid #334155 !important; padding: 10px !important; }
        .ant-input::placeholder { color: #64748b !important; }
      `}</style>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Thêm khóa học mới</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Tên khóa học" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-600 h-10 px-8">
              Lưu khóa học
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}