// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
// import axios from 'axios';

// export default function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://192.168.64.1:5001/M04', { email, password });
//       Alert.alert('Thành công', response.data.message);
//     } catch (error) {
//       Alert.alert('Thất bại', 'Sai thông tin đăng nhập');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Email:</Text>
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Nhập email"
//       />
//       <Text>Password:</Text>
//       <TextInput
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         placeholder="Nhập mật khẩu"
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 8,
//   },
//   data: {
//     marginTop: 20,
//     color: "blue",
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/M04', { email, password });
      console.log('Phản hồi nhận được:', response.data);
      const token = response.data.token;

      // Lưu token vào AsyncStorage (hoặc SecureStore)
      console.log('Token:', token);
      Alert.alert('Thành công', 'Đăng nhập thành công!');
    } catch (error) {
      Alert.alert('Thất bại', error.response.data.message || 'Sai thông tin đăng nhập');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Nhập mật khẩu"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
