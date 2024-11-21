const questions = [
    {
        category: "Science",
        question: "What color is the sky on a clear day?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: 1
    },
    {
        category: "Animals",
        question: "What is the largest land animal?",
        options: ["Elephant", "Giraffe", "Lion", "Hippo"],
        answer: 0
    },
    {
        category: "Geography",
        question: "What is the capital of the United States?",
        options: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"],
        answer: 1
    },
    {
        category: "Mathematics",
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        category: "Entertainment",
        question: "Who is the main character in 'Harry Potter'?",
        options: ["Hermione", "Ron", "Harry", "Draco"],
        answer: 2
    }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let progress = 0;

const categoryElem = document.getElementById('category');
const questionElem = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const scoreElem = document.getElementById('score');
const highScoreElem = document.getElementById('high-score');
const timeElem = document.getElementById('time');
const progressElem = document.getElementById('progress');
const startButton = document.getElementById('start');

if (localStorage.getItem('highScore')) {
    highScoreElem.innerText = localStorage.getItem('highScore');
}

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElem.innerText = score;
    startButton.disabled = true;
    timeLeft = 60;
    timeElem.innerText = timeLeft;
    shuffledQuestions = [...questions]; // Fixed variable name
    shuffle(shuffledQuestions);
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
}

function loadQuestion() {
    const questionData = shuffledQuestions[currentQuestionIndex];
    categoryElem.innerText = `Category: ${questionData.category}`;
    questionElem.innerText = questionData.question;

    const shuffledAnswers = [...questionData.options];
    shuffle(shuffledAnswers);

    answerButtons.forEach((btn, index) => {
        btn.innerText = shuffledAnswers[index];
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });

    progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressElem.style.width = `${progress}%`;
}

function updateTimer() {
    timeLeft--;
    timeElem.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function checkAnswer(selectedIndex) {
    const questionData = shuffledQuestions[currentQuestionIndex];
    const correctAnswerText = questionData.options[questionData.answer];

    if (answerButtons[selectedIndex].innerText === correctAnswerText) {
        answerButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
    }

    scoreElem.innerText = score;
    answerButtons.forEach(btn => btn.disabled = true);
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your score: ${score}`);
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScoreElem.innerText = score;
    }
    startButton.disabled = false;
}

startButton.addEventListener('click', startGame);
answerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => checkAnswer(index));
});
