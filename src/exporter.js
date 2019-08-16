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
        console.log(element)
        let rules;
        if(!element.rule){
            error = {
                cause: "no rules in fence",
                where: element.fence.name,
            }
            return;
        }
        if (element.rule.length > 1) {
            for (let i = 0; i < element.rule.length; i++) {
                if (i < 2) {
                    rules = AggregateRule.or(element.rule[0].rule, element.rule[1].rule);
                } else {
                    rules = AggregateRule.or(rules, element.rule[i].rule);
                }
            }
        } else {
            rules = element.rule[0].rule;
        }

        if(!element.action){
            error = {
                cause: "no actions in fence",
                where: element.fence.name
            }
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