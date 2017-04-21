var canvas=document.getElementById('myCanvas');
var poolTableImage=document.getElementById('table');

var poolTableContext=canvas.getContext('2d');

poolTableContext.drawImage(poolTableImage,0,0,1200,600);

poolTableImage.parentElement.removeChild(poolTableImage);

var circle=canvas.getContext('2d');

circle.arc(250,300,15,0,2*Math.PI);
circle.fillStyle='white';
circle.shadowColor='rgba(0,0,0,0.5)';
circle.shadowOffsetY=5;
circle.shadowBlur=4;
circle.fill();
