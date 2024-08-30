var canvaswidth = 300;
var canvasheight = 600;
var cellsize = 20;
const maxPieces = 150;

var pieceX=new Array(maxPieces);
var pieceY=new Array(maxPieces);
var pieceType = new Array(maxPieces);
var pieceColor = new Array(maxPieces);

var squareX1 = new Array(maxPieces);
var squareX2 = new Array(maxPieces);
var squareX3 = new Array(maxPieces);
var squareX4 = new Array(maxPieces);

var squareY1 = new Array(maxPieces);
var squareY2 = new Array(maxPieces);
var squareY3 = new Array(maxPieces);
var squareY4 = new Array(maxPieces);

var grid=[];

grid = new Array(160).fill(0).map(() => new Array(161).fill(0));

var score = 0;
var pieceCount = 1;
var pieceNo = 1;
pieceColor[1] = "black";
pieceType[1] = "line";
pieceX[1] = Math.floor(canvaswidth/cellsize/2);
pieceY[1] = 0;


var rotation = new Array(maxPieces);

rotation[1] = 1;

var groundY = canvasheight/cellsize;

var funcSetInterval;
var map = {};


///////////////////////
var soundObject = null;
function playSound(soundfile) {
    if (soundObject != null) {
        document.body.removeChild(soundObject);
        soundObject.removed = true;
        soundObject = null;
    }
    soundObject = document.createElement("embed");
    soundObject.setAttribute("src", "sounds/"+soundfile);
    soundObject.setAttribute("hidden", true);
    soundObject.setAttribute("autostart", true);
    soundObject.setAttribute("loop", true);
    document.body.appendChild(soundObject);
}
//////////////////////////

   
var myGameArea = {
   // canvas : document.getElementById("canvas1"),
    start : function() {
       // this.canvas.width = 640;
       // this.canvas.height = 480;

        this.context = document.getElementById("thecanvas").getContext("2d");
        document.body.insertBefore(document.getElementById("thecanvas"), document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 150);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
          //if (e.type == "keyup"){  
         //   speed = 0;
         //   document.getElementById("divSpeed").innerText= "0";
         // }
            myGameArea.keys[e.keyCode] = (e.type == "keydown"); //keydown
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, document.getElementById("thecanvas").width, document.getElementById("thecanvas").height);
    }
}

function updateGameArea() 
{
   myGameArea.clear();
    
   
  
   
   
    if (myGameArea.keys && myGameArea.keys[39]) {pieceX[pieceNo]+=1; }
    if (myGameArea.keys && myGameArea.keys[37]) { pieceX[pieceNo]-=1; }
    if (myGameArea.keys && myGameArea.keys[38]) {rotatePieceClockwise();}
    if (myGameArea.keys && myGameArea.keys[40]) {}
    

    //myGamePiece.newPos();
   
   // myGamePiece.update();

   pieceY[pieceNo]+=1;
   for (var i = 1;i<=pieceNo;i++)
   {
        drawPiece(i);
   }
   stopPiece();

   checkFullRow();
  }


function checkFullRow()
{
    var res = 1;
    for (var j = 0;j<=canvasheight/cellsize;j++){
    res = 1;
    for (var i = 0;i<canvaswidth/cellsize;i++)
    {
        {
            if (grid[i][j] == 0)
            {
                res = 0;
                 break;
            }
        }   
    }
}
    if (res==1)
    {
       up();
    }
    return res;
}

function up()
{
   // clearGrid();
    for (var i= 1;i<pieceCount;i++)
    {
        grid[squareX1[i]][squareY1[i]] = 0;
        grid[squareX2[i]][squareY2[i]] = 0;
        grid[squareX3[i]][squareY3[i]] = 0;
        grid[squareX4[i]][squareY4[i]] = 0;
        
        pieceY[i]++;


        drawPiece(i);

        grid[squareX1[i]][squareY1[i]] = 1;
        grid[squareX2[i]][squareY2[i]] = 1;
        grid[squareX3[i]][squareY3[i]] = 1;
        grid[squareX4[i]][squareY4[i]] = 1;
    }

    score++;
    updateScore();
    playSound("explosion.wav"); 
}

