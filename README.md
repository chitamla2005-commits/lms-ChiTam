🎓 LMS Training Management System - ChiTam Edition
Dự án Hệ thống Quản lý Đào tạo (LMS) được xây dựng trên nền tảng công nghệ hiện đại, tập trung vào trải nghiệm người dùng tối ưu, hiệu năng cao và giao diện linh hoạt.

🌟 Tính năng nổi bật
   *🔐 Bảo mật hệ thống (Authentication):

-Quản lý phiên đăng nhập thông qua cookies-next.

-Sử dụng Next.js Middleware để phân quyền truy cập: Chặn người dùng chưa đăng nhập vào trang quản trị và ngăn người dùng đã đăng nhập quay lại trang Login.

   *🌓 Chế độ Sáng/Tối (Theme System):

-Tích hợp nút chuyển đổi theme ngay tại trang Login và Dashboard.

-Đặc biệt: Xử lý triệt để lỗi Nháy sáng (FOUC) khi tải lại trang bằng kỹ thuật Blocking Script và suppressHydrationWarning.

-Đồng bộ hoàn hảo giữa Ant Design darkAlgorithm và Tailwind CSS dark class.

   *📚 Quản lý Khóa học (CRUD):

-Xem danh sách: Hiển thị dưới dạng bảng chuyên nghiệp, hỗ trợ phân trang.

-Thêm mới: Form nhập liệu với Validation chặt chẽ.

-Chỉnh sửa: Cập nhật thông tin chi tiết dựa trên Dynamic Route [id].

-Xóa: Chức năng xóa an toàn với xác nhận (Popconfirm) để tránh thao tác nhầm.

🛠 Công nghệ sử dụng
Framework: Next.js 15 (App Router).

-UI Library: Ant Design 5 (Antd).

-Styling: Tailwind CSS v4.

-State Management: React Hooks (useState, useEffect, use).

-HTTP Client: Axios (Interceptors để quản lý API Base URL).

-Icons: Ant Design Icons.

📂 Cấu trúc thư mục
src/
├── app/
│   ├── (auth)/login/     # Trang đăng nhập & logic đổi theme tại bìa
│   ├── courses/          # Layout Dashboard, Navbar và Footer (ChiTam)
│   │   ├── page.tsx      # Danh sách khóa học
│   │   ├── create/       # Trang thêm mới
│   │   └── [id]/         # Trang chỉnh sửa chi tiết
│   └── layout.tsx        # Root layout xử lý chặn nháy sáng
├── components/           # Navbar, Footer dùng chung
├── utils/                # Cấu hình AxiosInstance
└── middleware.ts         # Bảo mật Route và Token

💡 Giải quyết vấn đề (Problem Solving)
Trong quá trình thực hiện, dự án đã giải quyết các thách thức kỹ thuật quan trọng:

-Hydration Error: Xử lý sự sai khác giữa Server và Client khi render Theme bằng cách sử dụng suppressHydrationWarning và useEffect hợp lý.

-Antd message error: Giải quyết lỗi message.success is not a function bằng cách bọc App component từ Ant Design ở cấp Layout.

-Table Warning: Cập nhật từ pagination.position (deprecated) sang pagination.placement theo tiêu chuẩn mới nhất của Antd 5.
