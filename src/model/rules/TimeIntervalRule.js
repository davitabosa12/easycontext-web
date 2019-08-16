import TimeIntervalMethod from "../enums/TimeIntervalMethod";
export default class TimeIntervalRule{
        
    static aroundTimeInstant(timeInstant, startOffsetMillis, stopOffsetMillis){
        return {
            ruleName: "TimeInterval",
            method: TimeIntervalMethod.AROUND_TIME_INSTANT,
            timeInstant: timeInstant,
            startOffsetMillis: startOffsetMillis,
            stopOffsetMillis: stopOffsetMillis,
        }
    }

    static inDailyInterval(timeZone, startTimeOfDayMillis, stopTimeOfDayMillis){
        return {
            ruleName: "TimeInterval",
            method: TimeIntervalMethod.IN_DAILY_INTERVAL,
            timeZone: timeZone,
            startTimeOfDayMillis: startTimeOfDayMillis,
            stopTimeOfDayMillis: stopTimeOfDayMillis,
        }
    }

    static inInterval(startTimeMillis, stopTimeMillis){
        return {
            ruleName: "TimeInterval",
            method: TimeIntervalMethod.IN_INTERVAL,
            startTimeMillis: startTimeMillis,
            stopTimeMillis: stopTimeMillis,
        }
    }

    static inIntervalOfDay(dayOfWeek, timeZone, startTimeOfDayMillis, stopTimeOfDayMillis){
        return {
            ruleName: "TimeInterval",
            method: TimeIntervalMethod.IN_INTERVAL_OF_DAY,
            dayOfWeek: dayOfWeek,
            timeZone: timeZone,
            startTimeOfDayMillis: startTimeOfDayMillis,
            stopTimeOfDayMillis: stopTimeOfDayMillis,
        }
    }

    static inTimeInterval(timeInterval){
        return {
            ruleName: "TimeInterval",
            method: TimeIntervalMethod.IN_TIME_INTERVAL,
            timeInterval: timeInterval,
        }
    }
}