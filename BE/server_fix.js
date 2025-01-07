const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const CryptoJS = require("crypto-js");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const ENCRYPTION_KEY = "ie105";

// Middleware để parse JSON
app.use(bodyParser.json());

// HTTPS credentials (chứng chỉ SSL)
const httpsOptions = {
  key: fs.readFileSync(__dirname + "/certs/private-key.pem"),
  cert: fs.readFileSync(__dirname + "/certs/certificate.pem"),
  passphrase: "ie105",
};

// Giải mã dữ liệu nhận được
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// ***********  M03 **************
// Endpoint POST: Nhận dữ liệu từ client
app.post("/M03", (req, res) => {
  try {
    const { data } = req.body; // Dữ liệu mã hóa
    const decryptedData = decryptData(data); // Giải mã dữ liệu
    const { email, password } = decryptedData;

    if (email && password) {
      res.status(200).json({
        message: "Data received securely",
        data: { email, password },
      });
    } else {
      res.status(400).json({
        message: "Invalid data",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error processing data",
    });
  }
});

// ***********  M04 **************
const usersM04 = [
  { email: 'user@example.com', password: bcrypt.hashSync('123456', 10) },
];

// Tạo JWT
const generateToken = (user) => {
  return jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
};

// Giới hạn đăng nhập thất bại
let loginAttempts = {};
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 phút

// Endpoint đăng nhập với bảo vệ brute-force và mã hóa mật khẩu
app.post('/M04', (req, res) => {
  console.log('Received request:', req.body);
  const { email, password } = req.body;
  const user = usersM04.find(u => u.email === email);

  if (!user) {
    console.log('Sai thông tin đăng nhập')
    return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
  }

  // Kiểm tra tài khoản có bị khóa không
  if (loginAttempts[email] && loginAttempts[email].locked) {
    const remainingTime = (loginAttempts[email].unlockTime - Date.now()) / 1000;
    console.log(`Tài khoản bị khóa. Vui lòng thử lại sau ${remainingTime.toFixed(0)} giây.`)
    return res.status(403).json({
      message: `Tài khoản bị khóa. Vui lòng thử lại sau ${remainingTime.toFixed(0)} giây.`,
    });
  }

  // Kiểm tra mật khẩu
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (isPasswordValid) {
    // Reset số lần thử
    loginAttempts[email] = { attempts: 0 };
    const token = generateToken(user);
    console.log('Đăng nhập thành công')
    return res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
    });
  } else {
    // Ghi nhận lần thử thất bại
    if (!loginAttempts[email]) {
      loginAttempts[email] = { attempts: 1 };
    } else {
      loginAttempts[email].attempts += 1;
    }

    // Khóa tài khoản nếu vượt quá giới hạn
    if (loginAttempts[email].attempts >= MAX_ATTEMPTS) {
      loginAttempts[email].locked = true;
      loginAttempts[email].unlockTime = Date.now() + LOCK_TIME;
    }
    console.log('Sai thông tin đăng nhập')
    return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
  }
});

// Khởi chạy server HTTPS
// https.createServer(httpsOptions, app).listen(PORT, () => {
//   console.log(`Secure server running on https://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
