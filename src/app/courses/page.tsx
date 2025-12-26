"use client";
import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/courses"); // Dùng số nhiều
      setCourses(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/courses/${id}`); // Dùng số nhiều
      message.success("Xóa thành công!");
      fetchCourses(); // Tải lại danh sách
    } catch (error) {
      message.error("Lỗi khi xóa khóa học!");
    }
  };

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Link href={`/courses/edit/${record.id}`}>Sửa</Link>
          <Popconfirm title="Xóa khóa học này?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-white text-2xl font-bold">Danh sách khóa học</h1>
        <Link href="/courses/create">
          <Button type="primary">Thêm mới</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={courses} rowKey="id" loading={loading} />
    </div>
  );
}