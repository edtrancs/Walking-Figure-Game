/*

Game project part 7: make it awesome

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

//var collectable;
//var canyon;
var canyons;

var collectables
var trees_x;
var treePos_y;

var clouds_x;
var clouds_y;

var mountains_x;
var mountains_y;

var cameraPosX;

var game_score;
var flagpole;
var lives;

//var gameChar_world_x;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	
//	gameChar_x = width/2;
//	gameChar_y = floorPos_y;
//	
//	isLeft = false;
//	isRight = false;
//	isPlummeting = false;
//	isFalling = false;
//	//collectable = {x_pos:100, y_pos: floorPos_y, size:40, isFound: false};
//	//canyon = {x_pos:150, y_pos: floorPos_y};
//	
//	trees_x = [400,600,800,1000,1300,1500];
//	treePos_y = floorPos_y;
//	
//	clouds_x = [50,270,700, 1500];
//	clouds_y = 100;
//	
//	mountains_x = [300,600,800, 1000, 1200, 1450, 1500];
//	mountains_y = floorPos_y;
//	
//	cameraPosX = 0;
//	
//	collectables = [];
//	collectables.push({ x_pos: 100, y_pos: floorPos_y, size: 40, isFound: false });
//    collectables.push({ x_pos: 250, y_pos: floorPos_y, size: 40, isFound: false });
//    collectables.push({ x_pos: 1720, y_pos: floorPos_y, size: 40, isFound: false });
//    collectables.push({ x_pos: 1800, y_pos: floorPos_y, size: 40, isFound: false });
//    collectables.push({ x_pos: 2000, y_pos: floorPos_y, size: 40, isFound: false });
//	
//	canyons = [];
//	canyons.push({x_pos:150, y_pos: floorPos_y});
//    canyons.push({x_pos:250, y_pos: floorPos_y});
//    canyons.push({x_pos:750, y_pos: floorPos_y});
//    canyons.push({x_pos:950, y_pos: floorPos_y});
//    canyons.push({x_pos:1450, y_pos: floorPos_y});
//	
//	game_score = 0 ;
//	flagpole = {isReached: false, x_pos:2000};
	lives = 3;
	startGame();
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue

//move the camera
	cameraPosX = gameChar_x - width/2;
	
//	ground

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
	
	push();
	translate(-cameraPosX,0);
	
//	mountains
	
	drawMountains()
	
//	treesloop
	drawTrees()
	
//	clouds
	drawClouds();
	
	// canyon
	for (var i = 0; i < canyons.length; i++) {
        drawCanyon(canyons[i]);
		  // Check if character is over canyon
		  if (gameChar_x > canyons[i].x_pos 
			  && gameChar_x < canyons[i].x_pos + 80 
			  && gameChar_y >= floorPos_y) {
          isPlummeting = true;}
	}
	
	//collectable
	 for (var i = 0; i < collectables.length; i++) {
        drawCollectable(collectables[i]);
    }
	
	renderFlagpole();
	
	//the game character
    if (isPlummeting) {
        // add your plummeting code
        //head
        fill(255, 213, 150)
        ellipse(gameChar_x, gameChar_y - 40, 10, 10)

        //body
        fill(255, 213, 150)
        rect(gameChar_x - 7.5, gameChar_y - 35, 15, 20)

        //leg
        fill(255, 213, 150)
        triangle(gameChar_x, gameChar_y - 7, gameChar_x - 7.5, gameChar_y - 14, gameChar_x + 7.5, gameChar_y - 14)
    } else if (isLeft) {
        // add your walking left code
        //head
        fill(255, 213, 150)
        ellipse(gameChar_x, gameChar_y - 40, 10, 10)

        //body
        fill(255, 213, 150)
        rect(gameChar_x - 7.5, gameChar_y - 35, 15, 20)

        //leg
        fill(255, 213, 150)
        triangle(gameChar_x + 14, gameChar_y, gameChar_x - 7.5, gameChar_y - 14, gameChar_x + 7.5, gameChar_y - 14,)


    } else if (isRight) {
        // add your walking right code
        //head
        fill(255, 213, 150)
        ellipse(gameChar_x, gameChar_y - 40, 10, 10)

        //body
        fill(255, 213, 150)
        rect(gameChar_x - 7.5, gameChar_y - 35, 15, 20)

        //leg
        fill(255, 213, 150)
        triangle(gameChar_x - 14, gameChar_y, gameChar_x - 7.5, gameChar_y - 14, gameChar_x + 7.5, gameChar_y - 14,)

    } else if (isFalling) {
        // add your jumping facing forwards code
        //head
        fill(255, 213, 150)
        ellipse(gameChar_x, gameChar_y - 40, 10, 10)

        //body
        fill(255, 213, 150)
        rect(gameChar_x - 7.5, gameChar_y - 35, 15, 20)

        //leg
        fill(255, 213, 150)
        triangle(gameChar_x, gameChar_y - 7, gameChar_x - 7.5, gameChar_y - 14, gameChar_x + 7.5, gameChar_y - 14)

    } else {
        // add your standing front facing code
        //head
        fill(255, 213, 150)
        ellipse(gameChar_x, gameChar_y - 40, 10, 10)

        //body
        fill(255, 213, 150)
        rect(gameChar_x - 7.5, gameChar_y - 35, 15, 20)

        //leg
        fill(255, 213, 150)
        triangle(gameChar_x, gameChar_y, gameChar_x - 7.5, gameChar_y - 14, gameChar_x + 7.5, gameChar_y - 14,)

    }

//	//game_score
//	var scorePosX = gameChar_x - width / 2 + 20;
//    var scorePosY = 30;
//	fill(255);
//	noStroke();
//	text("score: "+ game_score,scorePosX,scorePosY);
//	
	
	//checkplayerdie
	checkPlayerDie();
	
	drawLives();
	
	// Draw "Game over" text if lives are less than 1
    if (lives < 1) {
        fill(255);
        textAlign(CENTER, CENTER);
        text("Game over. Press your browser's restart button to continue.", gameChar_x, height/2);
        return; // Prevent further game logic
    }

    // Draw "Level complete" text if flagpole is reached
    if (flagpole.isReached) {
        fill(255);
        textAlign(CENTER, CENTER);
        text("Level complete. Press your browser's restart button to replay.", gameChar_x, height/2);
        return; // Prevent further game logic
    }
	
	//game_score
	var scorePosX = gameChar_x - width / 2 + 20;
    var scorePosY = 30;
	fill(255);
	noStroke();
	text("score: "+ game_score,scorePosX,scorePosY);
	
	pop();

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	
	if(isRight)
	{
		gameChar_x +=2
	}
	
	
	if(isLeft)
	{
		gameChar_x -=2
	}
	
	//Gravity 
	if (gameChar_y < floorPos_y) 
	{
//		isFalling = true;
		gameChar_y += 0.5; // Adjust the gravity by adding a smaller value
		isFalling = true;
	}
	else
	{
		isFalling = false;
	}
	
	//Plummeting
	if(isPlummeting)
	{
		gameChar_y +=2
	}
	
	if(flagpole.isReached == false)
	{
		checkFlagpole();
	}
	
	
	//Update real position of gameChar for collision detection.
	//gameChar_world_x = gameChar_x - cameraPosX;
}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
	
	if(isPlummeting)
	{
		return;
	}
	
	if(key === "a")
	{
		console.log("left arrow");
		isLeft = true;
	}
	else if(key ==="d")
	{
		console.log("right arrow");
		isRight = true;
	}
	
	if (key === "w" && isFalling ==false)
	{
		gameChar_y -=100;	
	}
	// Handle game reset with r
    if (key === "r") {
    if (lives < 1 || flagpole.isReached) {
        lives = 3;
        startGame();
    }
    }
	
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
	
	if(key ==="a")
	{
		console.log("left arrow");
		isLeft = false;
	}
	else if(key ==="d")
	{
		console.log("right arrow");
		isRight = false;
	}
}

function drawClouds()
{
	for(var i = 0; i < clouds_x.length; i++)
	{
		console.log("clouds loop" + i);
		fill(255);
		ellipse(clouds_x[i]+50,clouds_y, 80,80);
		ellipse(clouds_x[i],clouds_y, 70,70);
		ellipse(clouds_x[i]+100,clouds_y, 70,70);
	}
}

function drawMountains()
{
	for(var i = 0; i < mountains_x.length; i++)
	{
		console.log("mountains loop" + i);
		fill(58,58,58);
		triangle(mountains_x[i],mountains_y,mountains_x[i]+200, mountains_y, mountains_x[i]+100, mountains_y-250)
	}
}


function drawTrees()
{
	for(var i = 0; i < trees_x.length; i++)
	{
		console.log("trees loop" + i);
		fill(204,102,0);
		rect(trees_x[i],treePos_y-81.5,50,82);
		fill(0,128,0);
		ellipse(trees_x[i]+25,treePos_y-150,100,180);
	}
}

function drawCollectable(t_collectable)
{
	if(t_collectable.isFound == false)
	{
		noStroke();
		fill(255);

		fill(255,255,153)
		ellipse(t_collectable.x_pos,t_collectable.y_pos-25,t_collectable.size,t_collectable.size)
		fill(100,155,255)
		ellipse(t_collectable.x_pos,t_collectable.y_pos-25,t_collectable.size*0.625,t_collectable.size*0.625)
	}
	
	if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20 && t_collectable.isFound == false)
	{
		t_collectable.isFound = true
		game_score +=1;
	}
}

function drawCanyon(t_canyon)
{
	fill(204,255,255)
	rect(t_canyon.x_pos,t_canyon.y_pos,80,150)
}

function renderFlagpole()
{
	push();
	strokeWeight(5);
	stroke(100);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	
	fill(255,0,255);
	noStroke();
	
	if(flagpole.isReached)
	{
		rect(flagpole.x_pos, floorPos_y - 250,50,50);
	}
	else
	{
		rect(flagpole.x_pos, floorPos_y - 50,50,50)
	}
	pop();
}

function checkFlagpole()
{
	var d = abs(gameChar_x - flagpole.x_pos);
	
	if(d < 15)
	{
		flagpole.isReached = true; 
	}
	
}

function checkPlayerDie() 
{
    if (gameChar_y > height)
	{
        lives--;
        if (lives > 0) 
		{
            startGame();
		}
    }
}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	
	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;
	//collectable = {x_pos:100, y_pos: floorPos_y, size:40, isFound: false};
	//canyon = {x_pos:150, y_pos: floorPos_y};
	
	trees_x = [400,600,800,1000,1300,1500];
	treePos_y = floorPos_y;
	
	clouds_x = [50,270,700, 1500];
	clouds_y = 100;
	
	mountains_x = [300,600,800, 1000, 1200, 1450, 1500];
	mountains_y = floorPos_y;
	
	cameraPosX = 0;
	
	collectables = [];
	collectables.push({ x_pos: 100, y_pos: floorPos_y, size: 40, isFound: false });
    collectables.push({ x_pos: 250, y_pos: floorPos_y, size: 40, isFound: false });
    collectables.push({ x_pos: 1720, y_pos: floorPos_y, size: 40, isFound: false });
    collectables.push({ x_pos: 1800, y_pos: floorPos_y, size: 40, isFound: false });
    collectables.push({ x_pos: 2000, y_pos: floorPos_y, size: 40, isFound: false });
	
	canyons = [];
	canyons.push({x_pos:150, y_pos: floorPos_y});
    canyons.push({x_pos:250, y_pos: floorPos_y});
    canyons.push({x_pos:750, y_pos: floorPos_y});
    canyons.push({x_pos:950, y_pos: floorPos_y});
    canyons.push({x_pos:1450, y_pos: floorPos_y});
	
	game_score = 0 ;
	flagpole = {isReached: false, x_pos:2100};
}

function drawLives() {
    var lifeTokenSize = 20;
    var lifeTokenSpacing = 30;
    var lifeTokenPosX = width - lifeTokenSpacing;

    for (var i = 0; i < lives; i++) {
        push();
        fill(255, 0, 0);
        // Calculate the position relative to the camera
        var screenPosX = lifeTokenPosX + cameraPosX;
        ellipse(screenPosX, 30, lifeTokenSize, lifeTokenSize);
        lifeTokenPosX -= lifeTokenSpacing;
        pop();
    }
}
