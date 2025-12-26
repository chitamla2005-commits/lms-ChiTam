import axios from 'axios';

// Đảm bảo link này KHÔNG có chữ /courses ở cuối
const apiURL = 'https://694dce16b5bc648a93bec69d.mockapi.io';

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;