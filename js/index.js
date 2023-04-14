const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");
const screen3 = document.querySelector("#screen3");
const infoCenter = document.querySelector(".info-center");
const input = document.getElementById("name");

let sound_bg = new Audio(`./sounds/bg.mp3`);

const playSoundButton = (name) => {
  let sound_button = new Audio(`./sounds/${name}.mp3`);
  sound_button.pause();
  sound_button.currentTime = 0;
  sound_button.play()
}

let animationFrame;
let intervalTimer;
let intervalEnnemies;
let time = 60;
let myBlocs;
let myPlayer;
let myFoods;
let myEnnemies;
let inputValue;
const poopZoneImg = new Image();
poopZoneImg.src = "./images/poopBasic.png";

const skullImg = new Image();
skullImg.src = "./images/skull.png";

let arrayBloc = [
  {
    imgName: "bloc1.png",
    posY: canvas.height - 240,
  },
  {
    imgName: "blocPoop.png",
    posY: canvas.height - 360,
  },
  {
    imgName: "bloc1.png",
    posY: canvas.height - 480,
  },
  {
    imgName: "bloc1.png",
    posY: canvas.height - 600,
  },
];

let arrayPlayer = [
  {
    type: "panda",
    imgPlayerName: "panda.png",
  },
  {
    type: "cat",
    imgPlayerName: "cat.png",
  },
];

let arrayFood = [
  {
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[0].posY - 40,
  },
  {
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[0].posY - 40,
  },
  {
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[2].posY - 40,
  },
  {
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[2].posY - 40,
  },
  {
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[3].posY - 40,
  },
  {
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[3].posY - 40,
  },
];

let arrayEnnemy = [{
  ennemyPos: "leftHalf",
  posX: Math.floor(Math.random() * ((450 - 50) - 0) + 0),
  posY: arrayBloc[0].posY - 40,
},
{
  ennemyPos: "leftHalf",
  posX: Math.floor(Math.random() * ((450 - 50) - 0) + 0),
  posY: arrayBloc[2].posY - 40,
},
{
  ennemyPos: "leftHalf",
  posX: Math.floor(Math.random() * ((450 - 50) - 0) + 0),
  posY: arrayBloc[3].posY - 40,
},
{
  ennemyPos: "rightHalf",
  posX: Math.floor(Math.random() * ((canvas.width - 50) - 400) + 400),
  posY: arrayBloc[0].posY - 40,
},
{
  ennemyPos: "rightHalf",
  posX: Math.floor(Math.random() * ((canvas.width - 50) - 400) + 400),
  posY: arrayBloc[2].posY - 40,
},
{
  ennemyPos: "rightHalf",
  posX: Math.floor(Math.random() * ((canvas.width - 50) - 400) + 400),
  posY: arrayBloc[3].posY - 40,
},
]


let poopZoneArray = [
  {
    poopZoneImg,
    posX: 40,
    posY: canvas.height - 360 - 10,
    width: 10,
    height: 10,
  },
  {
    poopZoneImg,
    posX: 30,
    posY: canvas.height - 360 - 20,
    width: 20,
    height: 20,
  },
  {
    poopZoneImg,
    posX: 50,
    posY: canvas.height - 360 - 40,
    width: 40,
    height: 40,
  },
]

let skullArray = [
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 240 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 240 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 240 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 480 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 480 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 480 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 600 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 600 - 20,
    width: 20,
    height: 20,
  },
  {
    skullImg,
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: canvas.height - 600 - 20,
    width: 20,
    height: 20,
  },
]

class bloc {
  constructor(imgName, posY) {
    const blocImg = new Image();
    blocImg.src = "images/background/" + imgName;

    this.img = blocImg;
    this.posX = 0;
    this.posY = posY;
    this.width = canvas.width;
    this.height = 20;
  }

  drawImage = () => {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    ctx.fill();
  };
}

