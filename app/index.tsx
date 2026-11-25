import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { Cidade } from '../src/types/Cidade';
import { URL_CIDADES } from '../src/api/config';
import { useTema } from '../src/context/TemaContext';

export default function BuscarScreen() {
  const { cores } = useTema();
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

  const usarLocalizacao = async () => {
    setError(null);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permissão de localização negada.');
      return;
    }

    setIsLoading(true);

    try {
      const posicao = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = posicao.coords;
      let nome = 'Minha localização';
      let estado = '';
      let pais = '';

      try {
        const enderecos = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (enderecos.length > 0) {
          nome = enderecos[0].city ?? enderecos[0].subregion ?? nome;
          estado = enderecos[0].region ?? '';
          pais = enderecos[0].country ?? '';
        }
      } catch {}

      abrirPrevisao({ id: 0, nome, estado, pais, latitude, longitude });
    } catch {
      setError('Não foi possível pegar sua localização.');
    } finally {
      setIsLoading(false);
    }
  };

  const abrirPrevisao = (cidade: Cidade) => {
    router.push({ pathname: '/previsao', params: { ...cidade } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: cores.fundo, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: cores.texto }}>Chove ou não chove?</Text>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Digite a cidade. Ex: Juiz de Fora"
        placeholderTextColor={cores.textoFraco}
        onSubmitEditing={buscar}
        style={{ borderWidth: 1, borderColor: cores.campo, padding: 10, fontSize: 16, marginBottom: 12, color: cores.texto }}
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
          <Pressable onPress={() => abrirPrevisao(item)} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: cores.borda }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: cores.texto }}>{item.nome}</Text>
            <Text style={{ color: cores.textoFraco }}>{item.estado} - {item.pais}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
