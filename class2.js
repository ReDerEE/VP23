const firstName = "Carl-Eric";
const lastName = "Sepp";
function dateETformatted(){
    const monthNamesET = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
    console.log("Programmi autor on: " + firstName + " " + lastName);
    let timeNow = new Date();
    //console.log("Aeg praegu on " + timeNow);
    let dateNow = timeNow.getDate();
    let monthNow = timeNow.getMonth();
    let yearNow = timeNow.getFullYear();
    //let dateET = dateNow+"."+(monthNow+1)+"."+yearNow;
    let dateET = dateNow+". "+monthNamesET[monthNow]+" "+yearNow;
    console.log("Täna on: "+dateET);
    return dateET;
}
let dateETNow = dateETformatted();
//dateETformatted;
console.log(dateETNow);
console.log("Täna tõesti "+dateETformatted())