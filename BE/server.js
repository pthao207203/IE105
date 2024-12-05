const express = require("express");
const bodyParser = require("body-parser");

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

// ***********  M04 **************
// Giả lập cơ sở dữ liệu
const usersM04 = [
  { email: 'user@example.com', password: '123456' }, // Mật khẩu không mã hóa
];

// Endpoint đăng nhập
app.post('/M04', (req, res) => {
  const { email, password } = req.body;
  const user = usersM04.find(u => u.email === email && u.password === password);
  if (user) {
    return res.status(200).json({ message: 'Đăng nhập thành công', email });
  }
  return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
});

// ***********  M05 **************
// Giả sử lưu trữ mật khẩu sử dụng MD5 (không an toàn)
// Mật khẩu trước khi mã hoá là: 123456
let usersM05 = {
  email: 'user@example.com',
  password: 'e10adc3949ba59abbe56e057f20f883e',
};

// Đăng nhập
app.post('/M05', (req, res) => {
  const { email, password } = req.body;

  if (usersM05.email === email && usersM05.password === password) {
    res.send('Đăng nhập thành công!');
  } else {
    res.status(401).send('Sai tên người dùng hoặc mật khẩu.');
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
