import 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { TemaProvider, useTema } from '../src/context/TemaContext';

function Menu() {
  const { escuro, cores, trocarTema } = useTema();

  return (
    <>
      <StatusBar style={escuro ? 'light' : 'dark'} />
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: cores.cabecalho },
          headerTintColor: cores.texto,
          headerShadowVisible: false,
          sceneStyle: { backgroundColor: cores.fundo },
          drawerStyle: { backgroundColor: cores.cabecalho },
          drawerActiveTintColor: escuro ? '#64b5f6' : '#1565c0',
          drawerInactiveTintColor: cores.texto,
          headerRight: () => (
            <Pressable onPress={trocarTema} style={{ marginRight: 16 }}>
              <MaterialIcons name={escuro ? 'light-mode' : 'dark-mode'} size={24} color={cores.texto} />
            </Pressable>
          ),
        }}
      >
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
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TemaProvider>
        <Menu />
      </TemaProvider>
    </SafeAreaProvider>
  );
}
