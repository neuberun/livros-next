import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '@/classes/controle/ControleLivros';

const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (req.method === 'GET') {
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      const { livro } = req.body;
      controleLivro.incluir(req.body);
      res.status(200).json({ message: 'Livro incluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
