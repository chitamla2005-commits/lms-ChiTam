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
    <div className="p-10 bg-[#f0f2f5] min-h-screen">
      <style jsx global>{`
        .ant-form-item-label > label { color: #1f1f1f !important; font-size: 14px !important; }
        .ant-input, .ant-input-textarea { 
          background: #ffffff !important; 
          color: #1f1f1f !important; 
          border: 1px solid #d9d9d9 !important; 
        }
        .ant-input:focus { border-color: #4096ff !important; }
        h1 { color: #1f1f1f !important; }
      `}</style>

      <div className="max-w-xl mx-auto">
        <Button onClick={() => router.back()} className="mb-4"> Quay lại</Button>
        <Card title={<h1 className="text-xl font-bold m-0">Tạo mới khóa học</h1>}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Tên khóa học" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input placeholder="Ví dụ: Lập trình Web" />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <Input.TextArea rows={4} placeholder="Nhập mô tả ngắn gọn" />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block className="bg-[#1677ff]">
              Lưu khóa học
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}