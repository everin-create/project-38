class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

  monkey1 = createSprite(100,100);
  monkey1.addImage("m1",monkeyan);
  monkey1.scale=0.3
  monkey2 = createSprite(100,500)
  monkey2.addImage("m2",monkeyan);
  monkey2.scale=0.3
  monkeys = [monkey1, monkey2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getMonkeyAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(jungle, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      //var x;
      //var y=100;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        //y = y + 100;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
        monkeys[index-1].x = x;
        monkeys[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          monkeys[index - 1].shapeColor = "black";
          camera.position.x = player[index-1].x;          ;
          camera.position.y = displayHeight/2;
        }
       
        
      }

    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 5000){
      gameState = 2;
      player.rank +=1
      Player.updateMonkeyAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
     console.log("Game Ended");
     console.log(player.rank);
   }
}