function updateScore()
{
    el = document.getElementById("divScore");
    el.innerText = score;
}

function clearGrid()
{
    for (var i = 0;i<=grid[0].length;i++)
        for (var j = 0;j<grid.length;j++)
        {
            grid[i][j]=0;
        }   
}

function startGame() 
{
    myGameArea.start(); 
}

function collision()
{
    var res=0;
   
            if (grid[squareX1[pieceNo]][squareY1[pieceNo]+1] == 1)
            {
                res = 1;
            }
          
       
                if (grid[squareX2[pieceNo]][squareY2[pieceNo]+1] == 1)
                {
                    res = 1;
                }
             
           
                    if (grid[squareX3[pieceNo]][squareY3[pieceNo]+1]== 1)
                    {
                        res = 1;
                    }
               
               
                        if (grid[squareX4[pieceNo]][squareY4[pieceNo]+1]== 1)
                        {
                            res = 1;
                        }
                 
    return res;
    
}

function stopPiece()
{
    var yMax = Math.max(squareY1[pieceNo], squareY2[pieceNo], squareY3[pieceNo], squareY4[pieceNo]);
    if (yMax >= groundY || collision())
        {
            
               // pieceY[pieceNo] = 1;
              //  pieceType[pieceNo+1] = "zet";
                rotation[pieceNo+1]=1;
                pieceX[pieceNo+1] = 1;
                pieceY[pieceNo+1]= 1;
                rotation[pieceNo+1]=1;
                var p = getRandomInt(1,5);
                if (p==1)
                {
                    pieceType[pieceNo+1]="line";
                }
                if (p==2)
                    {
                        pieceType[pieceNo+1]="zet";
                    }
                    if (p==3)
                        {
                            pieceType[pieceNo+1]="el";
                        }
                        if (p==4)
                            {
                                pieceType[pieceNo+1]="square";
                            }
            //   pieceType[pieceNo+1]="line"; //debug

             grid[squareX1[pieceNo]][squareY1[pieceNo]] = 1;
             grid[squareX2[pieceNo]][squareY2[pieceNo]] = 1;
             grid[squareX3[pieceNo]][squareY3[pieceNo]] = 1;
             grid[squareX4[pieceNo]][squareY4[pieceNo]] = 1;

            // pieceColor[pieceNo] = "white";
           //                 for (var i=0;i<=canvaswidth/cellsize;i++)
            //                    for (var j=0;j<=canvasheight/cellsize;j++)
            //                        if (grid[i,j]==1)
            //                        drawSquare(i,j, "grey");

                        pieceNo++;
                        pieceCount++;
     }

       
        
}

function rotatePieceClockwise()
{

    rotation[pieceNo] ++;
    if (rotation[pieceNo]==4)
    {
        rotation[pieceNo]=1;
    }
}

function drawPiece(pieceNo)
{
   
    squareColor = resetPiece(pieceNo);

    if (rotation[pieceNo] == 2)
    {
        
        var squareX10 = squareX1[pieceNo];
        var squareX20 = squareX2[pieceNo];
        var squareX30 = squareX3[pieceNo];
        var squareX40 = squareX4[pieceNo];

        squareX2[pieceNo] = squareX10;
        squareX3[pieceNo] = squareX10-(squareY3[pieceNo]-pieceY[pieceNo]);
        squareX4[pieceNo] = squareX10-(squareY4[pieceNo]-pieceY[pieceNo]);

        squareY2[pieceNo] = squareY1[pieceNo]+1;
        squareY3[pieceNo] = squareY1[pieceNo]+(squareX30-pieceX[pieceNo]);
        squareY4[pieceNo] = squareY1[pieceNo]+(squareX40-pieceX[pieceNo]);

    }

    if (rotation[pieceNo] == 3)
        {
           
            var squareX10 = squareX1[pieceNo];
            var squareX20 = squareX2[pieceNo];
            var squareX30 = squareX3[pieceNo];
            var squareX40 = squareX4[pieceNo];

            var squareY10 = squareY1[pieceNo];
            var squareY20 = squareY2[pieceNo];
            var squareY30 = squareY3[pieceNo];
            var squareY40 = squareY4[pieceNo];

    
            squareX2[pieceNo] = pieceX[pieceNo]-(squareX20-pieceX[pieceNo]);
            squareX3[pieceNo] = pieceX[pieceNo]-(squareX30-pieceX[pieceNo]);
            squareX4[pieceNo] = pieceX[pieceNo]-(squareX40-pieceX[pieceNo]);
    
            squareY2[pieceNo] = pieceY[pieceNo] - (squareY20 - pieceY[pieceNo]);
            squareY3[pieceNo] = pieceY[pieceNo] - (squareY30 - pieceY[pieceNo]);
            squareY4[pieceNo] = pieceY[pieceNo] - (squareY40 - pieceY[pieceNo]);
    
        }

    
    drawSquare(squareX1[pieceNo], squareY1[pieceNo], squareColor);
    drawSquare(squareX2[pieceNo], squareY2[pieceNo], squareColor);
    drawSquare(squareX3[pieceNo], squareY3[pieceNo], squareColor);
    drawSquare(squareX4[pieceNo], squareY4[pieceNo], squareColor);
        
}

