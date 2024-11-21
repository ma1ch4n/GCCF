let timer;
let time = 20;
let score = 0;
let highScore = 0;

function startGame() {
    resetGame();
    generateProblem();
    generateOptions();
    timer = setInterval(updateTimer, 1000);
    document.getElementById('highScoreValue').innerText = highScore;
}

function resetGame() {
    clearInterval(timer);
    time = 20;
    score = 0;
    document.getElementById('time').innerText = time;
    document.getElementById('result').innerText = '';
    document.getElementById('currentScore').innerText = score;
    document.getElementById('options').innerHTML = '';
    document.getElementById('problem').innerText = '';
    document.getElementById('highScoreValue').innerText = '0';
}

function updateTimer() {
    time--;
    document.getElementById('time').innerText = time;
    if (time === 0) {
        endGame();
    }
}

function generateProblem() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    // Only addition problems
    const problem = `${num1} + ${num2}`;

    document.getElementById('problem').innerText = problem;
}

function generateOptions() {
    const problemText = document.getElementById('problem').innerText;
    const correctAnswer = eval(problemText);
    const options = [correctAnswer];

    while (options.length < 4) {
        let option = correctAnswer + Math.floor(Math.random() * 10) - 5;

        // Ensure the option is not already included
        if (!options.includes(option) && option >= 0) {
            options.push(option);
        }
    }

    options.sort(() => Math.random() - 0.5);

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach((option) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.innerText = option;
        button.onclick = () => selectOption(option, correctAnswer);
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        document.getElementById('result').innerHTML = 
            `<span class="correct">Correct!</span>`;
        score++;
        document.getElementById('currentScore').innerText = score;
        generateProblem();
        generateOptions();
    } else {
        document.getElementById('result').innerHTML = 
            `<span class="incorrect">Incorrect. Try again.</span>`;
    }
}

function endGame() {
    clearInterval(timer);
    document.getElementById('result').innerText = 'Time is up! Game over.';
    document.getElementById('options').innerHTML = '';
    document.getElementById('problem').innerText = '';
    updateHighScore();
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        document.getElementById('highScoreValue').innerText = highScore;
    }
}
