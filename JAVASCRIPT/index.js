const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");
const screen3 = document.querySelector("#screen3");
const bgImg = new Image();
bgImg.src = "../images/background/background.png";

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
    imgPlayerName: "panda0.png",
  },
  {
    imgPlayerName: "cat0.png",
  },
];

let arrayFood = [
  {
    imgfoodName: "bamboo.png",
    posX: 450,
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

class bloc {
  constructor(imgName, posY) {
    const blocImg = new Image();
    blocImg.src = "../images/background/" + imgName;

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
  constructor(imgPlayerName) {
    const imgPlayer = new Image();
    imgPlayer.src = "../images/" + imgPlayerName;
    this.imgPlayer = imgPlayer;
    this.width = 50;
    this.height = 50;
    this.posX = canvas.width / 2;
    this.posY = canvas.height - 100 /*hauteur trottoir*/ - this.height;
    this.score = 0;
  }
  drawImage = () => {
    ctx.drawImage(
      this.imgPlayer,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    ctx.fill();
  };
  drawScore = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + this.score, 8, 20);
    ctx.fill();
  };

  checkEatFood = () => {
    myFoods.map((element, index) => {
      if (element.posY === myPlayer.posY) {
        if (
          element.posX + element.width >= myPlayer.posX &&
          element.posX <= myPlayer.posX + myPlayer.width
        ) {
          this.score += 1;
          myFoods.splice(index, 1);
        }
      }
    });
    console.log(myFoods.length)
    
    if (myFoods.length=== 0) {
    
      ctx.font = "40px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(
        `Congrats, you won !! Score:${this.score}`,
        canvas.width - 650,
        canvas.height / 2,
      );
      ctx.fill();
    }
    
  };
}

class food {
  constructor(imgfoodName, posX, posY) {
    const imgFood = new Image();
    imgFood.src = "../images/" + imgfoodName;
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

let myPlayer = new player(arrayPlayer[0].imgPlayerName);
let myFoods = arrayFood.map((element) => {
  return new food(element.imgfoodName, element.posX, element.posY);
});

// FIRST SCREEN

window.onload = () => {
  screen1.style.display = "block";
  // SECOND SCREEN
  document.getElementById("start-game").onclick = () => {
    screen1.style.display = "none";
    screen2.style.display = "block";
  };

  // THIRD SCREEN
  document.getElementById("submit-player").onclick = () => {
    screen2.style.display = "none";
    screen3.style.display = "block";
    startGame();
  };

  const startGame = () => {
    drawEntireBackground();
    drawPlayer();
    drawFood();

    requestAnimationFrame(startGame);

   
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
    myPlayer.drawImage();
    myPlayer.drawScore();
    myPlayer.checkEatFood();
  };

  const drawFood = () => {
    myFoods.forEach((element) => {
      element.drawImage();
    });
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && myPlayer.posX > 0) {
      myPlayer.posX -= 10;
    } else if (
      e.key === "ArrowRight" &&
      myPlayer.posX < canvas.width - myPlayer.width
    ) {
      myPlayer.posX += 10;
    } else if (e.key === "ArrowUp" && myPlayer.posY >= 240 - myPlayer.height) {
      console.log(myPlayer.posY);
      myPlayer.posY -= 120;
    } else if (
      e.key === "ArrowDown" &&
      myPlayer.posY < canvas.height - 100 - myPlayer.height
    ) {
      console.log(myPlayer.posY);
      myPlayer.posY += 120;
    }
  });
};

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
