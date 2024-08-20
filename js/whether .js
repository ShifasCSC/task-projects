const apiKey="382910a4b8e885c416fcb677a59fdca7";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input")
const searchBtn=document.querySelector(".search button")
async function checkWhether(city){
    // try{
        const res=await fetch(apiUrl+ city +`&appid=${apiKey}`);
        var data=await res.json();
        console.log(data);
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temperature").innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
        document.querySelector(".wind").innerHTML=Math.round(data.wind.speed)+"km/h";
    
// }catch(error){
//  console.log(error);
 
// }

}

searchBtn.addEventListener("click",()=>{
    checkWhether(searchBox.value);

})