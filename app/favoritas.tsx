import { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Cidade } from '../src/types/Cidade';
import { useTema } from '../src/context/TemaContext';

export default function FavoritasScreen() {
  const { cores } = useTema();
  const [cidades, setCidades] = useState<Cidade[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('cidades_favoritas').then((valor) => {
        setCidades(valor ? JSON.parse(valor) : []);
      });
    }, [])
  );

  const remover = async (id: number) => {
    const lista = cidades.filter((item) => item.id !== id);
    setCidades(lista);
    await AsyncStorage.setItem('cidades_favoritas', JSON.stringify(lista));
  };

  if (cidades.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: cores.fundo, padding: 20 }}>
        <Text style={{ textAlign: 'center', color: cores.texto }}>Nenhuma cidade favorita. Busque uma cidade e toque na estrela.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: cores.fundo, padding: 16 }}>
      <FlatList
        data={cidades}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: cores.borda }}>
            <Pressable
              onPress={() => router.push({ pathname: '/previsao', params: { ...item } })}
              style={{ flex: 1, paddingVertical: 12 }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: cores.texto }}>{item.nome}</Text>
              <Text style={{ color: cores.textoFraco }}>{item.estado} - {item.pais}</Text>
            </Pressable>
            <Pressable onPress={() => remover(item.id)} hitSlop={8} style={{ padding: 8 }}>
              <MaterialIcons name="delete" size={24} color={cores.textoFraco} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
