//select the elements on the page - canvas, shake button
const canvas = document.querySelector("#etch-a-sketch");
const shakeButton = document.querySelector(".shake");
const NOVE_AMOUNT = 10;
const ctx = canvas.getContext("2d");

//Setup our canvas for drawing
//make a variable called height and width from the same properties on our canvas
const {width,height}=canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);


//create random x and y starting points on the canvas


ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = NOVE_AMOUNT;

let hue = 0;
ctx.beginPath(); //start the drawing
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

//write a draw function
function draw({ key }) {
    //increment the hue
    hue = hue + 10;
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    console.log(key);
    //start the path
    ctx.beginPath();
    ctx.moveTo(x, y);
    //move our x and y values depending on what the user did
    switch (key) {
        case "ArrowUp":
            y = y - NOVE_AMOUNT;
            break;
        case "ArrowRight":
            x = x + NOVE_AMOUNT;
            break;
        case "ArrowDown":
            y = y + NOVE_AMOUNT;
            break;
        case "ArrowLeft":
            x = x - NOVE_AMOUNT;
            break;
        default:
            break;
        
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

//write a handler for the keys
function handleKey(event){
    if (event.key.includes("Arrow")){
    event.preventDefault();
    draw({key: event.key});
    }
}

//clear/shake function
function clearCanvas(){
    canvas.classList.add("shake");
    ctx.clearRect(0,0,width,height);
    canvas.addEventListener("animationend",function(){
        console.log("Board Cleared");
        canvas.classList.remove("shake");
    },
    {once:true}
    );
}
//listen for arrow keys
window.addEventListener("keydown",handleKey);
shakeButton.addEventListener("click",clearCanvas);