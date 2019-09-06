export default class Fence {
    constructor(name, rule, action){
        this.name = name;
        this.rule = rule;
        this.action = action;
    }

    /**
     * Serializa este objeto Fence em uma string JSON.
     */
    serialize(){
        let obj = {
            name: this.name,
            rule: this.rule,
            action: this.action,
        }
        return obj;
    }
}