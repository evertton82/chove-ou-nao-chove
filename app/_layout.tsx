import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Drawer screenOptions={{ drawerActiveTintColor: '#1565c0' }}>
        <Drawer.Screen
          name="index"
          options={{
            title: 'Buscar cidade',
            drawerIcon: ({ color, size }) => <MaterialIcons name="search" color={color as string} size={size} />,
          }}
        />
        <Drawer.Screen
          name="favoritas"
          options={{
            title: 'Favoritas',
            drawerIcon: ({ color, size }) => <MaterialIcons name="star" color={color as string} size={size} />,
          }}
        />
        <Drawer.Screen
          name="sobre"
          options={{
            title: 'Sobre',
            drawerIcon: ({ color, size }) => <MaterialIcons name="info" color={color as string} size={size} />,
          }}
        />
        <Drawer.Screen
          name="previsao"
          options={{
            title: 'Previsão',
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </SafeAreaProvider>
  );
}
