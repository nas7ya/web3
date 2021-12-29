let ceil = document.querySelectorAll(".game-item"),
reset = document.querySelector("#reset-game"),
message = document.querySelector("#messege"),

player = "X",

stepCount = 0,

winCombinations = [
    [1,6,11,16],
    [2,7,12,17],
    [3,8,13,18],
    [5,10,15,20],
[6,11,16,21],
[7,12,17,22],
[8,13,18,23],
[9,14,19,24],
[10,15,20,25],
[1,7,13,19],
[7,13,19,25],
[2,8,14,20],
[6,12,18,24],
[4,8,12,16],
[5,9,13,17],
[10,14,18,22],
[9,13,17,21],
[1,2,3,4],
[2,3,4,5],
[6,7,8,9],
[7,8,9,10],
[11,12,13,14],
[12,13,14,15],
[16,17,18,19],
[17,18,19,20],
[21,22,23,24],
[22,23,24,25]

],

dataX = [],
dataO = [];

function currentStep() {
    let num = +this.getAttribute("data-ceil");

    if (!this.textContent) {
        this.innerText = player;
        player === "X"
          ? dataX.push(num) && this.classList.add("x")
          : dataO.push(num) && this.classList.add("o");
          if (
              (dataO.length >2 || dataX.length > 2) &&
              (checkWin(dataO, num) || checkWin(dataX,num))
          )

          {
              for (let i = 0 ; i < ceil.length; i++) {
                  ceil[i].removeEventListener("click", currentStep);
              }
          
              return (message.innerText = 'победил игрок' + player);
          }
            changePlayer();
              stepCount++;

              stepCount === 25
              ? (message.innerText = "ничья") : (message.innerText = "ходит игрок");
                       
    }
}

for (let i = 0; i < ceil.length; i++) {
    ceil[i].addEventListener("click", currentStep);
}

function changePlayer() {
    player === "X" ? (player = "O") : (player ="X");
}

reset.addEventListener("click", function(){
    for (let i = 0; i< ceil.length; i++) {
        ceil[i].innerText = "";
    }
dataO = [];
dataX = [];
player = "O";
stepCount = 0;

message.innerText = "ходит игрок" + player;
for (let i = 0; i < ceil.length; i++) {
   ceil[i].addEventListener("click", currentStep);
   ceil[i].ClassList.remove("x","o");
    
}
});
function checkWin(arr, number) {
    for(let w = 0, wLen = winCombinations.length; w < wLen; w++){
        let someWinArr = winCombinations[w],
        count = 0;
        if(someWinArr.indexOf(number) !== -1) {
            for (let k = 0, kLen = someWinArr.length; k < kLen; k++){
                if (arr.indexOf(someWinArr[k]) !== -1) {
                    count++;
                    if(count === 4) {
                        return true;
                    }
                }
            }
            count = 0;
        }
    }
}