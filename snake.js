
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// BASIC 'UNIT' OF MOVEMENT SPEED AND SIZE OF INDIVIDUAL SNAKE HEAD + SEGMENTS

var unit = 20;

// FUNCTION TO START A NEW INSTANCE OF THE GAME

var SnakeGame = function() {

    this.snake = {};

}

// THIS FUNCTION WILL ANIMATE ALL OBJECTS (INCLUDING SNAKES) ON THE CANVAS, AT A RATE OF 500MS (IE. EVERY HALF-SECOND).
// "GLOBAL TICK" REFERS TO THIS SWEEP EVERY .5 SECONDS TO UPDATE THE GAME SPACE.

SnakeGame.prototype.globalTick = function(tickRate) {

    var that = this;

    setInterval(function(){
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        // SWITCH TO MOVE SNAKE BASED ON DIRECTION IT'S FACING
        
        switch (theGame.snake.directionFacing) {

            case 'UP':
                that.snake.y -= unit;
                that.snake.segments.unshift({x: that.snake.x, y: that.snake.y});
                if (that.snake.segments.length > that.snake.maxSegments) { that.snake.segments.pop() };
                break;

            case 'DOWN':
                that.snake.y += unit;
                that.snake.segments.unshift({x: that.snake.x, y: that.snake.y});
                if (that.snake.segments.length > that.snake.maxSegments) { that.snake.segments.pop() };
                break;

            case 'RIGHT':
                that.snake.x += unit;
                that.snake.segments.unshift({x: that.snake.x, y: that.snake.y});
                if (that.snake.segments.length > that.snake.maxSegments) { that.snake.segments.pop() };
                break;

            case 'LEFT':
                that.snake.x -= unit;
                that.snake.segments.unshift({x: that.snake.x, y: that.snake.y});
                if (that.snake.segments.length > that.snake.maxSegments) { that.snake.segments.pop() };
                break;                
        }

        ctx.fillStyle = 'green';
        theGame.snake.segments.forEach(function(eachSegment, index) {
            ctx.fillRect(eachSegment.x, eachSegment.y, unit-1, unit-1);
            });
        
        if (that.snake.x < 0) {
    
            that.snake.x = canvas.width - unit;
        
        } else if (that.snake.x > canvas.width) {
        
            that.snake.x = 0;
        
        }
        
        if (that.snake.y < 0) {
        
            that.snake.y = canvas.height - unit;
        
        } else if (that.snake.y > canvas.height) {
        
            that.snake.y = 0;

        }

        // ctx.drawImage(theImage, that.snake.x, that.snake.y, that.snake.width, that.snake.height);

        that.snake.drawSnake();
    
    }, tickRate);
    
    

}

// FUNCTION TO SPAWN A NEW SNAKE AT START OF GAME -- OR AT SOME LATER POINT

var Snake = function (startingX, startingY, lengthOfSnake, movementSpeed) {

    this.x = startingX;
    this.y = startingY;

    this.width = unit;
    this.height = unit;
    
    this.speed = movementSpeed;
    this.directionFacing = 'UP';

    this.maxSegments = 4;

    this.segments = [];

    this.img = 'snake_head_up.png';

    this.lastSegment = this.segments[this.segments.length - 1];

}

Snake.prototype.drawSnake = function(){
    
    var that = this;
    
    theImage = new Image();
    
    theImage.src = that.img;
    
    theImage.onload = function(){
    
        ctx.drawImage(theImage, that.x, that.y, unit, unit);
    }
  }

// FUNCTION TO CHECK IF SNAKE CAN MOVE

// Snake.prototype.canMove = function (futureX, futureY) {

//     if (this.snake.

// }

// FUNCTION TO CHANGE DIRECTION OF THE SNAKE

Snake.prototype.changeDirection = function() {
    
    var that = this;
    
    document.addEventListener('keydown', function(e) {
    
        switch (e.which) {
        
        case 38:
                that.directionFacing = 'UP';
                that.img = 'snake_head_up.png';
            break;

        case 40:
            that.directionFacing = 'DOWN';
            that.img = 'snake_head_down.png';
        break;
    
        case 39:
            that.directionFacing = 'RIGHT';
            that.img = 'snake_head_right.png';
        break;
    
        case 37:
        that.directionFacing = 'LEFT';
        that.img = 'snake_head_left.png';
        break;
        }

    });
}

// FUNCTION TO LOOP THE SNAKE BACK AROUND IF IT HITS THE EDGE OF THE CANVAS

// Snake.prototype.edgeLoop = function() {

//     var that = this;
    
//         if (that.x < 0) {
    
//         that.x = canvas.width - 1;
    
//     } else if (that.x > canvas.width) {
    
//         that.x = 0;
    
//     } else if (that.y < 0) {
    
//         that.y = canvas.height - 1;
    
//     } else if (that.y > canvas.height) {
    
//         that.y = 0;
    
//     }
    
//     }

// Snake.prototype.movementTicks = function (frequency) {

//     var that = this;

//     ctx.clearRect(this.x, this.y, this.width, this.height);



// }



// ALL DOM FUNCTIONS PUSHED TO BOTTOM OF JS FILE

document.getElementById("start-button").onclick = function() {

        theGame = new SnakeGame();
        theSnake = new Snake(200,200,1,10);
        
        theGame.snake = theSnake;
    
        theGame.snake.drawSnake();
        
        theGame.globalTick(250);

        // theGame.snake.edgeLoop();

        theGame.snake.changeDirection();

}