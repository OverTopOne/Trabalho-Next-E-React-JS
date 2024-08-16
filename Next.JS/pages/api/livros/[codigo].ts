import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivro } from '@/classes/ControleLivros'; 


const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {

      const { codigo } = req.query;
      if (typeof codigo !== 'string') {
        return res.status(400).json({ message: 'Código do livro inválido' });
      }
      controleLivro.excluir(Number(codigo));
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } else {

      res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {

    res.status(500).json({ message: 'Erro do servidor' });
  }
};
