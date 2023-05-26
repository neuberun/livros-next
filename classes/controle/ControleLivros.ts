import { Livro } from '../modelo/Livro';

let livros: Array<Livro> = [
    new Livro(
        1,
        3,
        'Como fazer amigos e influenciar pessoas',
        'Manipule a mente dos outros usando técnicas de pseudo ciência.',
        ['John Doe', 'Mary Stuart', 'Richard Kimble']
    ),
    new Livro(
        2,
        2,
        '100 receitas infalíveis para um jantar memorável',
        'Desperte o Chef que existe dentro de você.',
        ['Margaret Dong', 'Xiao Ping']
    ),
    new Livro(
        3,
        1,
        'Viagem transcedental para idiotas',
        'Aprenda a sair do corpo ao adormecer.',
        ['Mary Poppings', 'Hel Heimer', 'Adungo Ababe', 'João Ninguém']
    )
]

export class ControleLivros {

    obterLivros() {
        return livros;
    }

    incluir(livro: Livro): void {
        let codigo = 0;
        
        for (let i = 0; i < livros.length; i++) {
            if (livros[i].codigo > codigo) {
                codigo = livros[i].codigo;
            }
        }
        
        codigo++;
        livro.codigo = codigo;
        livros.push(livro);
    }

    excluir(codigo: number): void {
        let index = livros.findIndex((item) => item.codigo === codigo);

        if (index !== -1) {
            livros.splice(index, 1);
        }
    }
}