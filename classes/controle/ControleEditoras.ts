import { Editora } from '../modelo/Editora';

let editoras: Array<Editora> = [
    new Editora(
        1,
        'Editora dos Bacanas'
    ),
    new Editora(
        2,
        'Editora Lost Cavity'
    ),
    new Editora(
        3,
        'Editora Bandeirante'
    )
]

export class ControleEditoras {

    getNomeEditora(codEditora: number) {
        // usando a função find
        // return editoras.find(item => item.codEditora === codEditora)?.nome; 

        // usando filter
        return editoras.filter(item => item.codEditora === codEditora)[0].nome;
    }

    getEditoras() {
        return editoras;
    }
}