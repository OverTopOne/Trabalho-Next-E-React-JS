import type { NextApiRequest, NextApiResponse } from "next";
import { ControleEditora } from "@/classes/ControleEditora";


const controleEditora = new ControleEditora();


export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method === 'GET') {

        const { codEditora } = req.query;
        if (typeof codEditora !== 'string') {
          return res.status(400).json({ message: 'Código da editora inválido' });
        }
        const nomeEditora = controleEditora.getNomeEditora(Number(codEditora));
        res.status(200).json({ nome: nomeEditora });
      } else {

        res.status(405).json({ message: 'Método não permitido' });
      }
    } catch (error) {

      res.status(500).json({ message: 'Erro do servidor' });
    }
  };