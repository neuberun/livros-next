import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditoras } from '@/classes/controle/ControleEditoras';
import { Editora } from '@/classes/modelo/Editora';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';

const controleEditora = new ControleEditoras();

class ControleEditora {
  getEditoras(): string[] {
    const editoras: any = controleEditora.getEditoras();
    return editoras;
  }

  getNomeEditora(codEditora: number): string {
    // Implemente o código para obter o nome da editora com base no código
    const editoras = ['Editora A', 'Editora B', 'Editora C'];
    if (codEditora >= 0 && codEditora < editoras.length) {
      return editoras[codEditora];
    }
    throw new Error('Código de editora inválido');
  }
}


export default (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (req.method === 'GET') {
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
    } else {
      res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message as string });
  }
};
