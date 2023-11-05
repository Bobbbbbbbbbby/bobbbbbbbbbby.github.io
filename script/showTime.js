//const timeDiv = document.getElementById("time");
//setInterval(() => {
//    timeDiv.innerText = getTime();
//}, 1000)

function getTime() {
    const date = new Date();
    const hr = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${hr < 10 ? '0' + hr : hr}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}