import Fence from "./model/Fence"
import AggregateRule from "./model/rules/AggregateRule"
function readData(fences) {
    let error = undefined;
    let finalObj = {};
    finalObj.version = "1.0";
    finalObj.fences = [];
    fences.forEach(element => {
        let fenceObj = new Fence(element.fence.name);
        fenceObj.action = [];
        let rules;
        if(!element.rule || element.rule.length == 0){
            error = {
                cause: "No conditions in rule",
                where: element.fence.name,
            }
            return;
        }
        if(element.rule.length > 1){
            //combine into operators.
            if(element.operators[0].operation === "and"){
                rules = AggregateRule.and(element.rule[0].rule, element.rule[1].rule);
            } else {
                rules = AggregateRule.or(element.rule[0].rule, element.rule[1].rule);
            }
            
            for(var i = 2; i < element.rule.length; i++){
                let op = element.operators[i - 1].operation;
                if(op === "and"){
                    rules = AggregateRule.and(rules, element.rule[i].rule);
                } else {
                    rules = AggregateRule.or(rules, element.rule[i].rule);
                }
            }
        } else {
            rules = element.rule[0].rule;
        }
        if(!element.action || element.action.length == 0){
            error = {
                cause: "No actions in rule",
                where: element.fence.name
            }
            return;
        }
        for (let i = 0; i < element.action.length; i++) {
            // TODO: Check for error in each Action.
            fenceObj.action.push(element.action[i].action);
        }
        fenceObj.rule = rules;
        finalObj.fences.push(fenceObj);
    });

    return {
        json: JSON.stringify(finalObj),
        error: error }
}
export default readData;