import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Lưu email và mật khẩu vào AsyncStorage
  const handleSavePassword = async () => {
    try {
      // Lưu cả email và mật khẩu vào AsyncStorage dưới dạng chuỗi JSON
      const userCredentials = JSON.stringify({ email, password });
      await AsyncStorage.setItem('userCredentials', userCredentials);
      Alert.alert('Thông tin đã được lưu trữ.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu thông tin.');
    }
  };

  // Lấy email và mật khẩu từ AsyncStorage
  const handleGetPassword = async () => {
    try {
      const userCredentials = await AsyncStorage.getItem('userCredentials');
      if (userCredentials) {
        const { email, password } = JSON.parse(userCredentials);
        Alert.alert('Thông tin đã lưu', `Email: ${email}, Mật khẩu: ${password}`);
      } else {
        Alert.alert('Không tìm thấy thông tin.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin.');
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
      <Button title="Lấy thông tin" onPress={handleGetPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
