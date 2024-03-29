import AggregateMethod from "../enums/AggregateMethod";
export default class AggregateRule{
    /**
     * Fabrica uma AggregateRule de And.
     * @param  {...Rule} rules um array de regras
     */
    static and(...rules){
        return {
            ruleName: "Aggregate",
            method: AggregateMethod.AND,
            rules: rules,
        }
    }

    /**
     * Cria um AggregateRule de OR
     * @param  {...any} rules as regras a serem compostas
     */
    static or(...rules){
        return {
            ruleName: "Aggregate",
            method: AggregateMethod.OR,
            rules: rules,
        }        
    }

    /**
     * Cria um AggregateRule de negacao
     * @param {Rule} rule A regra a ser negada
     */
    static not(rule){
        return {
            ruleName: "Aggregate",
            method: AggregateMethod.NOT,
            rules: rule,
        }
    }
}