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
    <div className="p-8 min-h-screen transition-colors duration-300 bg-[#f0f2f5] dark:bg-[#020617]">
      {/* CSS fix triệt để cái nền trắng bao quanh bảng trong ảnh của bạn */}
      <style jsx global>{`
        /* Chế độ tối: Fix nền Card và Bảng */
        .dark .ant-table-wrapper { background: #0f172a !important; padding: 20px; border-radius: 8px; }
        .dark .ant-table { background: #0f172a !important; color: #f8fafc !important; }
        .dark .ant-table-thead > tr > th { background: #1e293b !important; color: #94a3b8 !important; border-bottom: 1px solid #334155 !important; }
        .dark .ant-table-tbody > tr > td { border-bottom: 1px solid #1e293b !important; color: #f8fafc !important; }
        .dark .ant-table-row:hover > td { background: #1e293b !important; }
        .dark .ant-pagination-item a { color: white !important; }
        .dark h1 { color: white !important; }
        
        /* Loại bỏ bóng trắng của Card AntD nếu bạn có dùng bao ngoài */
        .dark .ant-card { background: #0f172a !important; border-color: #334155 !important; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Quản lý khóa học</h1>
          <Link href="/courses/create">
            <Button type="primary" icon={<PlusOutlined />} size="large" className="bg-blue-600">
              Thêm khóa học mới
            </Button>
          </Link>
        </div>

        {/* Thêm class dark:bg-slate-900 để đồng bộ nền khi chuyển chế độ */}
        <div className="bg-white dark:bg-[#0f172a] p-6 rounded-xl shadow-lg transition-all">
          <Table 
            dataSource={courses} 
            rowKey="id" 
            loading={loading}
            pagination={{ pageSize: 8 }}
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