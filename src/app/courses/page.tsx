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
    } catch (error) { message.error("Lỗi tải dữ liệu!"); }
    finally { setLoading(false); }
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
    <div className="p-8 bg-[#f0f2f5] min-h-screen">
      {/* Ép giao diện về chế độ SÁNG chuẩn Ant Design */}
      <style jsx global>{`
        .ant-table { background: #ffffff !important; color: rgba(0, 0, 0, 0.88) !important; }
        .ant-table-thead > tr > th { background: #fafafa !important; color: rgba(0, 0, 0, 0.88) !important; border-bottom: 1px solid #f0f0f0 !important; }
        .ant-table-tbody > tr > td { border-bottom: 1px solid #f0f0f0 !important; }
        .ant-table-row:hover > td { background: #f5f5f5 !important; }
        h1 { color: #1f1f1f !important; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý khóa học</h1>
          <Link href="/courses/create">
            <Button type="primary" icon={<PlusOutlined />} size="large" className="bg-[#1677ff]">
              Thêm khóa học mới
            </Button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
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
      </div>
    </div>
  );
}