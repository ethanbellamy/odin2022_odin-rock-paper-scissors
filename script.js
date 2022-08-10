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

playerScore = 0;
computerScore = 0;
gameWon = false;

function playRound (playerSelection, computerSelection) {
    //Fixes case-insensitive playerSelection prior to comparison with computerSelection
    playerSelection = playerSelection.slice(0,1).toUpperCase() + playerSelection.slice(1).toLowerCase();
    
    container = document.querySelector('#results-container');
    result = document.createElement('p');
    score = document.querySelector('#score');

    //Draw - Player and computer made the same choice
    if (playerSelection == computerSelection) {
        result.textContent = `It's a draw! ${playerSelection} equals ${computerSelection}`;
        container.appendChild(result);
    }

    //Player Wins - Rock > Scissors, Paper > Rock, Scissors > Paper
    else if ((playerSelection == "Rock" && computerSelection == "Scissors") || (playerSelection == "Paper" && computerSelection == "Rock") || (playerSelection == "Scissors" && computerSelection == "Paper")) {
        result.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
        container.appendChild(result);
        playerScore += 1;
    }

    //Player Loses - Rock < Paper, Paper < Scissors, Scissors < Rock
    else if ((playerSelection == "Rock" && computerSelection == "Paper") || (playerSelection == "Paper" && computerSelection == "Scissors") || (playerSelection == "Scissors" && computerSelection == "Rock")) {
        result.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
        container.appendChild(result);
        computerScore += 1;
    }

    score.textContent = `Score: Player ${playerScore} - ${computerScore} Computer`;

    if (playerScore == 5 || computerScore == 5) {
        gameWon = true;
        winner = document.createElement('p');

        if (playerScore > computerScore) {
            winner.textContent = 'Player wins!';
        }

        else {
            winner.textContent = 'Computer wins!';
        }

        game = document.querySelector('#game');
        brk = document.querySelector('#break');

        game.insertBefore(winner, brk);
    }
}

buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        choice = e.target.id;

        if (!gameWon) {
            playRound(choice, computerPlay());
        }
    });
});