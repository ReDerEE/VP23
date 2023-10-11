exports.dateETformatted = function(){
    const monthNamesET = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
    let timeNow = new Date();
    let dateNow = timeNow.getDate();
    let monthNow = timeNow.getMonth();
    let yearNow = timeNow.getFullYear();
    let dateET = dateNow+". "+monthNamesET[monthNow]+" "+yearNow;
    return dateET;
}
exports.timeFormatted = function(){
    let timeNow = new Date();
    let timeFormatted = (timeNow.getHours()+":"+timeNow.getMinutes()+":"+timeNow.getSeconds());
    return timeFormatted;
}
//module.exports = (dateETformatted: dateETformatted, timeFormatted: timeFormatted);

exports.timeOfDayET = function(){
    let partOfDay = "suvaline hetk";
    let hourNow = new Date().getHours();
    if(hourNow >= 18){
        partOfDay = "õhtu"
    }
    if(hourNow >= 6 && hourNow < 12){
        partOfDay = "hommik"
    }
    if(hourNow > 12 && hourNow < 18){
        partOfDay = "pärasthommik"
    }
    return partOfDay
}

exports.formatTime = function(day, month, year){
    const monthNamesET = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
    let formattedTime = (day+". "+monthNamesET[month]+" "+year);
    return formattedTime;
};