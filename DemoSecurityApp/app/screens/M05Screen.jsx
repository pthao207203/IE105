import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Alert } from "react-native";
import CryptoJS from "crypto-js";
import axios from 'axios';

export default function M05Screen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const handleLogin = async () => {
    try {
      setPassword(CryptoJS.MD5(oldPassword).toString());
      const response = await axios.post('http://192.168.64.1:5001/M05', { email, password });
      Alert.alert('Thành công', response.data.message);
    } catch (error) {
      console.log(error)
      Alert.alert('Thất bại', 'Không thể đăng nhập');
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
        value={oldPassword}
        onChangeText={setOldPassword}
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