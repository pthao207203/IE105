// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Lưu email và mật khẩu vào AsyncStorage
//   const handleSavePassword = async () => {
//     try {
//       // Lưu cả email và mật khẩu vào AsyncStorage dưới dạng chuỗi JSON
//       const userCredentials = JSON.stringify({ email, password });
//       await AsyncStorage.setItem('userCredentials', userCredentials);
//       Alert.alert('Thông tin đã được lưu trữ.');
//     } catch (error) {
//       Alert.alert('Lỗi', 'Không thể lưu thông tin.');
//     }
//   };

//   // Lấy email và mật khẩu từ AsyncStorage
//   const handleGetPassword = async () => {
//     try {
//       const userCredentials = await AsyncStorage.getItem('userCredentials');
//       if (userCredentials) {
//         const { email, password } = JSON.parse(userCredentials);
//         Alert.alert('Thông tin đã lưu', `Email: ${email}, Mật khẩu: ${password}`);
//       } else {
//         Alert.alert('Không tìm thấy thông tin.');
//       }
//     } catch (error) {
//       Alert.alert('Lỗi', 'Không thể lấy thông tin.');
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
//       <Button title="Lưu thông tin" onPress={handleSavePassword} />
//       <Button title="Lấy thông tin" onPress={handleGetPassword} />
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
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const encryptData = (data) => {
  return btoa(unescape(encodeURIComponent(data))); // Mã hóa dữ liệu
};

const decryptData = (encryptedData) => {
  return decodeURIComponent(escape(atob(encryptedData))); // Giải mã dữ liệu
};

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSavePassword = async () => {
    try {
      const userCredentials = JSON.stringify({ email, password });
      const encryptedData = encryptData(userCredentials);
      await SecureStore.setItemAsync('userCredentials', encryptedData);
      Alert.alert('Thông báo', 'Thông tin đã được lưu trữ an toàn.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu thông tin.');
      console.log(error);
    }
  };

  const handleGetPassword = async () => {
    try {
      const encryptedData = await SecureStore.getItemAsync('userCredentials');
      if (encryptedData) {
        Alert.alert('Thông tin đã lưu', `Dữ liệu: ${encryptedData}`);
      } else {
        Alert.alert('Không tìm thấy thông tin.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin.');
      console.log(error);
    }
  };

  const handleGetPasswordOld = async () => {
    try {
      const encryptedData = await SecureStore.getItemAsync('userCredentials');
      if (encryptedData) {
        const decryptedData = decryptData(encryptedData);
        Alert.alert('Thông tin đã lưu', `Dữ liệu: ${decryptedData}`);
      } else {
        Alert.alert('Không tìm thấy thông tin.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin.');
      console.log(error);
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
      <Button title="Lưu thông tin" onPress={handleSavePassword} />
      <Button title="Lấy thông tin sau khi mã hoá" onPress={handleGetPassword} />
      <Button title="Lấy thông tin gốc" onPress={handleGetPasswordOld} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
