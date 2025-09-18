import { isToday, isThisWeek } from "date-fns";

export const Extensions  = (() => {
    const where = function(arr, hash={}) {
        const key = Object.keys(hash)[0]
        return arr.filter(item => item[key] === hash[key])
    };
    const highPriority = (arr) => {
        return where(arr, {"priority": "high"})
    }
    const completed = (arr) => {
        return where(arr, {"completed": true})
    }
    const today = (arr) => {
        return arr.filter(e => {
            return isToday(new Date(e.year, e.month, e.day)) >= 1;
        })
    }
    const upcoming = (arr) => {
        return arr.filter(e => {
            if (!isToday(new Date(e.year, e.month, e.day)) >= 1) {
                return isThisWeek(new Date(e.year, e.month, e.day))
            };
        })
    }
    return { where, highPriority, completed, today, upcoming }
})()
