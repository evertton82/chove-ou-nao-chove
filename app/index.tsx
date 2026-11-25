import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Cidade } from '../src/types/Cidade';
import { URL_CIDADES } from '../src/api/config';

export default function BuscarScreen() {
  const [texto, setTexto] = useState('');
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const buscar = () => {
    if (texto.trim().length < 2) {
      setError('Digite o nome da cidade.');
      return;
    }

    setError(null);
    setIsLoading(true);

    fetch(`${URL_CIDADES}?name=${encodeURIComponent(texto.trim())}&count=10&language=pt`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results) {
          setCidades([]);
          setError('Nenhuma cidade encontrada.');
          return;
        }
        const lista = data.results.map((item: any) => ({
          id: item.id,
          nome: item.name,
          estado: item.admin1 ?? '',
          pais: item.country ?? '',
          latitude: item.latitude,
          longitude: item.longitude,
        }));
        setCidades(lista);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const abrirPrevisao = (cidade: Cidade) => {
    router.push({ pathname: '/previsao', params: { ...cidade } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>Chove ou não chove?</Text>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Digite a cidade. Ex: Juiz de Fora"
        onSubmitEditing={buscar}
        style={{ borderWidth: 1, borderColor: '#cccccc', padding: 10, fontSize: 16, marginBottom: 12 }}
      />
      <Pressable onPress={buscar} style={{ backgroundColor: '#1565c0', padding: 12, alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>BUSCAR</Text>
      </Pressable>

      {isLoading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}

      {error && <Text style={{ color: 'red', marginTop: 12 }}>{error}</Text>}

      <FlatList
        data={cidades}
        keyExtractor={(item) => String(item.id)}
        style={{ marginTop: 12 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => abrirPrevisao(item)} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nome}</Text>
            <Text style={{ color: '#666666' }}>{item.estado} - {item.pais}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
