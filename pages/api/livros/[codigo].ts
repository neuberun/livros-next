import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '@/classes/controle/ControleLivros';

const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (req.method === 'DELETE') {
      const codigo = Number(req.query.codigo);
      controleLivro.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


