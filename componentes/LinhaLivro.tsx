import { ControleEditoras } from '@/classes/controle/ControleEditoras';
import { ControleLivros } from '@/classes/controle/ControleLivros';
import { Livro } from '@/classes/modelo/Livro';
import { useState, useEffect } from 'react';

const controleEditora = new ControleEditoras();

interface LinhaLivroProps {
    livro: Livro;
    excluir(codigo: number): void;
    controleLivros: ControleLivros;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = ({
    livro,
    excluir,
    controleLivros,
}) => {
    const [nomeEditora, setNomeEditora] = useState('');

    useEffect(() => {
        const getNomeEditora = async (codEditora: number) => {
            try {
                const nome = await controleEditora.getNomeEditora(codEditora);
                setNomeEditora(nome);
            } catch (error) {
                console.error('Erro ao obter nome da editora:', error);
            }
        };

        getNomeEditora(livro.codEditora);
    }, [livro.codEditora]);

    // Função para excluir o livro
    const handleExcluirLivro = async (codLivro: number) => {
        await controleLivros.excluir(codLivro);
        excluir(codLivro); // Atualiza a lista após a exclusão
    };

    return (
        <tr>
            <td>
                {livro.titulo}
                <br />
                <button
                    className='btn btn-danger'
                    style={{ marginTop: '0.5rem' }}
                    onClick={() => handleExcluirLivro(livro.codigo)}
                >
                    Excluir
                </button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

