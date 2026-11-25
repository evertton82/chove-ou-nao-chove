import { View, Text } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>Sobre</Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        Aplicativo desenvolvido para a disciplina de Desenvolvimento de Software para Dispositivos Móveis.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        Ele mostra se vai chover hoje na cidade escolhida e a previsão dos próximos dias.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>Dados obtidos da Open-Meteo.</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Alunos responsáveis</Text>
      <Text style={{ fontSize: 16 }}>Éverton Coelho</Text>
      <Text style={{ fontSize: 16 }}>Andrew</Text>
    </View>
  );
}
