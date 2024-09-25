const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset-button');
const newGameButton = document.querySelector('#newgame-button');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('.msg');
const container = document.querySelector('.container');

const winPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
                
let playerO = true;
let drawChance = 0;

const disableButtons = ()=>{
    for(box of boxes){
        box.disabled = true;
    }
}

const enableButtons = ()=>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = '';
    }
}

const reset = () => {
    playerO = true;
    enableButtons();
    msgContainer.classList.add("hide");
    drawChance = 0;

}



boxes.forEach((box) =>{
    box.addEventListener('click',()=>{
        if(playerO){
            box.style.color = '#b0413e';
            box.innerText = 'O';
            playerO = false;
        }
        else{
            box.style.color = 'green';
            box.innerText = 'X';
            playerO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () =>{  
    drawChance++;     
        for(pattern of winPattern){
            
            const pos1Val = boxes[pattern[0]].innerText;
            const pos2Val = boxes[pattern[1]].innerText;
            const pos3Val = boxes[pattern[2]].innerText;
    
            
            if(pos1Val!='' && pos2Val != ''&& pos3Val != ''){
                
                if(pos1Val === pos2Val && pos2Val === pos3Val ){
                    showWinner(pos1Val);
                }
                if(drawChance===9){
                    msgContainer.classList.remove('hide');
                    msg.innerText = 'Match is Draw.';
                    drawChance=0;
                }
            }
        }
    }


const showWinner = (value) =>{
    msg.innerText = `Congratulations, Winner is ${value}`;
    msgContainer.classList.remove("hide");
    disableButtons();
    container.classList.add('hide');
}




newGameButton.addEventListener('click',() =>{
    reset();
    container.classList.remove('hide');
});
resetBtn.addEventListener('click',reset);
