const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const ROWS_WIDTH = 10;
const ROW_HEIGHT = 10;
const CANVAS_ROWS = CANVAS_WIDTH / ROWS_WIDTH;
const CANVAS_COLUMNS = CANVAS_HEIGHT / ROW_HEIGHT;
const FPS = 4;

var c; //context
var board;

function init()
{    
    document.getElementById("holder").innerHTML = ("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "' id='mainCanvas'></canvas>");
    c = mainCanvas.getContext("2d");
    
    board = new Array();
    
    for (var i = 0; i < CANVAS_ROWS; i++)
    {
        tempRow = new Array();
        for (var j = 0; j < CANVAS_ROWS; j++)
        {
            let tempSquare = new Square(i * ROWS_WIDTH, j * ROW_HEIGHT, ROWS_WIDTH, ROW_HEIGHT);
            tempRow.push(tempSquare);
        }
        board.push(tempRow);
    }
}

function run()
{
    setInterval(function()
    {
        draw();
    }, 1000 / FPS);
}

function draw()
{
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (var i = 0; i < CANVAS_ROWS; i++)
    {
        for (var j = 0; j < CANVAS_ROWS; j++)
        {
            c.fillStyle = getRandomColour();
            c.fillRect(board[i][j].posX, board[i][j].posY, board[i][j].width, board[i][j].height);
        }
    }
}

function getRandomColour()
{
    var letters = '0123456789ABCDEF'.split('');
    var colour = '#';
    for (var i = 0; i < 6; i++)
    {
        colour += letters[Math.round(Math.random() * 15)];
    }
    return colour;
}

class Square
{
    constructor(x, y, w, h)
    {
        this._posX = x;
        this._posY = y;
        this._width = w;
        this._height = h;
    }

    get posX()
    {
        return this._posX;
    }
    get posY()
    {
        return this._posY;
    }
    get width()
    {
        return this._width;
    }
    get height()
    {
        return this._height;
    }
}

function resizeCanvas() 
{
    document.URL.indexOf("#")==-1 ? location="#":location="";
    location.reload(true);
}

//////////////////////////////////////////
// Go!!!
//////////////////////////////////////////
window.addEventListener('resize', resizeCanvas, false);

window.onload = function()
{
    if(document.URL.indexOf("#")==-1) //hack for firefox (of all things)
    {
        url = document.URL+"#";
        location = "#";
        location.reload(true);
    }
    
    init();
    run();

}
