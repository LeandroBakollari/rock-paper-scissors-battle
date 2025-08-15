let pl1s = document.getElementById("pl1s");
let pl2s = document.getElementById("pl2s");

let isAnimating = false;

function reset() {
    pl1s.innerHTML = "0";
    pl2s.innerHTML = "0";
}

function updateScore(player) {
    if (player === "pl1") {
        pl1s.innerHTML = parseInt(pl1s.innerHTML) + 1;
    } else if (player === "pl2") {
        pl2s.innerHTML = parseInt(pl2s.innerHTML) + 1;
    }
}

let pl1move = 0;
let pl2move = 0;

document.addEventListener("keydown", (event) => {
    if(isAnimating) return; // prevent input during animation
    const key = event.key.toLowerCase(); // normalize to lowercase

    // Player 1 controls (A/S/D)
    if (key === "a") sendValue(1, "Player 1"); // Rock
    if (key === "s") sendValue(2, "Player 1"); // Paper
    if (key === "d") sendValue(3, "Player 1"); // Scissors

    // Player 2 controls (1/2/3)
    if (key === "1") sendValue(1, "Player 2"); // Rock
    if (key === "2") sendValue(2, "Player 2"); // Paper
    if (key === "3") sendValue(3, "Player 2"); // Scissors
});


function sendValue(value, player){
    if (player === "Player 1"){
        pl1move = value;        
    }
    else if (player === "Player 2"){
        pl2move = value;
    }
    if (pl1move && pl2move) {
        animateBattle(getChoiceName(pl1move), getChoiceName(pl2move));
        setTimeout(() => {
            play(); // update score and result
            pl1move = 0;
            pl2move = 0;
        }, 2000); // wait for animation before showing result
    }
}

function checkWinner(){
    if (pl1move === pl2move) return 0; // tie

    if (
        (pl1move === 1 && pl2move === 3) || // Rock beats Scissors
        (pl1move === 2 && pl2move === 1) || // Paper beats Rock
        (pl1move === 3 && pl2move === 2)    // Scissors beats Paper
    ) {
        return "pl1";
    } else {
        return "pl2";
    }
}

function play() {
    let winner = checkWinner();
    if (winner === "pl1") {
        updateScore("pl1");
        document.getElementById("result").innerHTML = "Player 1 wins!";
    } else if (winner === "pl2") {
        updateScore("pl2");
        document.getElementById("result").innerHTML = "Player 2 wins!";
    } else {
        document.getElementById("result").innerHTML = "It's a tie!";
    }
}




function animateBattle(p1Choice, p2Choice) {
    let count = 0;
    let p1Hand = document.getElementById("p1-hand");
    let p2Hand = document.getElementById("p2-hand");

    isAnimating = true; // prevent further input during animation
    p1Hand.src = "images/rock.png";
    p2Hand.src = "images/rock.png";

    let anim = setInterval(() => {
        if (count % 2 === 0) {
            p1Hand.classList.add("up");
            p2Hand.classList.add("up");
        } else {
            p1Hand.classList.remove("up");
            p2Hand.classList.remove("up");
        }
        count++;

        if (count === 6) { // 3 up/down cycles
            clearInterval(anim);

            // Show the chosen move images
            p1Hand.src = `images/${p1Choice}.png`;
            p2Hand.src = `images/${p2Choice}.png`;
            isAnimating = false;
        }
    }, 300);
}

function getChoiceName(value) {
    if (value === 1) return "rock";
    if (value === 2) return "paper";
    if (value === 3) return "scissors";
}
