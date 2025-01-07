// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import * as FileSystem from "expo-file-system";

// export default function M02Screen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [storedData, setStoredData] = useState("");

//   // Lưu thông tin không mã hóa
//   const saveData = async () => {
//     try {
//       const userData = JSON.stringify({ email, password });
//       await FileSystem.writeAsStringAsync(
//         FileSystem.documentDirectory + "userData.txt",
//         userData
//       );
//       Alert.alert("Thông báo", "Lưu thông tin thành công!");
//     } catch (error) {
//       Alert.alert("Lỗi", "Không thể lưu dữ liệu.");
//     }
//   };

//   // Xem dữ liệu đã lưu
//   const viewData = async () => {
//     try {
//       const data = await FileSystem.readAsStringAsync(
//         FileSystem.documentDirectory + "userData.txt"
//       );
//       console.log(FileSystem.documentDirectory);
//       setStoredData(data || "Không có dữ liệu.");
//     } catch (error) {
//       Alert.alert("Lỗi", "Không thể đọc dữ liệu.");
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
//       <Button title="Lưu thông tin" onPress={saveData} />
//       <Button title="Xem dữ liệu đã lưu" onPress={viewData} />
//       <Text style={styles.data}>Stored Data: {storedData}</Text>
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

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import CryptoES from 'crypto-es';

const ENCRYPTION_KEY = "ie105"; // Khóa bảo mật (nên lưu trữ ở nơi an toàn)

export default function M02Screen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storedData, setStoredData] = useState("");

  // Hàm mã hóa dữ liệu bằng AES
  const encryptData = (data) => {
    return CryptoES.AES.encrypt(data, ENCRYPTION_KEY).toString();
  };

  // Hàm giải mã dữ liệu AES
  const decryptData = (encryptedData) => {
    try {
      const bytes = CryptoES.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return bytes.toString(CryptoES.enc.Utf8);
    } catch (error) {
      console.log("Giải mã thất bại:", error);
      return null;
    }
  };

  // Lưu thông tin vào SecureStore
  const saveData = async () => {
    try {
      const userData = JSON.stringify({ email, password });
      const encryptedData = encryptData(userData);
      await SecureStore.setItemAsync("userCredentials", encryptedData);
      Alert.alert("Thông báo", "Lưu thông tin thành công!");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu dữ liệu.");
      console.log(error);
    }
  };

  // Xem dữ liệu đã lưu trong SecureStore
  const viewData = async () => {
    try {
      const encryptedData = await SecureStore.getItemAsync("userCredentials");
      if (encryptedData) {
        setStoredData(`Dữ liệu mã hóa: ${encryptedData}`);
      } else {
        Alert.alert("Thông báo", "Không có dữ liệu được lưu trữ.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đọc dữ liệu.");
    }
  };

  // Giải mã và xem dữ liệu
  const viewDataOld = async () => {
    try {
      const encryptedData = await SecureStore.getItemAsync("userCredentials");
      if (encryptedData) {
        const decryptedData = decryptData(encryptedData);
        if (decryptedData) {
          setStoredData(decryptedData);
        } else {
          setStoredData("Không thể giải mã dữ liệu.");
        }
      } else {
        Alert.alert("Thông báo", "Không có dữ liệu được lưu trữ.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể giải mã dữ liệu.");
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
      <Button title="Lưu thông tin" onPress={saveData} />
      <Button title="Xem dữ liệu đã mã hoá" onPress={viewData} />
      <Button title="Xem dữ liệu đã giải mã" onPress={viewDataOld} />
      <Text style={styles.data}>Stored Data: {storedData}</Text>
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
  data: {
    marginTop: 20,
    color: "blue",
  },
});