class player {
  constructor(type, imgPlayerName) {
    this.type = type;
    const imgPlayer = new Image();
    imgPlayer.src = "images/" + imgPlayerName;
    this.imgPlayer = imgPlayer;
    this.imgPlayerName = imgPlayerName;
    this.width = 50;
    this.height = 50;
    this.posX = canvas.width / 2;
    this.posY = canvas.height - 100 - this.height - 10;
    this.score = 0;
    this.arrayPoop = [];
    this.stomach = 0;
    this.gamefinished = false;
    this.spriteXIndex = 1;
    this.spriteYIndex = 0;
    this.naturalWidth = 32;
    this.naturalHeight = 32;

  }

  goLeft = () => {
    this.posX -= 10;
    this.spriteYIndex = 1

    this.spriteXIndex++
    if (this.spriteXIndex > 2) {
      this.spriteXIndex = 0
    }
  }

  goRight = () => {
    this.posX += 10;
    this.spriteYIndex = 2;
    this.spriteXIndex++;
    if (this.spriteXIndex > 2) {
      this.spriteXIndex = 0
    }
  }

  goUp = () => {
    this.posY -= 120;
    this.spriteYIndex = 3;
    this.spriteXIndex = 1;
    playSoundButton("jump")
    setTimeout(() => {
      this.spriteYIndex = 0
    }, 200)
  }

  goDown = () => {
    this.posY += 120;
    this.spriteYIndex = 0;
    this.spriteXIndex = 1;
  }

  drawImage = () => {
    ctx.drawImage(
      this.imgPlayer,
      this.naturalWidth * this.spriteXIndex,
      this.naturalHeight * this.spriteYIndex,
      this.naturalWidth,
      this.naturalHeight,
      this.posX,
      this.posY,
      this.width,
      this.height,
    )
    ctx.restore()
    ctx.fill();

  };
  drawScore = () => {
    document.querySelector(".score").innerHTML = this.score
  };

  eatFood = () => {
    myFoods.map((element, index) => {
      if (element.posY === myPlayer.posY) {
        if (
          element.posX + element.width >= myPlayer.posX &&
          element.posX <= myPlayer.posX + myPlayer.width
        ) {
          playSoundButton("eating")
          this.score += 1;
          this.stomach += 1;
          myFoods.splice(index, 1);
        }
      }
    });
    if (this.stomach === 3) {
      this.gameOver();
    }
    else if (myFoods.length === 0) {
      this.win()
    }
  };

  drawStomach = () => {
    document.querySelector(".stomach").innerHTML = this.stomach
    if (this.stomach == 2) {
      document.querySelector("#need-poop").style.display = "block"
    }
    else {
      document.querySelector("#need-poop").style.display = "none"
    }
  };

  doPoop = () => {
    if (this.stomach > 0) {
      playSoundButton("poop")
      let myPoop = new poop(this.posX)
      this.arrayPoop.push(myPoop)
      this.stomach = 0
    }

  }

  drawPoop = () => {
    this.arrayPoop.forEach((element) => {
      ctx.drawImage(element.imgPoop, element.poopPosX, element.poopPosY, element.poopWidth, element.poopHeight)
      ctx.fill();
    })
  }

  win = () => {
    sound_bg.pause();
    if(!this.gamefinished){
      playSoundButton("win")
    }
    this.gamefinished = true;
    clearInterval(intervalTimer);
    clearInterval(intervalEnnemies);

    document.querySelector(".info-center").style.display = "block"
    document.querySelector("#win").style.display = "block"
    document.querySelector("#game-over").style.display = "none"
    document.querySelector("#name-final").innerHTML = inputValue
    document.querySelector("#score").innerHTML = this.score
  }

  gameOver = () => {
    sound_bg.pause();
    if(!this.gamefinished){
      playSoundButton("gameover")
    }
    this.gamefinished = true;
    clearInterval(intervalTimer);
    clearInterval(intervalEnnemies);

    infoCenter.style.display = "block"

    document.querySelector("#win").style.display = "none"
    document.querySelector("#game-over").style.display = "block"
  };
}

class food {
  constructor(posX, posY) {
    let imgfoodName;
    if (myPlayer.type === "cat") {
      imgfoodName = "catFood.png"
    }
    else if (myPlayer.type === "panda") {
      imgfoodName = "bamboo.png"
    }
    const imgFood = new Image();
    imgFood.src = "images/" + imgfoodName;
    this.img = imgFood;
    this.width = 50;
    this.height = 50;
    this.posX = posX;
    this.posY = posY;
  }
  drawImage = () => {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    ctx.fill();
  };
}

