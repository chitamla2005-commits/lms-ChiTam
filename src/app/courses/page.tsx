"use client";
import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Course {
  id: string;
  name: string;
  description: string;
}

export default function CourseListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/courses");
      setCourses(res.data);
    } catch (error) {
      message.error("Lỗi tải dữ liệu!");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      message.success("Xóa thành công!");
      fetchCourses();
    } catch (error) { message.error("Lỗi khi xóa!"); }
  };

  if (!mounted) return null;

  return (
    <div className="p-8 bg-[#020617] min-h-screen text-white">
      <style jsx global>{`
        /* Ép bảng luôn hiển thị chế độ tối */
        .ant-table { background: #0f172a !important; color: #f8fafc !important; }
        .ant-table-thead > tr > th { background: #1e293b !important; color: #94a3b8 !important; border-bottom: 1px solid #334155 !important; }
        .ant-table-tbody > tr > td { border-bottom: 1px solid #1e293b !important; color: #f8fafc !important; }
        .ant-table-row:hover > td { background: #1e293b !important; }
        .ant-typography { color: white !important; }
        .ant-pagination-item a { color: white !important; }
        .ant-pagination-item-active { background: #3b82f6 !important; }
      `}</style>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản lý khóa học</h1>
        <Link href="/courses/create">
          <Button type="primary" icon={<PlusOutlined />} size="large">Thêm khóa học mới</Button>
        </Link>
      </div>

      <Table 
        dataSource={courses} 
        rowKey="id" 
        loading={loading}
        columns={[
          { title: "Tên khóa học", dataIndex: "name", key: "name" },
          { title: "Mô tả", dataIndex: "description", key: "description" },
          {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
              <Space>
                <Link href={`/courses/edit/${record.id}`}>
                  <Button type="link" icon={<EditOutlined />}>Sửa</Button>
                </Link>
                <Popconfirm title="Xóa khóa học này?" onConfirm={() => handleDelete(record.id)}>
                  <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}