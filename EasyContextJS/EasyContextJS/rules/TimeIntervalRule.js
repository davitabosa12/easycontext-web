import TimeIntervalMethod from "../enums/TimeIntervalMethod";
class TimeIntervalRule{
        
    static aroundTimeInstant(timeInstant, startOffsetMillis, stopOffsetMillis){
        return {
            rule: "TimeInterval",
            method: TimeIntervalMethod.AROUND_TIME_INSTANT,
            timeInstant: timeInstant,
            startOffsetMillis: startOffsetMillis,
            stopOffsetMillis: stopOffsetMillis,
        }
    }

    static inDailyInterval(timeZone, startTimeOfDayMillis, stopTimeOfDayMillis){
        return {
            rule: "TimeInterval",
            method: TimeIntervalMethod.IN_DAILY_INTERVAL,
            timeZone: timeZone,
            startTimeOfDayMillis: startTimeOfDayMillis,
            stopTimeOfDayMillis: stopTimeOfDayMillis,
        }
    }

    static inInterval(startTimeMillis, stopTimeMillis){
        return {
            rule: "TimeInterval",
            method: TimeIntervalMethod.IN_DAILY_INTERVAL,
            startTimeMillis: startTimeMillis,
            stopTimeMillis: stopTimeMillis,
        }
    }

    static inIntervalOfDay(dayOfWeek, timeZone, startTimeOfDayMillis, stopTimeOfDayMillis){
        return {
            rule: "TimeInterval",
            method: TimeIntervalMethod.IN_DAILY_INTERVAL,
            dayOfWeek: dayOfWeek,
            timeZone: timeZone,
            startTimeOfDayMillis: startTimeOfDayMillis,
            stopTimeOfDayMillis: stopTimeOfDayMillis,
        }
    }

    static inTimeInterval(timeInterval){
        return {
            rule: "TimeInterval",
            method: TimeIntervalMethod.IN_DAILY_INTERVAL,
            timeInterval: timeInterval,
        }
    }
}