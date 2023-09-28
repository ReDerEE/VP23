exports.timeFormatted = function(){
    let timeNow = new Date();
    let timeFormatted = (timeNow.getHours()+":"+timeNow.getMinutes()+":"+timeNow.getSeconds());
    return timeFormatted;
}