import { useState, useEffect } from 'react';
import Head from 'next/head'; 
import { LinhaLivro } from '@/componentes/LinhaLivro';
import { Livro } from '@/classes/Livro'; 
import Menu from '@/componentes/Menu'; 
import styles from '../styles/Home.module.css';

const baseURL = 'http://localhost:3000/api/livros';

const obterLivros = async (): Promise<Livro[]> => {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Erro ao obter livros');
    }
    return response.json();
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
  try {
    const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Erro ao excluir livro');
    }
    return true;
  } catch (error) {
    console.error('Erro:', error);
    return false;
  }
};

const LivroLista = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      obterLivros().then((dados) => {
        setLivros(dados);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    if (sucesso) {
      setCarregado(false); 
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de Livros</title>
        <meta name="description" content="Lista de livros" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ações</th>
              <th>Título</th>
              <th>Editora</th>
              <th>Resumo</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={excluir}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
