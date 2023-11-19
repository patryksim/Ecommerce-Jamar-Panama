const finaleDate = new Date("Feb 13, 2023 14:00:00").getTime();

const timer = () =>{
    const now = new Date().getTime();
    let diff = finaleDate - now;
    // Showing the alert when the counter time finishes.
    if(diff < 0){
        document.querySelector('.container-contador').style.display = 'none';
    }
    
    let days = Math.floor(diff / (1000*60*60*24));
    let hours = Math.floor(diff % (1000*60*60*24) / (1000*60*60));
    let minutes = Math.floor(diff % (1000*60*60)/ (1000*60));
    let seconds = Math.floor(diff % (1000*60) / 1000);
  // Adding the zeros.
    days <= 99 ? days = `${days}` : days;
    days <= 9 ? days = `0${days}` : days;
    hours <= 9 ? hours = `0${hours}` : hours;
    minutes <= 9 ? minutes = `0${minutes}` : minutes;
    seconds <= 9 ? seconds = `0${seconds}` : seconds;   

    document.querySelector('#days').textContent = days;
    document.querySelector('#hours').textContent = hours;
    document.querySelector('#minutes').textContent = minutes;
    document.querySelector('#seconds').textContent = seconds;

}
timer();
// Calling the function every 1000 milliseconds.
setInterval(timer,1000);