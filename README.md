# Chove ou não chove?

Aplicativo mobile feito em React Native com Expo para a disciplina de Desenvolvimento de Software para Dispositivos Móveis.

O usuário busca uma cidade e o app responde de forma direta se **vai chover ou não** naquele dia, além de mostrar a previsão dos próximos 7 dias.

**Alunos responsáveis:** Éverton Coelho e Andrew

---

## 1. Requisitos Funcionais

| Código | Requisito | Descrição |
|---|---|---|
| RF01 | Buscar cidade | O usuário digita o nome de uma cidade e o app lista as cidades encontradas, com estado e país. |
| RF02 | Validar busca | O app não faz a busca se o campo estiver vazio ou com menos de 2 letras e mostra uma mensagem de aviso. |
| RF03 | Ver previsão | Ao tocar em uma cidade da lista, o app abre a tela de previsão dessa cidade. |
| RF04 | Informar se vai chover | O app mostra "VAI CHOVER" quando a chance de chuva do dia for de 50% ou mais e "NÃO VAI CHOVER" quando for menor. |
| RF05 | Mostrar temperatura atual | A tela de previsão mostra a temperatura atual da cidade. |
| RF06 | Previsão dos próximos dias | O app lista os próximos 7 dias com data, chance de chuva (%), quantidade de chuva (mm) e temperaturas mínima e máxima. |
| RF07 | Favoritar cidade | O usuário pode marcar ou desmarcar uma cidade como favorita tocando na estrela. |
| RF08 | Listar favoritas | O app tem uma tela com as cidades favoritas; ao tocar em uma, abre a previsão dela. |
| RF09 | Tela Sobre | O app tem uma tela com informações do aplicativo e dos alunos responsáveis. |
| RF10 | Mensagens de erro | O app avisa quando nenhuma cidade for encontrada ou quando não for possível carregar os dados. |

## 2. Requisitos Não Funcionais

| Código | Categoria | Descrição |
|---|---|---|
| RNF01 | Plataforma | O app deve rodar em Android e iOS pelo Expo Go (Expo SDK 58). |
| RNF02 | Tecnologia | Desenvolvido em React Native com TypeScript e navegação com Expo Router (Drawer). |
| RNF03 | Dados externos | Os dados de cidades e clima vêm da API gratuita Open-Meteo, que não precisa de chave de acesso. |
| RNF04 | Armazenamento | As cidades favoritas ficam salvas no próprio celular com AsyncStorage e continuam salvas depois de fechar o app. |
| RNF05 | Conexão | O app precisa de internet para buscar cidades e previsões. |
| RNF06 | Desempenho | Enquanto os dados carregam, o app mostra um indicador de carregamento. A resposta deve aparecer em poucos segundos com uma conexão normal. |
| RNF07 | Usabilidade | A resposta principal ("VAI CHOVER" / "NÃO VAI CHOVER") deve aparecer em destaque, com cor azul para chuva e amarela para tempo seco. |
| RNF08 | Idioma | Todas as telas em português do Brasil. |
| RNF09 | Privacidade | O app não pede login nem coleta dados pessoais; a localização é escolhida pelo usuário na busca. |

---

## 5. Como executar

```bash
npm install
npx expo start
```

Depois é só ler o QR Code com o app **Expo Go** no celular.

## 6. API utilizada

- Cidades: `https://geocoding-api.open-meteo.com/v1/search`
- Previsão: `https://api.open-meteo.com/v1/forecast`

Documentação: https://open-meteo.com/en/docs
