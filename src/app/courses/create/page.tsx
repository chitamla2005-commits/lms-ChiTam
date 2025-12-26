"use client";
import { Form, Input, Button, message } from "antd";
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
    <div className="p-10 bg-[#020617] min-h-screen text-white">
      <style jsx global>{`
        /* Sửa lỗi chữ đen trên nền tối */
        .ant-form-item-label > label { color: #ffffff !important; font-size: 16px !important; }
        .ant-input, .ant-input-textarea { 
          background: #1e293b !important; 
          color: white !important; 
          border: 1px solid #334155 !important; 
        }
        .ant-input::placeholder { color: #64748b !important; }
      `}</style>

      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tạo mới khóa học</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Tên khóa học" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>Lưu lại</Button>
        </Form>
      </div>
    </div>
  );
}