import type { NextApiRequest,NextApiResponse } from "next";
import { ControleEditora } from  "@/classes/ControleEditora";


const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {

      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
    } else {

      res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {

    res.status(500).json({ message: 'Erro do servidor' });
  }
};