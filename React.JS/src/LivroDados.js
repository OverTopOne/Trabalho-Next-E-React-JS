import React, { useState } from 'react';
import { ControleLivro } from './controle/ControleLivros'; 
import { ControleEditora } from './controle/ControleEditora';
import { useNavigate } from 'react-router-dom';

const LivroDados = () => {
  const controleLivro = new ControleLivro();
  const controleEditora = new ControleEditora();
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(0);
  const navigate = useNavigate();

  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const livro = {
      codigo: 0, 
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora
    };
    controleLivro.incluir(livro);
    navigate('/');
  };

  return (
    <main>
      <h1>Adicionar Livro</h1>
      <form onSubmit={incluir}>
        <div>
          <label>Título</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div>
          <label>Resumo</label>
          <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} />
        </div>
        <div>
          <label>Autores</label>
          <textarea value={autores} onChange={(e) => setAutores(e.target.value)} />
        </div>
        <div>
          <label>Editora</label>
          <select value={codEditora} onChange={tratarCombo}>
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </main>
  );
};

export default LivroDados;
 