class poop {
  constructor(posX) {
    let imgPoop = new Image();
    imgPoop.src = "images/poopSmile.png";
    this.imgPoop = imgPoop;
    this.poopWidth = 20;
    this.poopHeight = 20;
    this.poopPosX = posX;
    this.poopPosY = myPlayer.posY + myPlayer.height - this.poopHeight - 10;
  }
}

class ennemy {
  constructor(ennemyPos, posX, posY) {
    let imgSrc;

    if (myPlayer.type === "cat") {
      imgSrc = "cat-ennemy.png"
    }
    else if (myPlayer.type === "panda") {
      imgSrc = "panda-ennemy.png"
    }

    const imgEnnemy = new Image();
    imgEnnemy.src = "images/" + imgSrc
    this.img = imgEnnemy;
    this.spriteXIndex = 0;
    this.spriteYIndex = 0;
    this.naturalWidth = 32;
    this.naturalHeight = 32;
    this.width = 50;
    this.height = 50;
    this.posX = posX;
    this.posY = posY;
    this.direction = "left";
    this.ennemyPos = ennemyPos
  }

  goLeft = () => {
    this.posX -= 4;
    this.spriteYIndex = 1
    this.spriteXIndex++
    if (this.spriteXIndex > 2) {
      this.spriteXIndex = 0
    }
  }

  goRight = () => {
    this.posX += 4;
    this.spriteYIndex = 2;
    this.spriteXIndex++;
    if (this.spriteXIndex > 2) {
      this.spriteXIndex = 0
    }
  }

  drawImage = () => {
    ctx.drawImage(
      this.img,
      this.naturalWidth * this.spriteXIndex,
      this.naturalHeight * this.spriteYIndex,
      this.naturalWidth,
      this.naturalHeight,
      this.posX,
      this.posY,
      this.width,
      this.height,
    )
    ctx.restore()
    ctx.fill();

  };


  killPlayer = () => {
    if (this.posY === myPlayer.posY) {
      if (
        this.posX + this.width >= myPlayer.posX &&
        this.posX <= myPlayer.posX + myPlayer.width
      ) {
        myPlayer.gameOver();
      }
    }
  }


  move = () => {
    if (this.ennemyPos === "leftHalf") {
      if (this.direction === "left") {
        if (this.posX > 0) {
          this.goLeft()
        }
        else { this.direction = "right" }
      }
      if (this.direction === "right") {
        if (this.posX < canvas.width / 2 - this.width) {
          this.goRight();
        }
        else { this.direction = "left" }
      }
    }

    else if (this.ennemyPos === "rightHalf") {
      if (this.direction === "left") {
        if (this.posX > canvas.width / 2) {
          this.goLeft();
        }
        else { this.direction = "right" }
      }
      if (this.direction === "right") {
        if (this.posX < canvas.width - this.width) {
          this.goRight();
        }
        else { this.direction = "left" }
      }
    }
  }

}


const signPoopZoneImg = new Image();
signPoopZoneImg.src = "./images/sign.png";

const bgImg = new Image();
bgImg.src = "images/background/background.png";


// FIRST SCREEN

