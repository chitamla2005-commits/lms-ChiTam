"use client";
import { Form, Input, Button, message, Card } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function CreateCourse() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await axiosInstance.post("/courses", values);
      message.success("Thêm thành công!");
      router.push("/courses");
    } catch (error) { message.error("Lỗi hệ thống!"); }
  };

  return (
    <div className="p-10 min-h-screen transition-colors duration-300 bg-[#f0f2f5] dark:bg-[#0f172a]">
      <style jsx global>{`
        /* Tự động đổi màu Label theo chế độ sáng/tối */
        .ant-form-item-label > label { 
          color: inherit !important; 
        }
        .dark .ant-form-item-label > label { 
          color: #f8fafc !important; 
        }
        
        /* Tự động đổi màu ô Input */
        .dark .ant-input, .dark .ant-input-textarea { 
          background-color: #1e293b !important; 
          color: #ffffff !important; 
          border-color: #334155 !important; 
        }
        
        /* Đổi màu Card trong chế độ tối */
        .dark .ant-card {
          background-color: #1e293b !important;
          border-color: #334155 !important;
        }
        .dark .ant-card-head {
          border-bottom-color: #334155 !important;
        }
        .dark .ant-card-head-title {
          color: #ffffff !important;
        }
      `}</style>

      <div className="max-w-xl mx-auto">
        <Button onClick={() => router.back()} className="mb-4 dark:bg-slate-800 dark:text-white dark:border-slate-700">
          Quay lại
        </Button>
        
        <Card title="Tạo mới khóa học">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item 
              name="name" 
              label="Tên khóa học" 
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input placeholder="Ví dụ: Lập trình Web" size="large" />
            </Form.Item>
            
            <Form.Item name="description" label="Mô tả">
              <Input.TextArea rows={4} placeholder="Nhập mô tả ngắn gọn" />
            </Form.Item>
            
            <Button type="primary" htmlType="submit" size="large" block className="bg-[#1677ff] h-12 text-lg">
              Lưu khóa học
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}