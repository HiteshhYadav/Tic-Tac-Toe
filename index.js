const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');

//initial variables
let currentPlayer;   // O or X
let gameGrid;        // array containing states of game

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //empty in UI
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents='all';
        // box.classList=`box box${index+1}`; /*or*/
        boxes.forEach((box)=>{
            box.classList.remove('win');
        })
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer==='X'){
        currentPlayer='O';
    }
    else{
        currentPlayer='X';
    }

    //UI Update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    //for each position in winningPositions array
    winningPositions.forEach((position)=>{
        //if all 3 position for winning filled for each entry of winningPositions
        if(((gameGrid[position[0]]!=="") || (gameGrid[position[1]]!=="") || (gameGrid[position[2]]!==""))
            &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
                
                if(gameGrid[position[0]]==='X'){
                    answer="X";
                }
                else{
                    answer="O";
                }
                //disable pointer events
                boxes.forEach((box)=>{
                    box.style.pointerEvents='none';
                })
                //now we know X/O is a winner 
                boxes[position[0]].classList.add('win');
                boxes[position[1]].classList.add('win');
                boxes[position[2]].classList.add('win');

        }
    })

    //it means we have a winner
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    //No winner found 
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    })

    if(fillCount===9){
        gameInfo.innerText=`Game Tied!`;
        newGameBtn.classList.add('active');
    }

}

function handleClick(index){
    if(gameGrid[index]===""){

        boxes[index].innerText=currentPlayer;  //UI update
        gameGrid[index]=currentPlayer;         //variable update
        boxes[index].style.pointerEvents='none';
        //swap turn
        swapTurn();
        //check if somebody won
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener('click',initGame);