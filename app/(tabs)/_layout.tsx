import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';

function TabBarIcon({ name, color, isActive }) {
  return (
    <View
      style={{
        backgroundColor: 'transparent', // Changed from isActive ? 'lightblue' : 'transparent'
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
      }}
    >
      <Entypo name={name} size={24} color={color} />
      {/* <FontAwesome name={name} size={24} color={color} /> */}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const screenWidth = Dimensions.get('window').width;

  const tabBarWidth = screenWidth > 600 ? 250 : 200;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderRadius: 20,
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: [{ translateX: -tabBarWidth / 2 }],
          width: tabBarWidth,
          height: 60,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} isActive={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} isActive={focused} />
          ),
        }}
      />
      
    </Tabs>
  );
}
