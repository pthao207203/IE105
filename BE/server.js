const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5001;

// Middleware để parse JSON
app.use(bodyParser.json());


// ***********  M03 **************
// Endpoint POST: Nhận dữ liệu từ client
app.post("/M03", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.status(200).json({
      message: "Data received successfully",
      data: { email, password },
    });
  } else {
    res.status(400).json({
      message: "Invalid data",
    });
  }
});

// // ***********  M04 **************
// // Giả lập cơ sở dữ liệu
// const usersM04 = [
//   { email: 'user@example.com', password: '123456' }, // Mật khẩu không mã hóa
// ];

// // Endpoint đăng nhập
// app.post('/M04', (req, res) => {
//   const { email, password } = req.body;
//   const user = usersM04.find(u => u.email === email && u.password === password);
//   if (user) {
//     return res.status(200).json({ message: 'Đăng nhập thành công', email });
//   }
//   return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
// });

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

  // Kiểm tra tài khoản có bị khóa không
  if (loginAttempts[email] && loginAttempts[email].locked) {
    const remainingTime = (loginAttempts[email].unlockTime - Date.now()) / 1000;
    console.log(`Tài khoản bị khóa. Vui lòng thử lại sau ${remainingTime.toFixed(0)} giây.`)
    return res.status(403).json({
      message: `Tài khoản bị khóa. Vui lòng thử lại sau ${remainingTime.toFixed(0)} giây.`,
    });
  }

  if (!user) {
    console.log('Sai thông tin đăng nhập')
    return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
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

// // ***********  M05 **************
// // Giả sử lưu trữ mật khẩu sử dụng MD5 (không an toàn)
// // Mật khẩu trước khi mã hoá là: 123456
// let usersM05 = {
//   email: 'user@example.com',
//   password: 'e10adc3949ba59abbe56e057f20f883e',
// };

// // Đăng nhập
// app.post('/M05', (req, res) => {
//   const { email, password } = req.body;

//   if (usersM05.email === email && usersM05.password === password) {
//     res.send('Đăng nhập thành công!');
//   } else {
//     res.status(401).send('Sai tên người dùng hoặc mật khẩu.');
//   }
// });
// ***********  M05 **************
const usersM05 = [
  {
    email: 'user@example.com',
    password: bcrypt.hashSync('123456', 10),  // Băm mật khẩu bằng bcrypt
  },
];

// Endpoint đăng nhập
app.post('/M05', async (req, res) => {
  const { email, password } = req.body;
  const user = usersM05.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Sai thông tin đăng nhập.' });
  }

  // Kiểm tra mật khẩu bằng bcrypt
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (isValidPassword) {
    const token = generateToken(user);
    res.status(200).json({ message: 'Đăng nhập thành công!', token });
  } else {
    res.status(401).json({ message: 'Sai mật khẩu.' });
  }
});



// Endpoint GET: Kiểm tra server hoạt động
app.get("/", (req, res) => {
  res.send("HTTP Server is running without encryption!");
});

// Lắng nghe trên cổng được chỉ định
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
