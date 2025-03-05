let currentSize = 15;

function Skidor(){
    if (currentSize > 100){
        document.getElementById("Skidor").innerHTML = "⛷";
        return;
    }
    currentSize +=4;
    document.getElementById("Skidor").style.fontSize = currentSize + "px";
}