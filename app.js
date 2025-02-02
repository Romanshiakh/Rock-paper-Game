let userScore = 0;
let computerScore = 0;
let moveCount = 0;
const maxlimit = 3;

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissor = document.getElementById("scissor");

const choices = document.querySelectorAll(".choice"); // rock , paper , scissor click
// * score board
const user_score_para = document.querySelector("#user-score");
const comp_score_para = document.querySelector("#computer-score");

const userScoreLabel = document.querySelector("#user-label");
const compScoreLabel = document.querySelector("#computer-label");

const result = document.querySelector("#result");

const resetBtn = document.querySelector(".reset-btn");

//? genrate the computer guess

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

//? draw match

const draw = () => {
    result.textContent = "Game was Draw!!!";
};

//? showing winner

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        user_score_para.innerText = userScore;
        result.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    } else {
        computerScore++;
        comp_score_para.innerText = computerScore;
        result.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    }
};

//? PlayGame
const playGame = userChoice => {
    if (moveCount < maxlimit) {
        const compChoice = genComputerChoice();
        moveCount++; // increament move count
        if (userChoice === compChoice) {
            draw();
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissor" ? false : true;
            } else {
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
        if (moveCount === maxlimit) {
            resetBtn.style.display = "block";
            // make it non-clickable
            choices.forEach(choice => {
                choice.style.pointerEvents = "none";
            });

            // score label for winner
            if (userScore > computerScore) {
                userScoreLabel.style.background = "red";
            } else if (computerScore > userScore) {
                compScoreLabel.style.background = "red";
            } else {
                // both red for tie
                userScoreLabel.style.background = "red";
                compScoreLabel.style.background = "red";
            }
        }
    }
};

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const resetGame = () => {
    userScore = 0;
    computerScore = 0;
    moveCount = 0;
    user_score_para.innerText = userScore;
    comp_score_para.innerText = computerScore;
    result.innerText = "Game reset. Make your move!";
    // make sure to reset btn hide it again
    resetBtn.style.display = "none";
    userScoreLabel.style.background = "green"; // reset the label background
    compScoreLabel.style.background = "green";

    // make it clickable
    choices.forEach(choice => {
        choice.style.pointerEvents = "auto";
    });
};

resetBtn.addEventListener("click", resetGame);
