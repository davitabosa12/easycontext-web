import DAMethod from "../enums/DAMethod"
export default class DetectedActivityRule{
    

    static during(activityTypes){
        return {
            ruleName: "DetectedActivity",
            method: DAMethod.DURING,
            activityTypes: activityTypes
        }
    }

    static starting(activityTypes){
        return {
            ruleName: "DetectedActivity",
            method: DAMethod.STARTING,
            activityTypes: activityTypes
        }
    }

    static stopping(activityTypes){
        return {
            ruleName: "DetectedActivity",
            method: DAMethod.STOPPING,
            activityTypes: activityTypes
        }
    }
}