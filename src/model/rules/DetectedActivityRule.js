import DAMethod from "../enums/DAMethod"
class DetectedActivityRule{
    

    static during(...activityTypes){
        return {
            rule: "DetectedActivity",
            method: DAMethod.DURING,
            activityTypes: activityTypes
        }
    }

    static starting(...activityTypes){
        return {
            rule: "DetectedActivity",
            method: DAMethod.STARTING,
            activityTypes: activityTypes
        }
    }

    static stopping(...activityTypes){
        return {
            rule: "DetectedActivity",
            method: DAMethod.STOPPING,
            activityTypes: activityTypes
        }
    }
}