"use client";
import { Form, Input, Button, message } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function CreateCourse() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      // Gửi lên '/courses' và đảm bảo 'values' chứa đúng các trường trên MockAPI
      await axiosInstance.post("/courses", values);
      message.success("Thêm khóa học thành công!");
      router.push("/courses");
    } catch (error) {
      message.error("Lỗi: Không thể tạo khóa học. Kiểm tra lại dữ liệu!");
    }
  };

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-2xl mb-5">Thêm khóa học mới</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Tên khóa học" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên khóa học" />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Lưu khóa học</Button>
      </Form>
    </div>
  );
}