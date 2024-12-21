let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let highscore = 0;

let arr = ["yellow", "red", "blue", "green"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game started");
    started = true;
    levelup();
  }
});

function levelup() {
  userseq = [];
  level++;

  h2.innerText = `Level ${level}`; // Use backticks for template literals

  let randindx = Math.floor(Math.random() * 4); // Random index between 0 and 3
  let randcolor = arr[randindx];
  let randbtn = document.querySelector(`.${randcolor}`); // Corrected selector syntax

  // console.log(randindx);
  // console.log(randcolor);
  // console.log(randbtn);
  gameseq.push(randcolor);
  console.log(gameseq);
  gameflash(randbtn);
}

function gameflash(btn) {
  if (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 250);
  } else {
    console.error("Button is undefined");
  }
}

function userflash(btn) {
  if (btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
      btn.classList.remove("userflash");
    }, 250);
  } else {
    console.error("Button is undefined");
  }
}

function btnpress() {
  //console.log(this);
  let btn = this;
  userflash(btn);

  userColor = btn.getAttribute("id");
  userseq.push(userColor);

  checkAns(userseq.length - 1);
}

function checkAns(idx) {
  //console.log("curr level: ", level);

  if (userseq[idx] == gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelup, 1000);
    }
    console.log("same val");
  } else {
    if (level > highscore) {
      highscore = level;
    }
    h2.innerHTML = `Game over! <b>Your score was ${level}</b> <br> High Score was ${highscore}  <br> Press any key to continue.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "darkgray";
    }, 150);
    reset();
  }
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