window.onload = () => {

  const initValue = () => {
    cancelAnimationFrame(animationFrame)
    intervalTimer = undefined
    intervalEnnemies = undefined
    time = 60;
    myPlayer = undefined
    myFoods = undefined
    myEnnemies = undefined
    inputValue = ""

    document.getElementById("btn-panda").classList.remove('btn-selected');
    document.getElementById("btn-cat").classList.remove('btn-selected');
    document.getElementById("name").value = ""
  }
  // FIRST SCREEN
  screen1.style.display = "block";
  document.getElementById("start-game").onclick = () => {
    screen1.style.display = "none";
    screen3.style.display = "none";
    screen2.style.display = "block";
    playSoundButton("button")
  };

  document.getElementById("btn-try-again").onclick = () => {
    initValue()
    screen1.style.display = "none";
    screen3.style.display = "none";
    infoCenter.style.display = "none"
    screen2.style.display = "block";
    playSoundButton("button")
  };

  // SECOND SCREEN
  document.getElementById("submit-player").onclick = () => {

    inputValue = input.value
    if (inputValue && myPlayer) {
      playSoundButton("button")
      screen2.style.display = "none";
      screen3.style.display = "block";
      document.querySelector(".guidelines").innerHTML
      startGame();
    }
  };

  document.getElementById("btn-panda").onclick = () => {
    playSoundButton("button")
    document.getElementById("btn-panda").classList.add('btn-selected');
    document.getElementById("btn-cat").classList.remove('btn-selected');
    myPlayer = new player(arrayPlayer[0].type, arrayPlayer[0].imgPlayerName);
  }

  document.getElementById("btn-cat").onclick = () => {
    playSoundButton("button")
    document.getElementById("btn-cat").classList.add('btn-selected');
    document.getElementById("btn-panda").classList.remove('btn-selected');
    myPlayer = new player(arrayPlayer[1].type, arrayPlayer[1].imgPlayerName);
  }



  //CANVAS
  const startGame = () => {

    myBlocs = arrayBloc.map((element) => {
      return new bloc(element.imgName, element.posY);
    });
    myFoods = arrayFood.map((element) => {
      return new food(element.posX, element.posY);
    });
    myEnnemies = arrayEnnemy.map((element) => {
      return new ennemy(element.ennemyPos, element.posX, element.posY)
    });

    // sound_bg.pause();
    // sound_bg.currentTime = 0;
    // sound_bg.play();

    animate();
    updateTime = () => {
      if (time > 0) {
        time--;
      }
    };
    intervalTimer = setInterval(updateTime, 1000);
    intervalEnnemies = setInterval(() => {
      myEnnemies.map((element) => { element.move() });

    }, 80);
  }

  const animate = () => {
    drawEntireBackground();
    drawPlayer();
    drawFood();
    drawEnnemy();
    drawTimer();
    animationFrame = requestAnimationFrame(animate);
  };

  // background
  const drawEntireBackground = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height); // background Img
    drawBloc(); // blocsniv
    drawPoopZone();
    drawSkull();
    ctx.drawImage(signPoopZoneImg, 20, canvas.height - 360 - 75, 60, 80)

    ctx.fill();
  };

  // création des blocsNiv
  const drawBloc = () => {
    myBlocs.forEach((element) => {
      element.drawImage();
    });
  };

  const drawPoopZone = () => {
    poopZoneArray.forEach((element) => {
      ctx.drawImage(element.poopZoneImg, element.posX, element.posY, element.width, element.height)
      ctx.fill()
    });
  }

  const drawSkull = () => {
    skullArray.forEach((element) => {
      ctx.drawImage(element.skullImg, element.posX, element.posY, element.width, element.height)
      ctx.fill()
    });
  }

  const drawPlayer = () => {
    myPlayer.drawScore();
    myPlayer.eatFood();
    myPlayer.drawStomach();
    myPlayer.drawPoop();
    myPlayer.drawImage();
    if (time === 0) {
      myPlayer.gameOver();
    }

  };

  document.addEventListener("keydown", function (e) {
    if (myPlayer && !myPlayer.gamefinished) {
      if (e.key === "ArrowLeft" && myPlayer.posX > 0) {
        myPlayer.goLeft()
      } else if (
        e.key === "ArrowRight" &&
        myPlayer.posX < canvas.width - myPlayer.width
      ) {
        myPlayer.goRight()
      } else if (e.key === "ArrowUp" && myPlayer.posY >= 240 - myPlayer.height - 10) {
        myPlayer.goUp()
      } else if (
        e.key === "ArrowDown" &&
        myPlayer.posY < canvas.height - 100 - myPlayer.height - 10
      ) {
        myPlayer.goDown()
      } else if (
        e.key === " " &&
        myPlayer.posY === 310 - 10
      ) {
        myPlayer.doPoop();
      }
    }
  });

  const drawFood = () => {
    myFoods.forEach((element) => {
      element.drawImage();
    });
  };

  const drawTimer = () => {
    document.querySelector(".time").innerHTML = time
  };

  const drawEnnemy = () => {
    myEnnemies.forEach((element) => {
      element.drawImage();
      element.killPlayer();

    });
  }
};




