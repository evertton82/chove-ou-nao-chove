import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const coresClaro = {
  fundo: '#ffffff',
  texto: '#000000',
  textoFraco: '#666666',
  borda: '#dddddd',
  campo: '#cccccc',
  cabecalho: '#ffffff',
};

const coresEscuro = {
  fundo: '#121212',
  texto: '#ffffff',
  textoFraco: '#aaaaaa',
  borda: '#333333',
  campo: '#555555',
  cabecalho: '#1e1e1e',
};

type Tema = {
  escuro: boolean;
  cores: typeof coresClaro;
  trocarTema: () => void;
};

const TemaContext = createContext<Tema>({ escuro: false, cores: coresClaro, trocarTema: () => {} });

export function TemaProvider({ children }: { children: ReactNode }) {
  const temaCelular = useColorScheme();
  const [escuro, setEscuro] = useState<boolean>(temaCelular === 'dark');

  useEffect(() => {
    AsyncStorage.getItem('tema').then((valor) => {
      if (valor) {
        setEscuro(valor === 'escuro');
      }
    });
  }, []);

  const trocarTema = () => {
    const novo = !escuro;
    setEscuro(novo);
    AsyncStorage.setItem('tema', novo ? 'escuro' : 'claro');
  };

  return (
    <TemaContext.Provider value={{ escuro, cores: escuro ? coresEscuro : coresClaro, trocarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}
