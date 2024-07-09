let board = document.querySelector(".board");
let score = document.querySelector(".score");



// variables that we need
let snake = [{ x: 10, y: 10 }];
food = generateFood();
let direction ='Right';

//draw snake
drawSnake = () => {
  snake.forEach((index) => {
    let snakeElement = document.createElement("div");
    snakeElement.className = "snake";
    board.appendChild(snakeElement);
    snakeElement.style.gridColumn = index.x;
    snakeElement.style.gridRow = index.y;
  });
};

//drawSnake()        To test Snake

//draw food
drawFood = () => {
  let foodElement = document.createElement("div");
  foodElement.className = "food";
  board.appendChild(foodElement);
  foodElement.style.gridRow = food.y;
  foodElement.style.gridColumn = food.x;
};
function generateFood() {
  let y = Math.floor(Math.random() * 20) + 1;
  let x = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}
function draw() {
    board.innerHTML=""
    drawFood();
    drawSnake();
    
}


move = () => {
  head = { ...snake[0] };

  switch (direction) {
    case "Up":
      head.y--;

      break;
    case "Down":
      head.y++;

      break;
    case "Right":
      head.x++;

      break;
    case "Left":
      head.x--;

      break;

    default:
      break;
  } 
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
     clearInterval(gameInterval);
    gameInterval = setInterval(
      () => {
        draw();     
        move();
       checkColliosn();
      },

      200
    );
  } 
  else{
    snake.pop();
  }
};
console.log(snake);
console.log(food);

 function gameStart(){
    gameInterval = setInterval(
        () => {
          draw();
          move();
          checkColliosn();
          updateScore();
          
         
        },
  
        200
      );
}

function handler(event) {
    if (event.code ==='Space'||event.key==='') {
        gameStart();
        
    } else {
        switch (event.key) {
            case "ArrowUp":
              direction = "Up";
              break;
            case "ArrowDown":
              direction = "Down";
              break;
            case "ArrowRight":
              direction = "Right";
              break;
            case "ArrowLeft":
              direction = "Left";
              break;
        
            default:
              break;
          }
    }
    
 
}
document.addEventListener("keydown", handler);

function checkColliosn(){
  head = snake[0];
  if (head.x < 1 || head.x>20 || head.y<1 || head.y>20   ){
  resetGame();
                                                                                                                                                                                              
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x===snake[i].x && head.y===snake[i].y) {
      resetGame();
      
    }
    
  }

}
function resetGame() {
  
  alert('Game Over!! \n Press Space Bar to continue')
  clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = 'Right';
 
} 
function updateScore() {
  score.innerText = `Score : ${snake.length-1}`
  
}