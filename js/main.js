window.onload = function(){
    const c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = 600; 


    const ctx = c.getContext('2d');
 
    const environment = new Environment(c, ctx);
    const bird = new Bird(250, 300, ctx);
    const floor = new Floor(c, ctx);
    const sun = new Sun(150, 100, ctx);
    const pipes = [];
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
    setInterval(function(){
      let pipeSet = generateRandomPipes(ctx, c.width, c.height);
      pipes.push(pipeSet.top, pipeSet.bottom);
    }, 2600);
    gameLoop();
 
 
    /*
     MAIN GAME LOOP
    */
    function gameLoop(){
      bird.update(pipes);
      if (!bird.dead){
        environment.update();
 
        pipes.forEach(function(pipe1){
          pipe1.update();
        });
      }
      floor.update();
      environment.render();
 
      pipes.forEach(function(pipe1){
        pipe1.render();
      });
      floor.render();
      bird.render();
      if(bird.dead) {
        drawGameOver(ctx, c);
      }
      sun.update();
      sun.render();
      playerScore(ctx, c);
      window.requestAnimationFrame(gameLoop);
    }
  };
 
  function generateRandomPipes(ctx, canvasWidth, canvasHeight){
    let lengthTop = Math.round(Math.random()*200+50);
    let lengthBottom = canvasHeight - 200 - lengthTop;
    let returnVal = { };
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
  }
 
 
 function drawGameOver(ctx, c){
   ctx.font="30px san Serif";
   ctx.textAlign="center";
   ctx.fillText("Game Over!",c.width/2 , c.height/2);
 }

 var score = 0;
 var repeatCount = setInterval(scoreCounter, 500);
 
 function playerScore(ctx, c){
     console.log ('score');
     ctx.font = "50px san Serif";
     ctx.textAlign = "left";
     ctx.fillText('Your Score: '+score, c.width/30, c.height-550);
 }
 
 function scoreCounter(){
     score += 1;
 }