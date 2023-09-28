const dateValue = require("./dateTime_ET");
const timeValue = require("./dateTime_ET");
const partOfDay = require("./dateTime_ET");
const http = require("http");
http.createServer(function(req,res) {
    res.writeHead(200,{"Content-type":"text/html"});
    res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Carl-Eric Sepp, veebiprogrammeerimimine 2023, miks nii pikk?</title></head><body>');
    res.write('<h1>Carl-Eric Sepp</h1><p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames</p><p>See ei ole saladus, et olin siin ;)</p>');
    res.write('<p>Lehekülg avati '+dateValue.dateETformatted()+' kell '+timeValue.timeFormatted()+'.</p>');
    res.write('<p>Praegu on '+partOfDay.timeOfDayET()+'.</p>')
    res.write('<hr></body></html>');
    //valmis, saada ära
    return res.end();
}).listen(5132);

//kasutame port'e 5132

//rinde 5100