import LocationMethod from "../enums/LocationMethod";
export default class LocationRule{
    entering(latitude, longitude, radius){
        return {
            rule: "Location",
            method: LocationMethod.ENTERING,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
        }
    }

    exiting(latitude, longitude, radius){
        return {
            rule: "Location",
            method: LocationMethod.EXITING,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
        }
    }

    in(latitude, longitude, radius, dwell){
        return {
            rule: "Location",
            method: LocationMethod.IN,
            latitude: latitude,
            longitude: longitude,
            radius: radius,
            dwellTimeMillis: dwell,
        }
    }
}