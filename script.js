playerScore = 0;
computerScore = 0;
gameWon = false;
round = 0;

resultsHeader = document.querySelector('#results-header')
resultsContainer = document.querySelector('#results-container');
score = document.querySelector('#score');

function computerPlay() {
    //Generate random number between 0 and 2
    let randomNumber = Math.floor(Math.random() * 3);

    //If 0, then Rock
    if (randomNumber == 0) {
        return "Rock";
    }

    //If 1, then Paper
    else if (randomNumber == 1) {
        return "Paper";
    }

    //If 2, then Scissors
    else {
        return "Scissors";
    }
}

function playRound (playerSelection, computerSelection) {
    //Fixes case-insensitive playerSelection prior to comparison with computerSelection
    playerSelection = playerSelection.slice(0,1).toUpperCase() + playerSelection.slice(1).toLowerCase();

    result = document.createElement('p');
    resultsHeader.style.display = 'block';

    round += 1;

    //Draw - Player and computer made the same choice
    if (playerSelection == computerSelection) {
        result.textContent = `Round ${round}: DRAW - ${playerSelection} draws with ${computerSelection}`;
        resultsContainer.insertBefore(result, resultsContainer.firstChild);
    }

    //Player Wins - Rock > Scissors, Paper > Rock, Scissors > Paper
    else if ((playerSelection == "Rock" && computerSelection == "Scissors") || (playerSelection == "Paper" && computerSelection == "Rock") || (playerSelection == "Scissors" && computerSelection == "Paper")) {
        result.textContent = `Round ${round}: WIN - ${playerSelection} beats ${computerSelection}`;
        resultsContainer.insertBefore(result, resultsContainer.firstChild);
        playerScore += 1;
    }

    //Player Loses - Rock < Paper, Paper < Scissors, Scissors < Rock
    else if ((playerSelection == "Rock" && computerSelection == "Paper") || (playerSelection == "Paper" && computerSelection == "Scissors") || (playerSelection == "Scissors" && computerSelection == "Rock")) {
        result.textContent = `Round ${round}: LOSE - ${playerSelection} loses to ${computerSelection}`;
        resultsContainer.insertBefore(result, resultsContainer.firstChild);
        computerScore += 1;
    }

    score.textContent = `Player ${playerScore} - ${computerScore} Computer`;

    //Declare winner after first to 5 points
    if (playerScore == 5 || computerScore == 5) {
        gameWon = true;
        winner = document.querySelector('#winner');
        reset = document.querySelector('#reset');

        if (playerScore > computerScore) {
            winner.textContent = 'Player wins!';
        }

        else {
            winner.textContent = 'Computer wins!';
        }

        winner.style.display = 'block';
        reset.style.display = 'block';
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameWon = false;
    round = 0;

    winner.style.display = 'none';
    reset.style.display = 'none';
    resultsHeader.style.display = 'none';

    score.textContent = 'Player 0 - 0 Computer';

    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }
}

playerChoices = document.querySelectorAll('div.choice');

playerChoices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        playerChoice = e.currentTarget.id;

        if (!gameWon) {
            playRound(playerChoice, computerPlay());
        }
    });
});

resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGame);