import { store } from "../store/store"

const PRESSURE_UNTITS = 0.750062

export function addLocation(inputLocation: string) {
    if (inputLocation.length !== 0) {
        store.dispatch('addLocation', inputLocation)
    }
}

export function currentTime() {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return {
        hours: today.getHours(),
        minutes: today.getMinutes()
    }
}


export function sunsetSunrise(unix_timestamp: number) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

export function getPressureMm(hpa: number|undefined) {
    if(hpa) {
        return Math.round(hpa * PRESSURE_UNTITS)
    }
}




