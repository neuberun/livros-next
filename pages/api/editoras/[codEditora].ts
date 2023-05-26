import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditoras } from '@/classes/controle/ControleEditoras';

const controleEditora = new ControleEditoras();

export default (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (req.method === 'GET') {
      const codEditora = Number(req.query.codEditora);
      const nomeEditora = controleEditora.getNomeEditora(codEditora);
      res.status(200).json({ nomeEditora });
    } else {
      res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message as string });
  }
};
