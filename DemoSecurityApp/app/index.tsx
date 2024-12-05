import M01Screen from "./screens/M01Screen";
import M02Screen from "./screens/M02Screen";
import M03Screen from "./screens/M03Screen";
import M04Screen from "./screens/M04Screen";
import M05Screen from "./screens/M05Screen";

import { Stack } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="M01"
        component={M01Screen}
        options={{
          headerTitle: "Improper Platform Usage", 
          tabBarLabel: "M01",
        }}
      />
      <Tab.Screen
        name="M02"
        component={M02Screen}
        options={{
          headerTitle: "Insecure Data Storage", 
          tabBarLabel: "M02", 
        }}
      />
      <Tab.Screen
        name="M03"
        component={M03Screen}
        options={{
          headerTitle: "Insecure Communication",
          tabBarLabel: "M03",
        }}
      />
      <Tab.Screen
        name="M04"
        component={M04Screen}
        options={{
          headerTitle: "Insecure Authentication",
          tabBarLabel: "M04",
        }}
      />
      <Tab.Screen
        name="M05"
        component={M05Screen}
        options={{
          headerTitle: "Insufficient Cryptography",
          tabBarLabel: "M05",
        }}
      />
    </Tab.Navigator>
  );
}