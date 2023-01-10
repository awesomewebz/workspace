function getHour(time_from, time_to) {
    time_from = time_from.split(":");
    time_to = time_to.split(":");
    let hourFrom = parseInt(time_from[0]);
    let hourto = parseInt(time_to[0]);
    let minFrom = parseInt(time_from[1]);
    let minto = parseInt(time_to[1]);

    let hours = 0;

    if (hourto >= hourFrom) {
        hours = hourto - hourFrom;
        let min = minto - minFrom;
        let minPer = min / 60;
        hours += minPer;
    } else {
        hours = (24 - hourFrom) + hourto;
        let min = minto - minFrom;
        let minPer = min / 60;
        hours += minPer;
    }
    hours = parseFloat(hours.toFixed(2));

    return hours;
}

module.exports =  getHour;


