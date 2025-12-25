"use client";
import { Table, Button, Space, Tag, App, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';
import type { TableProps } from 'antd';

export default function CourseList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp(); // Sử dụng message từ App context của layout

  // Hàm lấy danh sách khóa học
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/course');
      setData(res.data);
    } catch (e) {
      message.error("Lỗi khi tải danh sách khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm xử lý xóa khóa học
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/course/${id}`);
      message.success("Xóa khóa học thành công!");
      fetchData(); // Tải lại danh sách sau khi xóa
    } catch (e) {
      message.error("Không thể xóa khóa học. Vui lòng thử lại!");
    }
  };

  const columns: TableProps<any>['columns'] = [
    { 
      title: 'Tên khóa học', 
      dataIndex: 'title', 
      key: 'title', 
      className: 'font-bold text-blue-600 dark:text-blue-400' 
    },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { 
      title: 'Cấp độ', 
      dataIndex: 'level', 
      key: 'level', 
      render: (level: string) => (
        <Tag color={level === 'Beginner' ? 'green' : 'blue'}>{level}</Tag>
      ) 
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/courses/${record.id}`}>
            <Button icon={<EditOutlined />} type="link">Sửa</Button>
          </Link>
          
          {/* Chức năng xóa có xác nhận */}
          <Popconfirm
            title="Xóa khóa học"
            description="Bạn có chắc chắn muốn xóa khóa học này không? Hành động này không thể hoàn tác."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} danger type="link">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-10 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold dark:text-white transition-colors">
            Quản lý đào tạo
          </h1>
          <p className="text-gray-500">Danh sách các khóa học hiện có trên hệ thống</p>
        </div>
        <Link href="/courses/create">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            Thêm mới
          </Button>
        </Link>
      </div>

      <Table 
        dataSource={data} 
        columns={columns} 
        rowKey="id" 
        loading={loading}
        pagination={{ 
          pageSize: 10, 
          showSizeChanger: false
        }}
        className="shadow-sm rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800"
      />
    </div>
  );
}