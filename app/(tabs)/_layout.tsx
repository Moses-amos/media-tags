import React from 'react';
import { Tabs } from 'expo-router';
import { View, Dimensions, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Animated, ViewStyle  } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';

function TabBarIcon({ name, color, isActive }) {
  return (
    <Animated.View
      style={[{
        borderRadius: 16,
        // borderColor: '#4db6ac',
        // borderWidth: 2,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: isActive ? 1.1 : 1 }],
        shadowColor: '#4db6ac',
        shadowOffset: { width: isActive ? -2 : -1, height: isActive ? 4 : 2 },
        shadowOpacity: isActive ? 0.3 : 0.15,
        shadowRadius: isActive ? 8 : 6,
        elevation: isActive ? 4 : 2,
        overflow: 'hidden',
      }]}
    >
      <LinearGradient
        colors={isActive ? ['#26a69a', '#4db6ac'] : ['transparent', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AntDesign 
        name={name} 
        size={26} 
        color={isActive ? '#fff' : '#4db6ac'} 
        style={{
          strokeWidth: 3,
        } as ViewStyle}
      />
    </Animated.View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const windowWidth = Dimensions.get('window').width;
  const tabBarWidth = windowWidth * 0.4; // 40% of screen width

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          bottom: 10,
          left: '50%',
          transform: [{ translateX: -tabBarWidth / 2 }],
          width: tabBarWidth,
          paddingTop: 20,
          height: 70,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="scan1" color={color} isActive={focused} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} isActive={focused} />
          ),
        }}
      /> */}
      
    </Tabs>
  );
}
