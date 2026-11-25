import { View, Text } from 'react-native';
import { useTema } from '../src/context/TemaContext';

export default function SobreScreen() {
  const { cores } = useTema();

  return (
    <View style={{ flex: 1, backgroundColor: cores.fundo, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: cores.texto }}>Sobre</Text>
      <Text style={{ fontSize: 16, marginBottom: 12, color: cores.texto }}>
        Aplicativo desenvolvido para a disciplina de Desenvolvimento de Software para Dispositivos Móveis.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12, color: cores.texto }}>
        Ele mostra se vai chover hoje na cidade escolhida e a previsão dos próximos dias.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12, color: cores.texto }}>
        Toque no ícone de sol ou lua no topo da tela para trocar entre o tema claro e o escuro.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12, color: cores.texto }}>Dados obtidos da Open-Meteo.</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: cores.texto }}>Alunos responsáveis</Text>
      <Text style={{ fontSize: 16, color: cores.texto }}>Éverton Coelho</Text>
      <Text style={{ fontSize: 16, color: cores.texto }}>Andrew</Text>
    </View>
  );
}
