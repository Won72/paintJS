// 캔버스 위에 마우스가 올라간 걸 감지
// 캔버스 위에서 마우스가 클릭한 걸 감지 => 그 다음에 페인팅
// 캔버스 사이즈 지정 및 functions들 제작
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js_color");
// 캔버스 색 지정 html 파일에서 color array를 가져오고, array안의 elements 들에 event랑 handleColorClick 함수 적용.
// 그 다음에 그 색을 지정하고, strokeStyle 변경 (OverRide)
const range = document.getElementById("jsRange");
// 펜 크기 설정하기.
//input range에서 event.traget.value 를 체크해서 그것을 context의 stroke linewidth와 교체

//fill 버튼으로 canvas 색 채우기
const mode = document.getElementById("jsMode");
//html에서 버튼 가져오고, filling이라는 let 값을 하나 만들어줌.
//fillRect를 이용해서 painting을 false로 바꾸고 filling을 하는 과정이 필요함. 
const saveBtn = document.getElementById("jsSave");

//console.log(Array.from(colors));
//array from 은 array constructor로부터 method를 호출함. arry from method는 object로부터 array를 만듬 
if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

function handleColorClick(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

const CANVAS_SIZE = 600;
//pxiel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; // 실제 픽셀 사이즈(pixel modifier)를 제공해야 함.

const INITIAL_COLOR = "2c2c2c";
ctx.fillStyle = "white";
ctx.fillRect (0,0,canvas.width,canvas.height); // 캔버스 기본 바탕색 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.linewidth = 2.5;
/*
ctx.fillStyle = "green"; // fillRect보다 위에 있어야 적용됨. Canvas는 위에서 밑으로 내려오면서 작동됨.
ctx.fillRect(50, 50, 100, 100); //이 상태로는 strokeStyle(색) 같은걸 적용이 안 됨.
*/

let painting = false; //기본적으로는 false 값을 가지고 있다가 canvas위에 클릭하면 true값으로 바뀐다.
let filling = false;


function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false; //페인팅을 false로 바꾸는걸 반복하지 않기 위해서
}

function onMouseMove(event){
    //console.log(event);
    //offset은 캔버스 위에서만의 좌표
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){ // 페인팅 시작 지점
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    

}

function onMouseDown(event){
    //console.log(event);
    painting = true;
}

function onMouseUp(event){
    //painting = false; // 마우스를 땠을 때
    stopPainting();
}

function onMouseLeave(event){
    painting = false; // 마우스가 캔버스를 벗어났을 때
    //stopPainting을 if canvas.addEventListener Mouseleave에 넣는 걸로 대체
}

function handleContextMenu(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    //mousedown은 클릭했을 때 이벤트
    canvas.addEventListener("mouseup", stopPainting);
    //mouseup은 클릭을 땠을 때 이벤트
    canvas.addEventListener("mouseleave", stopPainting);
    //mouseleave은 마우스가 캔버스를 떠났을 때 이벤트
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

function handleCanvasClick(){
    if(filling === true){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }else{

    }
}

function hanldeRangeChange(event){
    //console.log(event.target.value);
    const stroke = event.target.value;
    ctx.lineWidth = stroke;
}

if(range){
    range.addEventListener("input", hanldeRangeChange);//range는 input에 반응함
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
        //ctx.fillStyle = ctx.strokeStyle; 이 명령보다 color를 클릭했을 때, fillStyle도 한 번에 변경하는 것이 더 편함.
    }
    //console.log(event);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]"; // download는 a 태그의 attribute임. 링크로 가는 것이 아니라 다운로드를 하라는 명령.
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

function init(){

}

init();