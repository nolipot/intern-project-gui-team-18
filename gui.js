const canvas = document.getElementById('syntheticData');
const text = document.getElementById('syntheticText');
console.log(canvas);
const brush = canvas.getContext('2d');

const lightGreen = '#00FF80';
const dark = '#000066';
const darkOrange = '#FF8000';
const lightOrange = '#FFB266';
const grey = '#C0C0C0';

brush.font = '20px Courier New';
brush.fillStyle = grey;
brush.fillRect(0, 0, 900, 500);
brush.fillStyle = lightGreen;
brush.fillRect(390, 10, 470, 370);
brush.fillStyle = 'black';
brush.fillText('Area of Operations', 640, 490);

let obstacleAnim = 0;
let currPos = [0, 0];
const missionLog = "Mission Bot Synthetic Data:<br><br>Total Degrees Turned by the mBot:<br>Total Degrees Turned: 260.75<br>Number of Times Proximity Sensors Detected an Obstacle:<br>Proximity Sensor 1: 6<br>Proximity Sensor 2: 4<br>Proximity Sensor 3: 9<br><br> Ultrasonic Sensor Distance:<br>Max Ultrasonic Sensor Distance: 43.21<br>Light Sensor Value:<br>Light Sensor Value: 78<br>Battery Level:<br>Battery Level: 82%<br>Motor Speeds:<br>Motor 1 Speed: 75<br>Motor 2 Speed: -34<br>Power Used in the Mission:<br>Power Used: 20.5<br>Time Taken to Complete the Mission:<br>Time Taken: 180.2 seconds<br> Number of Obstacles Avoided in the Mission:<br>Obstacles Avoided: 12<br> Temperature Recorded during the Mission:<br>Temperature: 25.8 °C<br>Distance Travelled during the Mission:<br>Distance Travelled: 85.36 meters<br>Acceleration Recorded:<br>Acceleration: 3.4 m/s^2";
const trackPath = [[137,511],[137,502],[137,493],[136,485],[136,476],[136,467],[135,459],[130,452],[124,445],[120,438],[114,432],[107,426],[100,422],[93,417],[86,411],[77,406],[70,402],[62,400],[55,396],[48,392],[42,386],[38,379],[36,371],[36,362],[36,352],[36,343],[40,336],[44,329],[48,322],[52,315],[60,312],[69,312],[78,312],[87,312],[96,312],[105,312],[112,316],[120,320],[128,322],[136,327],[143,331],[152,336],[160,341],[168,344],[176,348],[184,351],[192,356],[200,362],[208,365],[215,370],[223,372],[231,373],[239,374],[248,374],[258,374],[265,370],[269,363],[272,355],[276,347],[278,339],[279,331],[279,322],[279,312],[279,303],[278,294],[272,288],[268,281],[261,275],[254,270],[245,264],[238,260],[230,255],[222,252],[215,248],[207,246],[197,245],[188,245],[180,244],[171,244],[161,244],[152,244],[143,244],[133,245],[123,245],[112,245],[101,245],[92,245],[83,245],[75,242],[68,237],[62,230],[57,223],[52,216],[48,208],[44,201],[40,193],[37,185],[33,176],[31,168],[28,160],[27,152],[25,143],[24,135],[22,127],[22,118],[21,110],[21,101],[21,92],[21,82],[24,74],[25,65],[28,57],[34,50],[40,44],[47,39],[54,35],[63,35],[72,36],[79,42],[82,50],[87,57],[88,67],[88,76],[88,85],[88,94],[88,103],[86,111],[84,119],[84,128],[84,137],[85,145],[85,154],[88,162],[92,169],[97,176],[103,182],[111,184],[120,184],[128,187],[136,188],[146,188],[153,184],[157,177],[158,169],[161,160],[161,151],[162,143],[162,132],[162,123],[162,114],[162,104],[162,95],[162,86],[163,77],[164,69],[166,61],[172,54],[179,49],[186,43],[194,40],[202,38],[211,38],[219,42],[224,49],[227,58],[230,66],[231,74],[232,82],[234,92],[235,100],[235,109],[234,117],[232,125],[231,134],[228,142],[224,149],[221,157],[218,165],[216,173],[216,182],[220,189],[224,196],[231,200],[238,204],[246,208],[256,208],[264,207],[272,205],[279,200],[280,192],[281,184],[281,175],[284,167],[285,159],[288,151],[291,143],[292,135],[292,126],[294,118],[296,110],[298,100],[300,92],[303,84],[307,77],[316,73],[324,72],[332,71],[340,68],[349,68],[357,71],[364,76],[366,84],[368,92],[368,101],[367,109],[364,117],[360,124],[356,131],[351,138],[348,146],[345,155],[343,163],[339,170],[335,177],[332,186],[328,193],[324,200],[320,208],[319,216],[318,224],[317,232],[317,242],[320,250],[327,258],[333,264],[339,270],[347,272],[356,272],[365,272],[374,272],[381,268],[388,263]];

function handleClick(event) {
	console.log(trackLog);
}
function square(num) { return num * num; }
function handleMove(event) {
	const mouseX = event.pageX;
	const mouseY = event.pageY;
	if (square(mouseX - currPos[0]) + square(mouseY - currPos[1]) > 64) {
		drawCircle(mouseX, mouseY, 10);
		trackLog += '[' + mouseX + ', ' + mouseY + '], ';
		currPos[0] = mouseX;
		currPos[1] = mouseY;
	}
}
function drawCircle(x, y, radius) {
	brush.beginPath();
	brush.arc(x, y, radius, 0, 2 * Math.PI);
	brush.fillStyle = dark;
	brush.fill();
	brush.closePath();
	obstacleAnim += (75 - obstacleAnim) * 0.07;
	drawEZ();
}
function drawEZ() {
	brush.fillStyle = lightGreen;
	brush.fillRect(390, 10, 470, 370);
	brush.fillStyle = 'black';
	brush.fillText('Extraction Zone', 650, 370);
	brush.fillStyle = lightOrange;
	brush.fillRect(450, 70, obstacleAnim, obstacleAnim);
	brush.fillRect(460, 280, obstacleAnim, obstacleAnim);
	brush.fillRect(690, 150, obstacleAnim, obstacleAnim);
}
function generateLog(index) {
	text.innerHTML = missionLog.substring(0, index);
	if (index === missionLog.length) {
		return;
	}
	index += 8;
	setTimeout(function() { generateLog(index); }, 10);
}
trackPath.forEach( (coord, index) => {
	setTimeout(function() { drawCircle(coord[0], coord[1], 10) }, 7 * index);
});
text.innerHTML = 'hello world!';
generateLog(0);
canvas.addEventListener('click', handleClick);
// canvas.addEventListener('mousemove', handleMove);