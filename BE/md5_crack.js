const CryptoJS = require('crypto-js');
const fs = require('fs');

// Hash mục tiêu 
const targetHash = 'e10adc3949ba59abbe56e057f20f883e';

// Đọc danh sách mật khẩu
const passwordList = [
  'password',
  'admin',
  'letmein',
  'qwerty',
  '12345',
  '123456',
];

const crackMD5 = () => {
  for (const password of passwordList) {
    // Mã hóa mật khẩu bằng MD5
    const hash = CryptoJS.MD5(password).toString();

    console.log(`Thử mật khẩu: ${password} -> Hash: ${hash}`);
    // Kiểm tra nếu hash khớp
    if (hash === targetHash) {
      console.log(`Mật khẩu tìm được: ${password}`);
      return;
    }
  }
  console.log('Không tìm được mật khẩu!');
};

crackMD5();
