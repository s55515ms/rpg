let plyName = prompt("名前を入力してください");
let flag = true;
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 2;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 50, 100, 300, 500, 1000];
let plyImg = document.getElementById("plyImg");
let P = new Array(7);
for (let i = 0; i < P.length; i++) {
  let Ps = "plySt" + i;
  P[i] = document.getElementById(Ps);
}
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    P[2].textContent = "HP:" + plyHp;
  }
});
let LevCnt = 0;
let eneLv = 1;
let eneHp = 10;
let eneCnt = 5;
let eneName = new Array(10);
eneNmae = [
  "スライム",
  "コウモリ",
  "ネズミ",
  "ヘビ",
  "オオカミ",
  "宇宙人",
  "オバケ",
  "ゾンビ",
  "火玉",
  "クマ",
];
let eneHpMax = new Array(10);
let eneAtt = new Array(10);
let eneKill = new Array(10);
let eneExp = new Array(10);
let eneCntMax = new Array(10);
for (let b = 0; b < 10; b++) {
  eneName[b] = 1 + 1 * b;
  eneHpMax[b] = 10 + 10 * b;
  eneAtt[b] = 2 + 2 * b;
  eneKill[b] = 0;
  eneExp[b] = 1 + 2 * b;
  eneCntMax[b] = 5 + 1 * b;
}

let eneImg = document.getElementById("eneImg");
let E = new Array(5);
for (let c = 0; c < 5; c++) {
  let Es = "eneSt" + c;
  E[c] = document.getElementById(Es);
}
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + LevCnt + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + LevCnt + ".png";
    if (eneHp > 0) {
      eneHp -= plyAtt;
      if (eneHp < 0) {
        eneHp = 0;
      }
    } else {
      eneHp = eneHpMax[LevCnt];
      eneKill[LevCnt]++;
      E[4].textContent = "倒した回数:" + eneKill[LevCnt];
      plyExp += eneExp[LevCnt];
      P[5].textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp[LevCnt];
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        P[1].textContent = "レベル:" + plyLv;
        plyHpMax = plyLv * 3 + 6;
        plyHp = plyHpMax;
        P[2].textContent = "HP:" + plyHp;
        plyAtt = plyLv * 2;
        P[3].textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        P[4].textContent = "回復魔法:" + plyHeal;
      }
      P[6].textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    if (eneKill[9] == 3) {
      clearInterval(loop);
      flag = false;
      eneSec.textContent = "ゲームクリア";
    }
    E[2].textContent = "HP:" + eneHp;
  }
});
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (eneCnt > 0) {
    eneCnt--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp -= eneAtt[LevCnt];
    if (plyHp > 0) {
      P[2].textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      P[2].textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        eneCnt = eneCntMax[LevCnt];
        plyImg.src = "img/playerA.png";
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
      }
    }, 500);
  }
}, 1000);
P[0].textContent = plyName;

let right = document.getElementById("right");
right.addEventListener("click", () => {
  if (LevCnt < 9) {
    LevCnt++;
    E[0].textContent = eneNmae[LevCnt];
    E[2].textContent = "HP:" + eneHpMax[LevCnt];
    E[3].textContent = "攻撃力:" + eneAtt[LevCnt];
    E[4].textContent = "倒した回数:" + eneKill[LevCnt];
    eneImg.src = "img/enemyA" + LevCnt + ".png";
    eneCnt = eneCntMax[LevCnt];
  } else {
    flag = false;
  }
});
let left = document.getElementById("left");
left.addEventListener("click", () => {
  if (LevCnt > 0) {
    LevCnt--;
    E[0].textContent = eneNmae[LevCnt];
    E[2].textContent = "HP:" + eneHpMax[LevCnt];
    E[3].textContent = "攻撃力:" + eneAtt[LevCnt];
    E[4].textContent = "倒した回数:" + eneKill[LevCnt];
    eneImg.src = "img/enemyA" + LevCnt + ".png";

    eneCnt = eneCntMax[LevCnt];
  } else {
    flag = false;
  }
});
if (eneKill[LevCnt] == 1) {
  clearInterval(loop);
  flag = false;
  eneSec.textContent = "ゲームクリア";
}
