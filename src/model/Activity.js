/**
 * Classe que representa uma tela no projeto do usuario.
 */
export default class Activity{
    constructor(...fences){
        this.fences = fences || [];
    }

    addFence(...fences){
        this.fences = [...this.fences, ...fences];
    }
}