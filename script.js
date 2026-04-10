// selecting DOM elements
const startBtn = document.getElementById("start-btn");

const startScreen = document.getElementById("quiz-start-wrapper");
const quizScreen = document.getElementById("quiz-question-wrapper");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const progressBar = document.getElementById("progress");
const answerContainer = document.getElementById("answer-wrapper");

const resultScreen = document.getElementById("result-wrapper");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartbtn = document.getElementById("restart-btn");

// questions
const quizQuestions = [
  {
    question: "who is the main mascot of pokémon?",
    answers: [
      { text: "charmander", correct: false },
      { text: "pikachu", correct: true },
      { text: "bulbasaur", correct: false },
      { text: "squirtle", correct: false },
    ],
  },
  {
    question: "which type is pikachu?",
    answers: [
      { text: "fire", correct: false },
      { text: "water", correct: false },
      { text: "electric", correct: true },
      { text: "grass", correct: false },
    ],
  },
  {
    question: "which pokémon evolves into charizard?",
    answers: [
      { text: "bulbasaur", correct: false },
      { text: "squirtle", correct: false },
      { text: "charmander", correct: true },
      { text: "eevee", correct: false },
    ],
  },
  {
    question: "what device is used to catch pokémon?",
    answers: [
      { text: "pokéball", correct: true },
      { text: "ultrabox", correct: false },
      { text: "catcher", correct: false },
      { text: "monster ball", correct: false },
    ],
  },
  {
    question: "which pokémon is known for sleeping a lot?",
    answers: [
      { text: "snorlax", correct: true },
      { text: "meowth", correct: false },
      { text: "psyduck", correct: false },
      { text: "jigglypuff", correct: false },
    ],
  },
  {
    question: "which pokémon can evolve into multiple different forms?",
    answers: [
      { text: "eevee", correct: true },
      { text: "pidgey", correct: false },
      { text: "magikarp", correct: false },
      { text: "zubat", correct: false },
    ],
  },
  {
    question: "what type is squirtle?",
    answers: [
      { text: "fire", correct: false },
      { text: "water", correct: true },
      { text: "grass", correct: false },
      { text: "electric", correct: false },
    ],
  },
  {
    question: "which pokémon is famous for saying its own name repeatedly?",
    answers: [
      { text: "pikachu", correct: true },
      { text: "onix", correct: false },
      { text: "gengar", correct: false },
      { text: "machop", correct: false },
    ],
  },
];

// quiz state bars
let currentQuestionIndex = 0;
let score = 0;
let answersDisable = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// events

startBtn.addEventListener("click", startQuiz);
restartbtn.addEventListener("click", restartQuiz);

function startQuiz() {
  // restart vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestions();
}

function showQuestions() {
// reset state
  answersDisable = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answerContainer.innerHTML = "";
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // correct and incorrect styles
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    // add button UI
    answerContainer.appendChild(button);
  })
}

function selectAnswer(e) {
  if (answersDisable) return

  answersDisable = true

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true"

  Array.from(answerContainer.children).forEach((button) => {
    
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    else if (button === selectedBtn) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect){
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length) {
      showQuestions()
    }
    else {
      showResults()
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent =
      "perfect score. are you secretly a pokémon master?";
  } else if (percentage >= 80) {
    resultMessage.textContent = "impressive. you definitely know your pokémon.";
  } else if (percentage >= 60) {
    resultMessage.textContent = "not bad. you're getting there, trainer.";
  } else if (percentage >= 40) {
    resultMessage.textContent = "hmm… you might need a bit more training.";
  } else if (percentage > 0) {
    resultMessage.textContent = "yikes. even magikarp would be disappointed.";
  } else {
    resultMessage.textContent = "zero? did you even try?";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startScreen.classList.add("active");
}