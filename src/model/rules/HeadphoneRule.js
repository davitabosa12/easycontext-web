import HeadphoneMethod from "../enums/HeadphoneMethod"
export default class HeadphoneRule{
    
    constructor(){
        
    }

    static pluggingIn(){
        return {
            ruleName: "Headphone",
            method: HeadphoneMethod.PLUGGING_IN,
        }
    }
    static unplugging(){
        return {
            ruleName: "Headphone",
            method: HeadphoneMethod.UNPLUGGING,
        }
    }
    static during(state){
        return {
            ruleName: "Headphone",
            method: HeadphoneMethod.DURING,
            headphoneState: state,
        }
    }
}

