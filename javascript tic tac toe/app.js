

let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset-btn");
let newGameBtn=document.querySelector(".new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg = document.querySelector(".msg");



let turnO=true;
let count = 0;

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{

        count++;
       const catchBox = Event.target;

        let isWin = false;
          if(turnO){
                box.style.color = 'green';
               box.innerText="O";
               turnO = false;
          }
          else{
            box.style.color = 'pink';
            box.innerText="X"
            turnO = true;
          }
          box.disabled=true;
          isWin = checkWinner();
        //   if(!isWin)
        //     isGameDraw();

        //  Alternate effective Logic
          if(count === 9 && isWin === false){
            msg.innerText=`No one wins this game. The match is draw.`;
            msgContainer.classList.remove("hide");           
          }
         

    });
});

const isGameDraw = (() => {
       let isSatisfy = true;
        boxes.forEach((box) =>{
            if(!box.disabled){
                isSatisfy = false;
            }          
        });

        if(isSatisfy){

            const messageElement = document.querySelector('.msg');
            messageElement.classList.add('draw');

            showWinner(`-- Match is draw. Reseting game ...`);
            setTimeout(resetGame, 2000); 
        }
    });


const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
       ; box.disabled=false
        box.innerText ="";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=()=>{
    for(let pattern of winPattern){
       
       let pos1Val  =  boxes[pattern[0]].innerText;
       let pos2Val  =  boxes[pattern[1]].innerText;
       let pos3Val  =  boxes[pattern[2]].innerText;

       if(pos1Val !="" && pos2Val != "" && pos3Val != "")
       {
        if(pos1Val === pos2Val && pos2Val===pos3Val){

            const messageElement = document.querySelector('.msg');
            messageElement.classList.remove('draw');

            showWinner(`Congratulations, Winner is ${pos1Val}`);
             return true;
        }
       }
    }
        return false;
};

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
