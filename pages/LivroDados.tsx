import { useState } from 'react';
import Head from 'next/head';
import { Menu } from '@/componentes/Menu';
import styles from '@/pages/styles/Home.module.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import { ControleEditoras } from '@/classes/controle/ControleEditoras';
import { useRouter } from 'next/router';

const controleEditora = new ControleEditoras();
const baseURL = 'http://localhost:3000/api/livros';

const LivroDados: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState('1');
    const opcoes = controleEditora.getEditoras().map(editora =>
    ({
        value: editora.codEditora.toString(),
        text: editora.nome
    }));

    const router = useRouter();

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(event.target.value);
    };

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const novoLivro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora: Number(codEditora)
        };

        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLivro)
            });

            if (response.ok) {
                router.push('/LivroLista');
            } else {
                throw new Error('Erro ao incluir o livro.');
            }
        } catch (error) {
            console.log(error);
            // Tratar o erro conforme necessário
        }
    };

    return (
        <div className={styles.container}>
        <Head>
          <title>Livro Dados</title>
        </Head>
        <Menu />
        <main className={styles.main}>
          <h1 className={styles.title}>Página de Dados do Livro</h1>
          <form onSubmit={incluir}>
            <div className="mb-3">
              <label className="form-label">Título:</label>
              <input
                type="text"
                className="form-control"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Resumo:</label>
              <textarea
                className="form-control"
                value={resumo}
                onChange={e => setResumo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Autores:</label>
              <textarea
                className="form-control"
                value={autores}
                onChange={e => setAutores(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Editora:</label>
              <select
                className="form-select"
                value={codEditora}
                onChange={tratarCombo}
              >
                {opcoes.map(opcao => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.text}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Incluir
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  };

export default LivroDados;
