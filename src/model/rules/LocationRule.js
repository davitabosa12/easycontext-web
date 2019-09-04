import LocationMethod from "../enums/LocationMethod";
export default class LocationRule{
    static entering(latitude, longitude, radius){
        return {
            ruleName: "Location",
            method: LocationMethod.ENTERING,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
        }
    }

    static exiting(latitude, longitude, radius){
        return {
            ruleName: "Location",
            method: LocationMethod.EXITING,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
        }
    }

    static in(latitude, longitude, radius, dwell){
        return {
            ruleName: "Location",
            method: LocationMethod.IN,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
            dwellTimeMillis: dwell,
        }
    }
}