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
const dateNow = new Date();

//Semesterprogress constants
const SPstartDate = new Date("08/28/2023");
const SPendDate = new Date("01/28/2024");
const SPlastedFor = Math.round((dateNow.getTime() - SPstartDate.getTime())/(1000*60*60*24)); 
const SPongoing = "Semester käib praegusel hetkel!";
const SPnotStarted = "Semester ei ole alanud veel!";
const SPended = "Semester on lõppenud!";
const SPdays = Math.round((SPendDate.getTime()-SPstartDate.getTime())/(1000*60*60*24));

//todo 
    //D new page /semesterprogress
        //D start date 
        //D end date 
        // kas käib, tuleb, või läbi
            //D kui käib, kui palju mööda on läinud ja kui palju veel on
            //D lisa meter <meter min="0" max="x" value="y"></meter>
    //new page for image on TLU


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
        res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi</a>!</hr>');
        res.write('<p><a href="semesterprogress">Semestriprogress</a></p>');
        res.write('<p><a href="tluphoto">Pildid TLÜ-st</a></p>')
        res.write(pageFoot);
        return res.end();
    }
    //"Lisa om nimi" leht
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
    //TLU pildi leht
    else if (currentURL.pathname === '/tluphoto'){
        res.write(pageHead);
        res.write('<img src="tlu_20.jpg" alt="Nagu oleks kodus"></img>');
        res.write(pageFoot);
        return res.end();
    }
    //kui küsib tlu pilti
    else if(currentURL.pathname === '/tlu_20.jpg'){
        console.log("Tahame pilti")
        let tluPhotoPath = path.join(__dirname, "public", "tluphotos");
        fs.readFile(tluPhotoPath + currentURL.pathname,(err, data)=>{
        if (err){
            throw err;
        }
        else{
            res.writeHead(200,{"Content-type":"image/png"});
            console.log(tluPhotoPath+currentURL.pathname)
            return res.end(data);
        }});
    }
    //Semestriprogressi leht
    else if(currentURL.pathname === '/semesterprogress'){
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write('<h2>Semester algas '+SPstartDate.getDay()+'.'+SPstartDate.getMonth()+'.'+SPstartDate.getFullYear()+'.</h2>');
        res.write('<h2>Semester lõppeb '+SPendDate.getDay()+'.'+SPendDate.getMonth()+'.'+SPendDate.getFullYear()+'.</h2>');
        res.write('<h3>Semester on kestnud '+SPlastedFor+' päeva.</h3>');
        res.write('<h4>Veel on minna '+(SPdays-SPlastedFor)+' päeva.</h4>');
        console.log(dateNow.getTime()+" "+SPendDate.getTime());
        //console.log(dateNow.getTime() > SPstartDate.getTime());
        //console.log(dateNow.getTime() < SPendDate.getTime());
        //kas semester käib, tuleb või on läbi
        if (dateNow.getTime() > SPstartDate.getTime() && dateNow.getTime() < SPendDate.getTime()){
            res.write('<p>'+SPongoing+'</p>');
        }
        else if (dateNow.getTime() < SPstartDate.getTime()){
            res.write('<p>'+SPnotStarted+'</p>');
        }
        else if (dateNow.getTime() > SPstartDate.getTime()){
            res.write('<p>'+SPended+'</p>');
        }
        console.log(SPendDate.getTime()+" "+dateNow.getTime());
        res.write('<meter id="Progress" min="0" max="'+SPdays+'" value="'+SPlastedFor+'"></meter>'); //FIX IT
        //res.write('<meter min="0" max=10 value=5></meter>')
        res.write(pageFoot);
        return res.end();
    }
    //Kui küsib pilti "vp_banner_2023.png"
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
    //Kui alamkataloogi ei leitud
    else {
        res.end("ERROR 404");
    }
//valmis, saada ära
}).listen(5132);

//kasutame port'e 5132

//rinde 5100