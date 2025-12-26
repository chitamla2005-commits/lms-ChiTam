"use client";
import { useEffect, useState } from "react";
import { Table, Button, Space, Typography, message } from "antd";
import axiosInstance from "@/utils/axiosInstance"; // Đảm bảo đúng đường dẫn file utils
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Fix lỗi Hydration: Chỉ render nội dung sau khi đã mount vào Client
  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Đổi thành '/courses' (số nhiều) để khớp với MockAPI
      const res = await axiosInstance.get("/courses");
      setCourses(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách khóa học!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Tên khóa học", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/courses/${record.id}`}>Sửa</Link>
        </Space>
      ),
    },
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />; // Trả về nền trống tránh nháy trắng
  }

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ color: "white" }}>Quản lý khóa học</Title>
        <Link href="/courses/create">
          <Button type="primary" icon={<PlusOutlined />}>Thêm khóa học</Button>
        </Link>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={courses} 
        rowKey="id" 
        loading={loading}
        className="custom-table"
      />
    </div>
  );
}