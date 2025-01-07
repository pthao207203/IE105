// import React, { useState } from "react";
// import { StyleSheet, Text, TextInput, Button, View } from "react-native";
// import axios from "axios";

// export default function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [response, setResponse] = useState("");

//   const sendData = async () => {
//     try {
//       const res = await axios.post("http://192.168.64.1:5001/M03", {
//         email, password
//       });
//       setResponse(res.data.message);
//     } catch (error) {
//       setResponse("Error sending data");
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
//       <Button title="Send Data" onPress={sendData} />
//       <Text>Response: {response}</Text>
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
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import axios from "axios";
import * as Crypto from "expo-crypto";

const ENCRYPTION_KEY = "ie105";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  // Hàm mã hóa dữ liệu bằng SHA-256 
  const encryptData = async (data) => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data + ENCRYPTION_KEY
    );
  };

  const sendData = async () => {
    try {
      const encryptedData = await encryptData(JSON.stringify({ email, password }));
      const res = await axios.post("http://192.168.64.1:3001/M03", {
        data: { email, password },
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error(error);
      setResponse("Error sending data");
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
      <Button title="Send Data" onPress={sendData} />
      <Text>Response: {response}</Text>
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

