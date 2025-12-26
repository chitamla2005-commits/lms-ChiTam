import axios from 'axios';

// Ưu tiên lấy từ Vercel, nếu không có sẽ dùng link MockAPI của bạn làm mặc định
const rawBaseURL = process.env.NEXT_PUBLIC_API_URL || 'https://694dce16b5bc648a93bec69d.mockapi.io';

const axiosInstance = axios.create({
  // Tự động dọn dẹp link để tránh lỗi nhân đôi đường dẫn
  baseURL: rawBaseURL.replace(/\/$/, ""), 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;