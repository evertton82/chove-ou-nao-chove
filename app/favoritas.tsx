import { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
          <Pressable
            onPress={() => router.push({ pathname: '/previsao', params: { ...item } })}
            style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: cores.borda }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: cores.texto }}>{item.nome}</Text>
            <Text style={{ color: cores.textoFraco }}>{item.estado} - {item.pais}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
