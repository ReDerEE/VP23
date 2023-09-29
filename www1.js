const dateValue = require("./dateTime_ET");
const timeValue = require("./dateTime_ET");
const partOfDay = require("./dateTime_ET");
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const pageHead = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Carl-Eric Sepp, veebiprogrammeerimimine 2023, miks nii pikk?</title></head><body>';
const pageBanner = '<img src="vp_banner_2023.png" alt="veebiprogrammeerimimise kursuse bänner"></img>';
const pageBody = '<h1>Carl-Eric Sepp</h1>\n<p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames</p>\n<p>See ei ole saladus, et olin siin ;)</p>';
const pageOpenTime = '<p>Lehekülg avati '+dateValue.dateETformatted()+' kell '+timeValue.timeFormatted()+'.</p>';
const pageTimeDay = '<p>Praegu on '+partOfDay.timeOfDayET()+'.</p>';
const pageFoot = '<hr></body></html>';

//tekita server
http.createServer(function(req,res) {
    let currentURL = url.parse(req.url, true);
    console.log(currentURL);
    if (currentURL.pathname === "/"){
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(pageHead)
        res.write(pageBanner);
        res.write(pageBody);
        res.write(pageOpenTime);
        res.write(pageTimeDay)
        res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi</a>!</hr>')
        res.write(pageFoot);
        return res.end();
    }
    else if(currentURL.pathname === '/addname'){
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(pageHead)
        res.write(pageBanner);
        res.write(pageBody);
        res.write(pageOpenTime);
        res.write(pageTimeDay);
        res.write('<h1>Lisa oma nimi</h1>');
        res.write(pageFoot);
        return res.end();
    }
    else if (currentURL.pathname === "/vp_banner_2023.png"){
        console.log("Tahame pilti")
        let bannerPath = path.join(__dirname, "public", "banner");
        fs.readFile(bannerPath + currentURL.pathname,(err, data)=>{
        if (err){
            throw err;
        }
        else{
            res.writeHead(200,{"Content-type":"image/png"});
            console.log(bannerPath+currentURL.pathname)
            return res.end(data);
        }
        });
    
        }
    else {
        res.end("ERROR 404");
    }
    //valmis, saada ära
}).listen(5132);

//kasutame port'e 5132

//rinde 5100