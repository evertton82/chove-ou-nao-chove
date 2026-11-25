import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Cidade } from '../src/types/Cidade';
import { URL_PREVISAO } from '../src/api/config';

type Dia = {
  data: string;
  chance: number;
  chuva: number;
  minima: number;
  maxima: number;
};

export default function PrevisaoScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [dias, setDias] = useState<Dia[]>([]);
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [favorita, setFavorita] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cidade: Cidade = {
    id: Number(params.id),
    nome: String(params.nome),
    estado: String(params.estado),
    pais: String(params.pais),
    latitude: Number(params.latitude),
    longitude: Number(params.longitude),
  };

  useEffect(() => {
    navigation.setOptions({ title: cidade.nome });
    setIsLoading(true);
    setError(null);

    fetch(`${URL_PREVISAO}?latitude=${cidade.latitude}&longitude=${cidade.longitude}&current=temperature_2m&daily=precipitation_probability_max,precipitation_sum,temperature_2m_min,temperature_2m_max&timezone=auto`)
      .then((res) => res.json())
      .then((data) => {
        const lista = data.daily.time.map((dataDia: string, i: number) => ({
          data: dataDia,
          chance: data.daily.precipitation_probability_max[i] ?? 0,
          chuva: data.daily.precipitation_sum[i] ?? 0,
          minima: data.daily.temperature_2m_min[i],
          maxima: data.daily.temperature_2m_max[i],
        }));
        setDias(lista);
        setTemperatura(data.current.temperature_2m);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    AsyncStorage.getItem('cidades_favoritas').then((valor) => {
      const lista: Cidade[] = valor ? JSON.parse(valor) : [];
      setFavorita(lista.some((item) => item.id === cidade.id));
    });
  }, [params.id]);

  const favoritar = async () => {
    const valor = await AsyncStorage.getItem('cidades_favoritas');
    let lista: Cidade[] = valor ? JSON.parse(valor) : [];

    if (favorita) {
      lista = lista.filter((item) => item.id !== cidade.id);
    } else {
      lista.push(cidade);
    }

    await AsyncStorage.setItem('cidades_favoritas', JSON.stringify(lista));
    setFavorita(!favorita);
  };

  const formatarData = (data: string) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}`;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Text style={{ color: 'red' }}>Erro: {error}</Text>
      </View>
    );
  }

  const hoje = dias[0];
  const vaiChover = hoje && hoje.chance >= 50;

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{cidade.nome}</Text>
          <Text style={{ color: '#666666' }}>{cidade.estado} - {cidade.pais}</Text>
        </View>
        <Pressable onPress={favoritar}>
          <MaterialIcons name={favorita ? 'star' : 'star-border'} size={30} color={favorita ? '#f1c40f' : '#999999'} />
        </Pressable>
      </View>

      <View style={{ backgroundColor: vaiChover ? '#1565c0' : '#f9a825', padding: 20, marginTop: 16, alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>{vaiChover ? 'VAI CHOVER' : 'NÃO VAI CHOVER'}</Text>
        <Text style={{ color: '#ffffff', fontSize: 16, marginTop: 4 }}>Chance de chuva hoje: {hoje?.chance}%</Text>
        <Text style={{ color: '#ffffff', fontSize: 16 }}>Temperatura agora: {temperatura}°C</Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 8 }}>Próximos dias</Text>
      <FlatList
        data={dias}
        keyExtractor={(item) => item.data}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
            <Text style={{ width: 60, fontWeight: 'bold' }}>{formatarData(item.data)}</Text>
            <MaterialIcons name={item.chance >= 50 ? 'umbrella' : 'wb-sunny'} size={22} color={item.chance >= 50 ? '#1565c0' : '#f9a825'} />
            <Text style={{ flex: 1, marginLeft: 8 }}>{item.chance}% - {item.chuva} mm</Text>
            <Text>{Math.round(item.minima)}° / {Math.round(item.maxima)}°</Text>
          </View>
        )}
      />
    </View>
  );
}
