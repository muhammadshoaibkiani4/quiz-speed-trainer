const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex;
let startTime, endTime, correctAnswers = 0;

const questions = [
  { question: "Capital of Pakistan?", answers: [
    { text: "Karachi", correct: false },
    { text: "Islamabad", correct: true },
    { text: "Lahore", correct: false },
    { text: "Peshawar", correct: false }
  ]},
  { question: "2 + 2 × 2 = ?", answers: [
    { text: "6", correct: true },
    { text: "8", correct: false },
    { text: "4", correct: false },
    { text: "2", correct: false }
  ]}
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  correctAnswers = 0;
  questionContainer.classList.remove("hide");
  startTime = new Date();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer) {
  if (answer.correct) correctAnswers++;
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    endTime = new Date();
    showResults();
  }
}

function showResults() {
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  resultContainer.innerHTML = `
    <h2>Results</h2>
    <p>Accuracy: ${correctAnswers}/${questions.length}</p>
    <p>Time: ${timeTaken}s</p>
    <p>${timeTaken < 10 ? "🔥 Fast!" : "⚡ Keep improving!"}</p>
    <button onclick="location.reload()">Try Again</button>
  `;
}
