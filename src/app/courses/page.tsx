"use client";
import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Typography } from "antd";
import axiosInstance from "@/utils/axiosInstance";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 1. Fix lỗi Hydration (Trang trắng)
  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  // 2. Hàm lấy danh sách từ MockAPI
  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Đảm bảo gọi '/courses' khớp với MockAPI của bạn
      const res = await axiosInstance.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.error(error);
      message.error("Không thể kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  // 3. Hàm xóa khóa học
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      message.success("Đã xóa khóa học thành công!");
      fetchCourses(); // Load lại danh sách sau khi xóa
    } catch (error) {
      message.error("Lỗi khi xóa khóa học!");
    }
  };

  const columns = [
    { 
      title: "Tên khóa học", 
      dataIndex: "name", 
      key: "name",
      render: (text: string) => <span className="text-slate-200 font-medium">{text}</span>
    },
    { 
      title: "Mô tả", 
      dataIndex: "description", 
      key: "description",
      render: (text: string) => <span className="text-slate-400">{text}</span>
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/courses/edit/${record.id}`}>
            <Button type="link" icon={<EditOutlined />} className="text-blue-400">Sửa</Button>
          </Link>
          <Popconfirm 
            title="Bạn có chắc muốn xóa không?" 
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="p-8 bg-slate-950 min-h-screen">
      {/* CSS fix giao diện bảng cho Dark Mode */}
      <style jsx global>{`
        .ant-table { background: #0f172a !important; color: white !important; }
        .ant-table-thead > tr > th { background: #1e293b !important; color: #94a3b8 !important; border-bottom: 1px solid #334155 !important; }
        .ant-table-tbody > tr > td { border-bottom: 1px solid #1e293b !important; }
        .ant-table-row:hover > td { background: #1e293b !important; }
        .ant-pagination-item-active { background: #3b82f6 !important; border-color: #3b82f6 !important; }
        .ant-pagination-item a { color: white !important; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Title level={2} style={{ color: "white", margin: 0 }}>Quản lý khóa học</Title>
          <Link href="/courses/create">
            <Button type="primary" icon={<PlusOutlined />} size="large" className="bg-blue-600 hover:bg-blue-700">
              Thêm khóa học mới
            </Button>
          </Link>
        </div>

        <Table 
          columns={columns} 
          dataSource={courses} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
}