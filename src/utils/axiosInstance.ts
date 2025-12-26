import axios from 'axios';

// Lấy link từ Vercel, nếu không có thì dùng link bạn vừa gửi (bỏ chữ /courses ở cuối)
const rawBaseURL = process.env.NEXT_PUBLIC_API_URL || 'https://694dce16b5bc648a93bec69d.mockapi.io';

const axiosInstance = axios.create({
  baseURL: rawBaseURL.replace(/\/$/, ""), // Xóa dấu gạch chéo cuối cùng nếu bạn lỡ tay nhập vào
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;