function resetPiece(pieceNo)
{
    squareX1[pieceNo] = pieceX[pieceNo];
    squareY1[pieceNo] = pieceY[pieceNo];

    if (pieceType[pieceNo] == "line")
        {
            squareColor = "blue";
            if (pieceColor[pieceNo] == "white") squareColor = "white";
          
            squareX2[pieceNo] = squareX1[pieceNo]+1;
            squareX3[pieceNo] = squareX1[pieceNo]+2;
            squareX4[pieceNo] = squareX1[pieceNo]+3;
            
            squareY1[pieceNo] = pieceY[pieceNo];
            squareY2[pieceNo] = pieceY[pieceNo];
            squareY3[pieceNo] = pieceY[pieceNo];
            squareY4[pieceNo] = pieceY[pieceNo];
          
    
        }
    
        if (pieceType[pieceNo] == "el")
            {
                squareColor = "red";
                if (pieceColor[pieceNo] == "white") squareColor = "white";
        
                squareX2[pieceNo] = squareX1[pieceNo]+1;
                squareX3[pieceNo] = squareX1[pieceNo]+2;
                squareX4[pieceNo] = squareX1[pieceNo]+2;
                
                squareY1[pieceNo] = pieceY[pieceNo];
                squareY2[pieceNo] = pieceY[pieceNo];
                squareY3[pieceNo] = pieceY[pieceNo];
                squareY4[pieceNo] = pieceY[pieceNo]+1;
        
            }
        
            if (pieceType[pieceNo] == "square")
                {
                    squareColor = "yellow";
                    if (pieceColor[pieceNo] == "white") squareColor = "white";
            
                    squareX2[pieceNo] = squareX1[pieceNo]+1;
                    squareX3[pieceNo] = squareX1[pieceNo];
                    squareX4[pieceNo] = squareX1[pieceNo]+1;
                    
                    squareY1[pieceNo] = pieceY[pieceNo];
                    squareY2[pieceNo] = pieceY[pieceNo];
                    squareY3[pieceNo] = pieceY[pieceNo]+1;
                    squareY4[pieceNo] = pieceY[pieceNo]+1;
            
                }
    
                if (pieceType[pieceNo] == "zet")
                    {
                        squareColor = "green";
                        if (pieceColor[pieceNo] == "white") squareColor = "white";
                
                        squareX2[pieceNo] = squareX1[pieceNo]+1;
                        squareX3[pieceNo] = squareX1[pieceNo]+1;
                        squareX4[pieceNo] = squareX1[pieceNo]+2;
                        
                        squareY1[pieceNo] = pieceY[pieceNo];
                        squareY2[pieceNo] = pieceY[pieceNo];
                        squareY3[pieceNo] = pieceY[pieceNo]+1;
                        squareY4[pieceNo] = pieceY[pieceNo]+1;
                
                    }
    return squareColor;
}

function drawSquare(squareX, squareY, squareColor) 
{
    const c = document.getElementById("thecanvas");
    const ctx = c.getContext("2d");

    ctx.fillStyle = squareColor;
    ctx.fillRect(squareX * cellsize, squareY * cellsize, cellsize, cellsize);
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }