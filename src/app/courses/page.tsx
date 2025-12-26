"use client";
import { Form, Input, Button, message } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateCoursePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Fix lỗi Hydration (Trang trắng)
  useEffect(() => {
    setMounted(true);
  }, []);

  const onFinish = async (values: any) => {
    try {
      // Đảm bảo gọi đến '/courses' (số nhiều) khớp với MockAPI
      await axiosInstance.post("/courses", values);
      message.success("Thêm khóa học thành công!");
      router.push("/courses");
    } catch (error: any) {
      console.error(error);
      message.error("Không thể thêm khóa học. Vui lòng kiểm tra lại!");
    }
  };

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="p-10 bg-slate-950 min-h-screen">
      {/* CSS ghi đè để Ant Design hiển thị đẹp trên nền tối */}
      <style jsx global>{`
        .ant-form-item-label > label {
          color: #f8fafc !important; /* Màu chữ trắng cho Label */
          font-weight: 500;
        }
        .ant-input, .ant-input-textarea {
          background-color: #1e293b !important; /* Nền tối cho Input */
          color: #ffffff !important; /* Chữ trắng trong Input */
          border-color: #334155 !important;
        }
        .ant-input::placeholder {
          color: #64748b !important;
        }
        .ant-input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Tạo khóa học mới</h1>
        
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label="Tên khóa học"
            rules={[{ required: true, message: "Vui lòng nhập tên khóa học!" }]}
          >
            <Input size="large" placeholder="Ví dụ: React NextJS Basic" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả khóa học"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea 
              rows={5} 
              placeholder="Nhập chi tiết nội dung khóa học..." 
            />
          </Form.Item>

          <Form.Item className="mt-8">
            <div className="flex gap-4">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                className="bg-blue-600 hover:bg-blue-700 h-auto py-2 px-8"
              >
                Lưu khóa học
              </Button>
              <Button 
                size="large" 
                onClick={() => router.back()}
                className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                Hủy bỏ
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}