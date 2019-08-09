import HeadphoneMethod from "../enums/HeadphoneMethod"
export default class HeadphoneRule{
    
    constructor(){
        
    }

    static pluggingIn(){
        return {
            rule: "Headphone",
            method: HeadphoneMethod.PLUGGING_IN,
        }
    }
    static unplugging(){
        return {
            rule: "Headphone",
            method: HeadphoneMethod.UNPLUGGING,
        }
    }
    static during(state){
        return {
            rule: "Headphone",
            method: HeadphoneMethod.DURING,
            headphoneState: state,
        }
    }
}

