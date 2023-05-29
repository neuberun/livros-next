import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '@/componentes/Menu';
import { LinhaLivro } from '@/componentes/LinhaLivro';
import { Livro } from '@/classes/modelo/Livro';
import { ControleLivros } from '@/classes/controle/ControleLivros';

const controleLivros = new ControleLivros();

const LivroLista: React.FC = () => {
    const baseURL = 'http://localhost:3000/api/livros';
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        obterLivros()
            .then((resposta) => resposta.json())
            .then((data) => {
                setLivros(data);
                setCarregado(true);
            });
    }, []);

    const obterLivros = async () => {
        return await fetch(baseURL);
    };

    const excluirLivro = async (codigo: number) => {
        const response = await fetch(`${baseURL}/${codigo}`, {
            method: 'DELETE',
        });
        return response.ok;
    };

    const excluir = async (codigo: number) => {
        setLivros((livrosAntigos) =>
            livrosAntigos.filter((livro) => livro.codigo !== codigo)
        );

        await excluirLivro(codigo);
    };

    return (
        <div >
            <Head>
                <title>Livro Lista</title>
            </Head>

            <Menu />

            <main >
                <h1 >Lista de Livros</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carregado &&
                            livros.map((livro) => (
                                <LinhaLivro
                                    key={livro.codigo}
                                    livro={livro}
                                    excluir={excluir}
                                    controleLivros={controleLivros}
                                />
                            ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;
