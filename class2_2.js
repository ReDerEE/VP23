const firstName = "Carl-Eric"
const lastName = "Sepp"
const { randomInt } = require("crypto");
const dateValue = require("./dateTime_ET");
const timeValue = require("./dateTime_ET");
const partOfDay = require("./dateTime_ET");
let wordList = "";
let folkList = [];
//let wordList = ""
const fs = require("fs");

fs.readFile("txtFiles/vanasonad.txt", "utf-8", (err, data)=>{
    if(err){
        console.log(err);
    }
    else {
        //console.log(data)
        wordList = data;
        onScreen(data);
    }
    
}); //readFile lõppeb


const onScreen = function(wordList){
    let dateETNow = dateValue.dateETformatted();
    console.log("Programmi autor on", firstName, lastName+".");
    //console.log(dateETNow);
    console.log("Täna tõesti "+dateValue.dateETformatted());
    //console.log(wordList)
    let folkWisdoms = wordList.split(";");
    console.log(folkWisdoms[randomInt(0,(folkWisdoms.length)-1)]);
    //console.log(folkWisdoms.length)
    //console.log(folkWisdoms);
    //kodune ülesanne: kell, millal käivitati 
    console.log("Programm käivitati kell "+timeValue.timeFormatted());
    console.log("Praegu on "+partOfDay.timeOfDayET()+".");
    //console.log(folkList)
    for(i in folkWisdoms){
        console.log("Vanasõna", (+i + +1)+":",'"'+folkWisdoms[i]+'"')
    }
}
//onScreen();