const diceImages = [
    "./images/image1.png",
    "./images/image2.png",
    "./images/image3.png",
    "./images/image4.png",
    "./images/image5.png",
    "./images/image6.png"
];

let rollCount = 0;

const player = {
    totalScore: 0,
    rollDice: function () {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        return [die1, die2];
    }
};

const computer = {
    totalScore: 0,
    rollDice: function () {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        return [die1, die2];
    }
};

function calculateScore(dice) {
    const [d1, d2] = dice;
    if (d1 === 1 || d2 === 1) return 0;
    if (d1 === d2) return (d1 + d2) * 2;
    return d1 + d2;
    }

    function updateDiceImages(dice, prefix) {
    document.getElementById(`${prefix}-die1`).src = diceImages[dice[0] - 1];
    document.getElementById(`${prefix}-die2`).src = diceImages[dice[1] - 1];

    // Animation: small bounce effect
    document.getElementById(`${prefix}-die1`).style.transform = 'scale(1.2)';
    document.getElementById(`${prefix}-die2`).style.transform = 'scale(1.2)';
    setTimeout(() => {
        document.getElementById(`${prefix}-die1`).style.transform = 'scale(1)';
        document.getElementById(`${prefix}-die2`).style.transform = 'scale(1)';
    }, 300);
}

function playRound() {
    if (rollCount >= 3) return;

    const playerRoll = player.rollDice();
    const computerRoll = computer.rollDice();

    updateDiceImages(playerRoll, 'player');
    updateDiceImages(computerRoll, 'computer');

    const playerScore = calculateScore(playerRoll);
    const computerScore = calculateScore(computerRoll);

    player.totalScore += playerScore;
    computer.totalScore += computerScore;

    document.getElementById('player-round-score').textContent = playerScore;
    document.getElementById('computer-round-score').textContent = computerScore;

    document.getElementById('player-total-score').textContent = player.totalScore;
    document.getElementById('computer-total-score').textContent = computer.totalScore;

    rollCount++;

    if (rollCount === 3) {
        let resultText = '';
        if (player.totalScore > computer.totalScore) resultText = 'You win!';
        else if (player.totalScore < computer.totalScore) resultText = 'Computer wins!';
        else resultText = "It's a tie!";

        document.getElementById('result').textContent = resultText;
        
        document.getElementById('result').classList.add('show');
        
    }
}

function resetGame() {
    player.totalScore = 0;
    computer.totalScore = 0;
    rollCount = 0;
    document.getElementById('result').textContent = '';
    document.getElementById('player-round-score').textContent = '0';
    document.getElementById('computer-round-score').textContent = '0';
    document.getElementById('player-total-score').textContent = '0';
    document.getElementById('computer-total-score').textContent = '0';
    updateDiceImages([1, 1], 'player');
    updateDiceImages([1, 1], 'computer');
}

document.getElementById('roll-btn').addEventListener('click', playRound);
document.getElementById('reset-btn').addEventListener('click', resetGame);