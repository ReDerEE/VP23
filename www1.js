const dateValue = require("./dateTime_ET");
const timeValue = require("./dateTime_ET");
const partOfDay = require("./dateTime_ET");
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { randomInt } = require("crypto");
const pageHead = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Carl-Eric Sepp, veebiprogrammeerimimine 2023, miks nii pikk?</title></head><body>';
const pageBanner = '<img src="vp_banner_2023.png" alt="veebiprogrammeerimimise kursuse bänner"></img>';
const pageBody = '<h1>Carl-Eric Sepp</h1>\n<p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames</p>\n<p>See ei ole saladus, et olin siin ;)</p>';
const pageOpenTime = '<p>Lehekülg avati '+dateValue.dateETformatted()+' kell '+timeValue.timeFormatted()+'.</p>';
const pageTimeDay = '<p>Praegu on '+partOfDay.timeOfDayET()+'.</p>';
const pageFoot = '<hr></body></html>';
const dateNow = new Date();
const querystring = require("querystring")
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
    if (req.method === 'POST'){
        collectRequestData(req, result =>{
            console.log(result);
            //kirjutame andmeid tekstifaili
            fs.open('txtFiles/namelog.txt', 'a', (err, file)=>{
				if(err){
					throw err;
				}
				else {
					fs.appendFile('public/nameLog.txt', result.firstNameInput + ','+result.lastNameInput+","+(dateNow.getMonth()+1)+"/"+dateNow.getDate()+"/"+dateNow.getFullYear()+";",(err)=>{
						if(err){
							throw err;
						}
						else {
							console.log('faili kirjutati!');
						}
					});
				}
				fs.close(file, (err)=>{
					if(err){
						throw err;
					}
				});
			});
			
			//return res.end();
			//res.end('Tuligi POST!');
		});
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(pageHead)
        res.write(pageBanner);
        res.write(pageBody);
        res.write(pageOpenTime);
        res.write(pageTimeDay)
        res.write("<h2>Aitäh nime lisamast!</h2>");
        res.write('\n\t<hr>\n\t<p><a href="/">Avalehele</a>!</hr>');
        res.write(pageFoot);
        return res.end();
	}
    else if (currentURL.pathname === "/"){
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(pageHead)
        res.write(pageBanner);
        res.write(pageBody);
        res.write(pageOpenTime);
        res.write(pageTimeDay)
        res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi</a>!</hr>');
        res.write('<p><a href="semesterprogress">Semestriprogress</a></p>');
        res.write('<p><a href="tluphoto">Pildid TLÜ-st</a></p>')
        res.write('<p><a href="namepage">Leht inimestest, kes on külastanud</a></p>')
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
        res.write('\n\t<form method="POST">\n\t\t<label for="firstNameInput">Eesnimi: </label>\n\t\t<input type="text" name="firstNameInput" id="firstNameInput" placeholder="Sinu eesnimi ...">\n\t\t<br>\n\t\t<label for="lastNameInput">Perekonnanimi: </label>\n\t\t<input type="text" name="lastNameInput" id="lastNameInput" placeholder="Sinu perekonnanimi ...">\n\t\t<br>\n\t\t<input type="submit" name="nameSubmit" value="Salvesta">\n\t</form>');
        res.write('<h1>Lisa oma nimi</h1>');
        res.write(pageFoot);
        return res.end();
    }
    //TLU pildi leht
    //loeme kataloogist fotode nimekirja ja loosime ühe pildi
    

    else if (currentURL.pathname === "/tluphoto"){
		//loeme kataloogist fotode nimekirja ja loosime ühe pildi
		let htmlOutput = '\n\t<p>Pilti ei saa näidata!</p>';
		let listOutput = '';
		fs.readdir('public/tluphotos', (err, fileList)=>{
			if(err) {
				throw err;
				tluPhotoPage(res, htmlOutput, listOutput);
			}
			else {
				//console.log(fileList);
				let photoNum = Math.floor(Math.random() * fileList.length);
				htmlOutput = '\n\t<img src="' + fileList[photoNum] + '" alt="TLÜ pilt">';
				//console.log(htmlOutput);
				listOutput = '\n\t<ul>';
				for (fileName of fileList){
					listOutput += '\n\t\t<li>' + fileName + '</li>';
				}
				listOutput += '\n\t</ul>';
				//console.log(listOutput);
				tluPhotoPage(res, htmlOutput, listOutput);
			}
		});
	}
    //kui küsib tlu pilti
    
    //Semestriprogressi leht
    else if(currentURL.pathname === '/semesterprogress'){
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write('<h2>Semester algas '+SPstartDate.getDate()+'.'+(SPstartDate.getMonth()+1)+'.'+SPstartDate.getFullYear()+'.</h2>');
        res.write('<h2>Semester lõppeb '+SPendDate.getDate()+'.'+(SPendDate.getMonth()+1)+'.'+SPendDate.getFullYear()+'.</h2>');
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
    //näitame nimed ära
    else if (currentURL.pathname === "/namepage") {
        fs.readFile("public/nameLog.txt", "utf-8", (err, data)=>{
            if (err){
                throw err;
            }
            else {
                let namesAndDates = "";
                namesAndDates = data;
                let nameArray = namesAndDates.split(";");
                console.log(nameArray)
                res.writeHead(200,{"Content-type":"text/html"});
                res.write(pageHead);
                res.write(pageBanner);
                res.write("<h2>Külastajad:</h2>")
                let listOutput = '';
                for (i of nameArray) {
                    listOutput += '\n\t\t<li>' + i + '</li>';
                }
                listOutput += '\n\t</ul>';
                res.write(listOutput)
                res.write(pageFoot)
                return res.end()
                }
            }
        )
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
    
    else if (path.extname(currentURL.pathname) === ".jpg"){
        console.log(path.extname(currentURL.pathname));
        //let filePath = path.join(__dirname, "public", "tluphotos/tlu_42.jpg");
        let filePath = path.join(__dirname, "public", "tluphotos");
        fs.readFile(filePath + currentURL.pathname, (err, data)=>{
            if(err){
                throw err;
            }
            else {
                res.writeHead(200, {"Content-Type": "image/jpeg"});
                res.end(data);
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
function tluphotopage(res, currentURL, fileList, photoNum){
    //if(currentURL.pathname === fileList[photoNum]){
        console.log("Tahame pilti")
        let tluPhotoPath = path.join(__dirname, "public", "tluphotos/");
        fs.readFile(tluPhotoPath + fileList[photoNum],(err, data)=>{
        if (err){
            throw err;
        }
        else{
            res.writeHead(200,{"Content-type":"image/png"});
            console.log(tluPhotoPath+fileList[photoNum]);
            res.write('<img src="'+fileList[photoNum]+'" alt="Nagu oleks kodus"></img>');
            return res.end(data)

        }});
        
    };
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}

function tluPhotoPage(res, htmlOut, listOutput){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(pageHead);
	res.write(pageBanner);
	res.write(pageBody);
	res.write('\n\t<hr>');
	res.write(htmlOut);
	if(listOutput != ''){
		res.write(listOutput);
	}
	//res.write('\n\t<img src="tlu_42.jpg" alt="TLÜ foto">');
	res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
	res.write(pageFoot);
	//et see kõik valmiks ja ära saadetaks
	return res.end();
}