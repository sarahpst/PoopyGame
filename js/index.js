const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");
const screen3 = document.querySelector("#screen3");

const input = document.getElementById("name");
let intervalTimer;
let time = 15;
let myPlayer;
let inputValue;

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
    imgPlayerName: "panda-spritesheet-16x16",
  },
  {
    imgPlayerName: "cat-spritesheet-16x16",
  },
];

let arrayFood = [
  {
    imgfoodName: "bamboo.png",
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[0].posY - 30,
  },
  {
    imgfoodName: "bamboo.png",
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[2].posY - 30,
  },
  {
    imgfoodName: "catFood.png",
    posX: Math.floor(Math.random() * (canvas.width - 50)),
    posY: arrayBloc[3].posY - 30,
  },
];

let arrayEnnemy = [{
  posX: Math.floor(Math.random() * (canvas.width - 50)),
  posY: arrayBloc[0].posY - 30,
}
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
    const imgPlayer = new Image();
    imgPlayer.src = `images/${type}/${imgPlayerName}.png`;
    this.imgPlayerName = imgPlayerName
    this.type = type
    this.imgPlayer = imgPlayer;
    this.width = 50;
    this.height = 50;
    this.posX = canvas.width / 2;
    this.posY = canvas.height - 100 /*hauteur trottoir*/ - this.height;
    this.score = 0;
    this.arrayPoop = []
    this.stomach = 0
    this.gamefinished = false
    this.spriteXIndex = 0
    this.spriteYIndex = 0
    this.naturalWidth = 48
    this.naturalHeight = 48

  }

  goLeft = () => {
    const imgPlayer = new Image();
    imgPlayer.src = `images/${this.type}/${this.imgPlayerName}.png`;
    this.imgPlayer = imgPlayer;

    this.posX -= 10;
    this.spriteYIndex = 4

    this.spriteXIndex++
    if (this.spriteXIndex > 2) {
      this.spriteXIndex = 0
    }
  }

  goRight = () => {
    const imgPlayer = new Image();
    imgPlayer.src = `images/${this.type}/${this.imgPlayerName}-r.png`;
    this.imgPlayer = imgPlayer;

    this.posX += 10;
    this.spriteYIndex = 4
    this.spriteXIndex++
    if (this.spriteXIndex > 2) {
      this.spriteXIndex = 0
    }
  }

  goUp = () => {
    this.posY -= 120;
    this.spriteYIndex = 2
    this.spriteXIndex++
    if (this.spriteXIndex > 2) {
      this.spriteXIndex = 0
    }

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
      this.height
    )
    ctx.restore()
    ctx.fill();

  };
  drawScore = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + this.score, 8, 60);
    ctx.fill();
  };

  eatFood = () => {
    myFoods.map((element, index) => {
      if (element.posY === myPlayer.posY) {
        if (
          element.posX + element.width >= myPlayer.posX &&
          element.posX <= myPlayer.posX + myPlayer.width
        ) {
          this.score += 1;
          this.stomach += 1;
          console.log(this.stomach)
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
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Stomach storage : " + this.stomach, 8, 90);
    ctx.fill();
  };

  doPoop = () => {
    if (this.stomach > 0) {
      let myPoop = new poop(this.posX)
      this.arrayPoop.push(myPoop)
      this.stomach = 0
    }

  }

  drawPoop = () => {
    this.arrayPoop.forEach((element) => {
      ctx.drawImage(element.imgPoop, element.poopPosX, element.poopPosY, element.poopWidth, element.poopHeight)
      ctx.fill()
    })

  }

  win = () => {
    this.gamefinished = true
    clearInterval(intervalTimer);

    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(
      `Congrats, you won !! Score:${this.score}`,
      canvas.width - 700,
      canvas.height / 2 - 50
    );
    ctx.fill();

  }

  gameOver = () => {
    this.gamefinished = true
    clearInterval(intervalTimer)

    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(
      `you lose! Score:${myPlayer.score}`,
      canvas.width - 650,
      canvas.height / 2
    );
    ctx.fill();
  };
}

class food {
  constructor(imgfoodName, posX, posY) {
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
  constructor(posX, posY) {
    const imgEnnemy = new Image();
    imgEnnemy.src = "images/poopBasic.png"
    this.img = imgEnnemy;
    this.width = 50;
    this.height = 50;
    this.posX = posX;
    this.posY = posY;
  }

  drawImage = () => {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
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
}


const bgImg = new Image();
bgImg.src = "images/background/background.png";

let myFoods = arrayFood.map((element) => {
  return new food(element.imgfoodName, element.posX, element.posY);
});
let myEnnemies = arrayEnnemy.map((element) => {
  return new ennemy(element.posX, element.posY)
});

// FIRST SCREEN

window.onload = () => {

  // FIRST SCREEN
  screen1.style.display = "block";
  document.getElementById("start-game").onclick = () => {
    screen1.style.display = "none";
    screen2.style.display = "block";
  };

  // SECOND SCREEN
  document.getElementById("submit-player").onclick = () => {
    inputValue = input.value
    if (inputValue && myPlayer) {
      screen2.style.display = "none";
      screen3.style.display = "block";
      startGame();
    }
  };

  document.getElementById("btn-panda").onclick = () => {
    console.log("panda")
    myPlayer = new player("panda", arrayPlayer[0].imgPlayerName);

  }

  document.getElementById("btn-cat").onclick = () => {
    console.log("cat")
    myPlayer = new player("cat", arrayPlayer[1].imgPlayerName);
  }

  //CANVAS
  const startGame = () => {
    animate();
    updateTime = () => {
      if (time > 0) {
        time--;
      }
    };
    intervalTimer = setInterval(updateTime, 1000);
  }

  const animate = () => {
    drawEntireBackground();
    drawPlayer();
    drawFood();
    drawEnnemy()
    drawTimer();
    ctx.fillText("Name : " + inputValue, 650, 30);
    requestAnimationFrame(animate);
  };

  // background
  const drawEntireBackground = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height); // background Img
    drawBloc(); // blocsniv
    ctx.fill();
  };

  // création des blocsNiv
  const drawBloc = () => {
    arrayBloc.forEach((element) => {
      let myBloc = new bloc(element.imgName, element.posY);
      myBloc.drawImage();
    });
  };

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
    if (!myPlayer.gamefinished) {
      if (e.key === "ArrowLeft" && myPlayer.posX > 0) {
        myPlayer.goLeft()
      } else if (
        e.key === "ArrowRight" &&
        myPlayer.posX < canvas.width - myPlayer.width
      ) {
        myPlayer.goRight()
      } else if (e.key === "ArrowUp" && myPlayer.posY >= 240 - myPlayer.height) {
        myPlayer.goUp()
      } else if (
        e.key === "ArrowDown" &&
        myPlayer.posY < canvas.height - 100 - myPlayer.height
      ) {
        myPlayer.posY += 120;
      } else if (
        e.key === " " &&
        myPlayer.posY === 310
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
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Time left: " + time, 8, 30);
    ctx.fill();
  };

  const drawEnnemy = () => {
    myEnnemies.forEach((element) => {
      element.drawImage();
      element.killPlayer()
    });
  }
};


//   gameOver = () => {
//     ctx.fillText(
//       `You Loose !! Score:${this.score}`,
//       canvas.width - 650,
//       canvas.height / 2
//     );
//     ctx.fill();

// //   const choicebtn = [
//      ,
//     document.getElementById("select-cat") ,
//   ];

//3e ecran :
//ENNEMY
//class
// class ennemy {
//   constructor(hauteur, largeur) {
//     this.hauteur = hauteur;
//     this.largeur = largeur;
//   }
// }
//mvmnt
//collission with player
//collission with object

//POOPZONE
//gameOver
//Win
//time
//score/food level
//poop level
