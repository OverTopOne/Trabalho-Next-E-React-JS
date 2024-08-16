import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; 
import { ControleEditora } from '@/classes/ControleEditora';
import { Livro } from '@/classes/Livro';
import styles from '../styles/Home.module.css'; 
import Menu from '@/componentes/Menu'; 

const controleEditora = new ControleEditora();
const baseURL = 'http://localhost:3000/api/livros';

const incluirLivro = async (livro: Livro): Promise<boolean> => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livro),
    });
    if (!response.ok) {
      throw new Error('Erro ao incluir livro');
    }
    return true;
  } catch (error) {
    console.error('Erro:', error);
    return false;
  }
};

const LivroDados = () => {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const router = useRouter();

  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora
    };
    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/LivroLista');
    } else {
      alert('Não foi possível adicionar o livro. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Adicionar Livro</title>
        <meta name="description" content="Adicionar novo livro" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Adicionar Livro</h1>
        <form onSubmit={incluir}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumo">Resumo</label>
            <textarea
              className="form-control"
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="autores">Autores (separados por linha)</label>
            <textarea
              className="form-control"
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editora">Editora</label>
            <select
              id="editora"
              className="form-control"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Adicionar</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
