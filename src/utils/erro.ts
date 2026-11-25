export const MENSAGEM_SEM_CONEXAO = 'Sem conexão. Verifique sua internet.';
export const MENSAGEM_ERRO_GENERICO = 'Não foi possível carregar os dados.';

// No React Native, o fetch lança um TypeError ("Network request failed")
// quando não há internet. Aqui trocamos as mensagens em inglês por português.
export function mensagemDeErro(err: unknown): string {
  if (err instanceof TypeError) {
    return MENSAGEM_SEM_CONEXAO;
  }
  return MENSAGEM_ERRO_GENERICO;
}
